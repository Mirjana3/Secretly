/* Profile: tabs, personal info, quiz summary, saved gifts, activity, log out */
boot(() => {
  function renderQuiz() {
    const q = U.quiz,
      wishes = q.wl
        .split(/\r?\n/)
        .map((x) => x.trim())
        .filter(Boolean);
    $("p-quiz").innerHTML =
      `<div class="quiz-summary-heading"><h3 data-i18n="quizTitle">${esc(tr("quizTitle"))}</h3><label class="language-picker"><span data-i18n="language">${esc(tr("language"))}</span><select data-language aria-label="${esc(tr("language"))}"><option value="hr">Hrvatski</option><option value="en">English</option><option value="de">Deutsch</option></select></label></div><div class="chips">${q.tags.map((x) => `<span class="chip sm">${esc(choiceLabel("tagLabels", x))}</span>`).join("")}<span class="chip sm">${esc(tr("clothingSize"))}: ${esc(q.size)}</span>${q.colors.map((x) => `<span class="chip sm">${esc(x)}</span>`).join("")}</div><p style="margin:12px 0"><b>${esc(tr("dislikesSummary"))}:</b> ${esc(q.dl) || "—"}<br><b>${esc(tr("wishlistSummary"))}:</b> ${esc(wishes.map((x) => choiceLabel("wishLabels", x)).join(", ")) || "—"}</p><button class="btn" id="edQ">${esc(tr("editQuiz"))}</button>`;
    $("p-quiz").querySelector("[data-language]").value = appLanguage;
    $("edQ").onclick = () => (location.href = "auth.html?m=quiz");
  }
  function render() {
    const q = U.quiz;
    $("avBig").textContent = ini();
    $("pn").textContent = fullName();
    $("pe").textContent = U.e;
    $("pf").value = U.f;
    $("pl").value = U.l || "";
    $("pm").value = U.e;
    $("pg").value = U.g || "";
    $("qs").innerHTML = [
      ...q.tags.map((x) => choiceLabel("tagLabels", x)),
      tr("clothingSize") + " " + q.size,
      ...q.colors,
    ]
      .map((x) => `<span class="chip sm">${esc(x)}</span>`)
      .join("");
    renderQuiz();
    $("sg").innerHTML = U.saved.length
      ? U.saved
          .map(
            (s) =>
              `<div class="card"><div class="img" style="background:${BG[0]};height:90px;font-size:40px">${s.e}</div><b>${esc(s.t)}</b><div class="hd" style="margin:6px 0 0"><span class="price">≈ €${s.p}</span><button class="heart on" aria-label="Remove" data-rm="${esc(s.t)}">♥</button></div></div>`,
          )
          .join("")
      : '<p class="mut">Nothing saved yet. Tap ♡ on a gift idea to keep it here.</p>';
    $("act").innerHTML =
      U.act
        .map(
          (a) =>
            `<li><span>${esc(a.t)}</span><span class="mut">${new Date(a.w).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span></li>`,
        )
        .join("") || '<li class="mut">No activity yet.</li>';
  }
  Q("[data-pt]").forEach(
    (t) =>
      (t.onclick = () => {
        Q("[data-pt]").forEach((b) => b.classList.toggle("on", b === t));
        const k = t.dataset.pt;
        $("p-info").classList.toggle("hide", k === "quiz");
        $("p-quiz").classList.toggle("hide", k !== "quiz");
        if (k === "saved") $("saved").scrollIntoView();
      }),
  );
  $("sg").onclick = async (e) => {
    const t = e.target.closest("[data-rm]");
    if (!t) return;
    U.saved = U.saved.filter((s) => s.t !== t.dataset.rm);
    render();
    toast("Removed from saved");
    try {
      await saveU();
    } catch (e) {
      fail(e);
    }
  };
  $("savP").onclick = async () => {
    const f = $("pf").value.trim(),
      e = $("pm").value.trim();
    if (!f) return toast("First name can’t be empty");
    if (!/\S+@\S+\.\S+/.test(e)) return toast("Enter a valid email address");
    Object.assign(U, { f, l: $("pl").value.trim(), g: $("pg").value, e });
    try {
      await log("Updated profile");
      await syncQuiz();
      toast("Changes saved ✓");
      render();
      $("avTop").textContent = ini();
    } catch (x) {
      fail(x);
    }
  };
  $("out").onclick = () => auth.signOut().then(() => go("home"));
  render();
  document.addEventListener("change", (e) => {
    if (e.target.matches("[data-language]")) setLanguage(e.target.value);
  });
  window.onLanguageChange = renderQuiz;
});
