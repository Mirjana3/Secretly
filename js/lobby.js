/* Lobby: live room + members from Firestore, invite code, draw names */
boot(() => {
  const code = roomCode();
  if (!code) return go("dash");
  let room = null,
    members = null;
  const d = $("draw");
  function render() {
    if (!room || !members) return;
    if (!room.memberIds.includes(uid))
      return goFlash("dash", "You are not a member of that room");
    $("lN").textContent = room.name;
    $("lM").textContent = fmt(room.date) + " · Budget €" + room.budget;
    const b = $("lB");
    b.textContent = room.drawn ? "Drawn" : "Waiting";
    b.className = "badge " + (room.drawn ? "g" : "");
    $("lC").textContent = code;
    $("mems").innerHTML = members
      .map(
        (m) =>
          `<div class="card mem"><div class="av">${esc(
            m.name
              .split(" ")
              .map((x) => x[0])
              .slice(0, 2)
              .join(""),
          )}</div><b style="font-size:14px">${esc(m.name)}${m.id === uid ? " (you)" : ""}</b><div style="margin-top:8px"><span class="badge ${m.ready ? "g" : ""}">${m.ready ? "✓ Quiz Ready" : "Quiz pending"}</span></div></div>`,
      )
      .join("");
    const owner = room.ownerId === uid;
    d.textContent = room.drawn
      ? "See My Match"
      : owner
        ? "Draw Names"
        : "Waiting for the host to draw";
    d.disabled = !room.drawn && !owner;
  }
  db.doc("rooms/" + code).onSnapshot((s) => {
    if (!s.exists) return go("dash");
    room = s.data();
    render();
  }, fail);
  db.collection(`rooms/${code}/members`).onSnapshot((s) => {
    members = s.docs.map((x) => ({ id: x.id, ...x.data() }));
    render();
  }, fail);
  $("cp").onclick = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (_) {
      const t = document.createElement("textarea");
      t.value = code;
      document.body.appendChild(t);
      t.select();
      try {
        document.execCommand("copy");
      } catch (_) {}
      t.remove();
    }
    toast("Code " + code + " copied");
  };
  d.onclick = async () => {
    if (room.drawn) return goRoom("match", code);
    if (members.length < 2)
      return toast("Invite at least one more person first");
    d.disabled = true;
    d.textContent = "Drawing…";
    try {
      const qs = await db.collection(`rooms/${code}/quizzes`).get(),
        Qm = {};
      qs.docs.forEach((x) => (Qm[x.id] = x.data()));
      const ids = members
        .map((m) => m.id)
        .sort(
          () => Math.random() - 0.5,
        ); /* everyone buys for the next person in a shuffled circle */
      await Promise.all(
        ids.map((g, i) => {
          const t = ids[(i + 1) % ids.length],
            q = Qm[t] || { name: members.find((m) => m.id === t).name };
          return db
            .doc(`rooms/${code}/matches/${g}`)
            .set({
              toUid: t,
              name: q.name,
              gender: q.gender || "",
              size: q.size || "",
              tags: q.tags || [],
              dislikes: q.dislikes || "",
              wishlist: q.wishlist || "",
            });
        }),
      );
      await db.doc("rooms/" + code).update({ drawn: true });
      await log("Names drawn in " + room.name);
      goRoom("match", code, "Names drawn! 🎅");
    } catch (e) {
      d.disabled = false;
      d.textContent = "Draw Names";
      fail(e);
    }
  };
});
