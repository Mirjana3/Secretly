/* Dashboard: create room, join room, my groups (Firestore: rooms/{code}) */
const rand = () =>
  Array.from(
    { length: 6 },
    () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)],
  ).join("");
boot(async () => {
  $("hi").textContent = U.f;
  try {
    const s = await db
      .collection("rooms")
      .where("memberIds", "array-contains", uid)
      .get();
    $("groups").innerHTML = s.docs.length
      ? s.docs
          .map((d) => {
            const g = d.data();
            return `<div class="card click" tabindex="0" data-code="${d.id}" data-drawn="${g.drawn ? 1 : 0}"><div class="hd"><h3>${esc(g.name)}</h3><span class="badge ${g.drawn ? "g" : ""}">${g.drawn ? "Drawn" : "Waiting"}</span></div>  <div class="mut" style="font-size:13px">${g.memberIds.length} members · €${g.budget} budget<br>${fmt(g.date)}</div></div>`;
          })
          .join("")
      : '<p class="mut">No groups yet. Create a room or join one with a code.</p>';
  } catch (e) {
    $("groups").innerHTML =
      '<p class="mut" role="status">Could not load groups. Please try again.</p>';
    fail(e);
  }
  $("groups").onclick = (e) => {
    const c = e.target.closest("[data-code]");
    if (c) goRoom(c.dataset.drawn === "1" ? "match" : "lobby", c.dataset.code);
  };
  $("groups").onkeydown = (e) => {
    if (e.key === "Enter") e.target.click();
  };
  $("mk").onclick = async () => {
    const n = $("gn").value.trim(),
      b = +$("gb").value;
    if (!n) return toast("Give your group a name");
    if (!(b > 0)) return toast("Enter a budget above €0");
    $("mk").disabled = true;
    try {
      let code,
        free = false;
      for (let i = 0; i < 5 && !free; i++) {
        code = rand();
        free = !(await db.doc("rooms/" + code).get()).exists;
      }
      await db
        .doc("rooms/" + code)
        .set({
          name: n,
          code,
          budget: b,
          date: $("gdt").value || "2026-12-20",
          ownerId: uid,
          drawn: false,
          memberIds: [uid],
          created: FV.serverTimestamp(),
        });
      await enterRoom(code);
      await log("Created " + n);
      goRoom("lobby", code, "Room created");
    } catch (e) {
      $("mk").disabled = false;
      fail(e);
    }
  };
  $("jn").onclick = async () => {
    const c = $("jc").value.trim().toUpperCase();
    if (c.length !== 6) return toast("Codes have exactly 6 characters");
    try {
      const r = await db.doc("rooms/" + c).get();
      if (!r.exists) return toast("No room with that code");
      const d = r.data();
      if (!d.memberIds.includes(uid)) {
        if (d.drawn) return toast("Names were already drawn in this room");
        await db.doc("rooms/" + c).update({ memberIds: FV.arrayUnion(uid) });
        await enterRoom(c);
        await log("Joined " + d.name);
      }
      goRoom("lobby", c);
    } catch (e) {
      fail(e);
    }
  };
});
