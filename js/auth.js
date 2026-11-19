/* Auth: Sign Up / Log In and the gift quiz */
const AUTH_ERR = {
  "auth/email-already-in-use": "That email already has an account. Try Log In.",
  "auth/invalid-credential": "Wrong email or password.",
  "auth/wrong-password": "Wrong email or password.",
  "auth/user-not-found": "Wrong email or password.",
  "auth/weak-password": "Password needs at least 6 characters.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/too-many-requests": "Too many attempts. Try again later.",
  "auth/operation-not-allowed":
    "This sign-in method isn’t enabled in Firebase yet.",
  "auth/unauthorized-domain":
    "This domain isn’t authorized in Firebase Authentication.",
};
const aerr = (e) => {
  if (
    e.code !== "auth/popup-closed-by-user" &&
    e.code !== "auth/cancelled-popup-request"
  )
    toast(AUTH_ERR[e.code] || e.message);
};
const WISH_IDEAS = [
  "Books & stationery",
  "Tech accessories",
  "Board games & puzzles",
  "Coffee & tea",
  "Cooking & baking",
  "Art & craft supplies",
  "Plants & home decor",
  "Clothing & accessories",
  "Experiences & activities",
  "Sports & outdoors",
];
const VISIBLE_CHOICES = 6;
let customTags = [],
  customWishes = [];
let selectedTags = [],
  selectedWishes = [];

function renderChoices() {
  const tagOptions = [...TAGS, ...customTags.filter((x) => !TAGS.includes(x))];
  const wishOptions = [
    ...WISH_IDEAS,
    ...customWishes.filter((x) => !WISH_IDEAS.includes(x)),
  ];
  const tagBox = document.querySelector('[data-list="interests"]');
  const wishBox = document.querySelector('[data-list="wishes"]');
  function renderList(box, values, selected, group) {
    const expanded = box.dataset.expanded === "true";
    const shown = expanded
      ? values
      : [
          ...values.slice(0, VISIBLE_CHOICES),
          ...values.filter(
            (x) =>
              selected.includes(x) &&
              !values.slice(0, VISIBLE_CHOICES).includes(x),
          ),
        ];
    box.innerHTML = shown
      .map((value) => {
        const on = selected.includes(value),
          label = choiceLabel(group, value);
        return `<button type="button" class="chip ${on ? "on" : ""}" data-choice data-value="${esc(value)}" aria-pressed="${on}">${esc(label)}</button>`;
      })
      .join("");
    const more = box.parentElement.querySelector(
      `[data-expand="${box.dataset.list}"]`,
    );
    more.hidden = values.length <= VISIBLE_CHOICES;
    more.setAttribute("aria-expanded", String(expanded));
    more.textContent = expanded ? tr("less") : tr("more");
  }
  renderList(tagBox, tagOptions, selectedTags, "tagLabels");
  renderList(wishBox, wishOptions, selectedWishes, "wishLabels");
}

function quizUI() {
  const q = (U && U.quiz) || EMPTY_QUIZ;
  const wishes = q.wl
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean);
  customTags = q.tags.filter((x) => !TAGS.includes(x));
  customWishes = wishes.filter((x) => !WISH_IDEAS.includes(x));
  selectedTags = [...q.tags];
  selectedWishes = [...wishes];
  Q("[data-list]").forEach((box) => {
    box.dataset.expanded = "false";
  });
  Q('[data-g="size"] .chip').forEach((b) => b.remove());
  document.querySelector('[data-g="size"]').innerHTML = SIZES.map(
    (x) =>
      `<button type="button" class="chip ${x === q.size ? "on" : ""}" data-choice data-value="${x}" aria-pressed="${x === q.size}">${x}</button>`,
  ).join("");
  $("co").value = q.colors.join(", ");
  $("dl").value = q.dl;
  $("wl").value = "";
  renderChoices();
  setLanguage(appLanguage);
}

function readQuiz() {
  const choices = [...WISH_IDEAS, ...customWishes];
  const selectedSize = Q(
    ".chip.on",
    document.querySelector('[data-g="size"]'),
  )[0];
  const freeWishes = $("wl")
    .value.split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean)
    .filter(
      (x) =>
        !choices.some(
          (option) => option.toLocaleLowerCase() === x.toLocaleLowerCase(),
        ),
    );
  U.quiz = {
    tags: [...selectedTags],
    size: selectedSize ? selectedSize.dataset.value : "M",
    colors: $("co")
      .value.split(",")
      .map((x) => x.trim())
      .filter(Boolean),
    dl: $("dl").value.trim(),
    wl: [...selectedWishes, ...freeWishes].join("\n"),
  };
}

function syncWishText() {
  const choices = [...WISH_IDEAS, ...customWishes];
  const typed = $("wl")
    .value.split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean)
    .filter(
      (x) =>
        !choices.some(
          (option) => option.toLocaleLowerCase() === x.toLocaleLowerCase(),
        ),
    );
  $("wl").value = [...selectedWishes, ...typed].join("\n");
}

function mode(m) {
  const l = m === "login";
  Q("[data-tab]").forEach((b) => b.classList.toggle("on", b.dataset.tab === m));
  Q(".su").forEach((e) => e.classList.toggle("hide", l));
  $("authGo").textContent = l ? "Log In  →" : "Create Account  →";
  $("authT").textContent = l ? "Welcome back." : "Start something joyful.";
  $("authS").textContent = l
    ? "Log in to see your rooms, matches, and saved ideas."
    : "Create an account and make this year’s exchange effortless.";
  $("authGo").dataset.m = m;
}
function showQuiz() {
  $("st1").classList.add("hide");
  $("st2").classList.remove("hide");
  quizUI();
}

document.addEventListener("click", (e) => {
  const language = e.target.closest("[data-language]");
  if (language) return;
  const tab = e.target.closest("[data-tab]");
  if (tab) return mode(tab.dataset.tab);
  const expand = e.target.closest("[data-expand]");
  if (expand) {
    const box = document.querySelector(
      `[data-list="${expand.dataset.expand}"]`,
    );
    box.dataset.expanded = box.dataset.expanded !== "true";
    renderChoices();
    return;
  }
  const add = e.target.closest("[data-add-custom]");
  if (add) {
    const dialog = $("customDialog"),
      target = add.dataset.addCustom;
    dialog.dataset.target = target;
    $("customDialogTitle").textContent = tr(
      target === "interests" ? "newInterest" : "newGiftIdea",
    );
    $("customValue").value = "";
    dialog.showModal();
    $("customValue").focus();
    return;
  }
  if (e.target.closest("#cancelCustom")) {
    $("customDialog").close();
    return;
  }
  const choice = e.target.closest("[data-choice]");
  if (!choice) return;
  const box = choice.closest("[data-g],[data-list]");
  if (box.dataset.one) {
    Q(".chip", box).forEach((b) => {
      b.classList.remove("on");
      b.setAttribute("aria-pressed", "false");
    });
  } else if (
    box.dataset.list === "interests" ||
    box.dataset.list === "wishes"
  ) {
    choice.classList.toggle("on");
    choice.setAttribute(
      "aria-pressed",
      String(choice.classList.contains("on")),
    );
    if (box.dataset.list === "interests")
      selectedTags = Q(".chip.on", box).map((b) => b.dataset.value);
    else {
      selectedWishes = Q(".chip.on", box).map((b) => b.dataset.value);
      syncWishText();
    }
    return;
  }
  choice.classList.toggle("on");
  choice.setAttribute("aria-pressed", String(choice.classList.contains("on")));
});

$("customForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const value = $("customValue").value.trim(),
    target = $("customDialog").dataset.target;
  if (!value) {
    toast(tr("emptyOption"));
    return;
  }
  const options =
    target === "interests"
      ? [...TAGS, ...customTags]
      : [...WISH_IDEAS, ...customWishes];
  if (
    options.some((x) => x.toLocaleLowerCase() === value.toLocaleLowerCase())
  ) {
    toast(tr("duplicateOption"));
    return;
  }
  if (target === "interests") {
    customTags.push(value);
    selectedTags.push(value);
  } else {
    customWishes.push(value);
    selectedWishes.push(value);
  }
  const box = document.querySelector(`[data-list="${target}"]`);
  box.dataset.expanded = "true";
  renderChoices();
  const added = Q(".chip", box).find((b) => b.dataset.value === value);
  if (added) {
    added.classList.add("on");
    added.setAttribute("aria-pressed", "true");
  }
  if (target === "wishes") syncWishText();
  $("customDialog").close();
});

Q("[data-language]").forEach((select) =>
  select.addEventListener("change", () => setLanguage(select.value)),
);
window.onLanguageChange = () => {
  if (!$("st2").classList.contains("hide")) renderChoices();
};

const newProfile = (f, l, g, e) => ({
  f,
  l,
  g,
  e,
  quiz: { ...EMPTY_QUIZ },
  saved: [],
  act: [{ t: "Created account", w: new Date().toISOString() }],
});
$("authGo").onclick = async () => {
  const b = $("authGo"),
    m = b.dataset.m,
    em = $("em").value.trim(),
    pw = $("pw").value;
  if (!/\S+@\S+\.\S+/.test(em)) return toast("Enter a valid email address");
  if (pw.length < 6) return toast("Password needs at least 6 characters");
  b.disabled = true;
  try {
    if (m === "login") {
      await auth.signInWithEmailAndPassword(em, pw);
      return goFlash("dash", "Welcome back!");
    }
    const c = await auth.createUserWithEmailAndPassword(em, pw);
    uid = c.user.uid;
    U = newProfile(
      $("fn").value.trim() || "Friend",
      $("ln").value.trim(),
      $("gd").value,
      em,
    );
    await saveU();
    showQuiz();
  } catch (e) {
    aerr(e);
  } finally {
    b.disabled = false;
  }
};
$("google").onclick = async () => {
  try {
    const r = await auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider(),
    );
    uid = r.user.uid;
    const s = await db.doc("users/" + uid).get();
    if (s.exists) return goFlash("dash", "Welcome back!");
    const [f, ...l] = (r.user.displayName || "Friend").split(" ");
    U = newProfile(f, l.join(" "), "", r.user.email || "");
    await saveU();
    showQuiz();
  } catch (e) {
    aerr(e);
  }
};
$("saveQ").onclick = async () => {
  try {
    readQuiz();
    await log("Updated gift quiz");
    await syncQuiz();
    goFlash("dash", "Profile saved ✓");
  } catch (e) {
    fail(e);
  }
};
const m0 = new URLSearchParams(location.search).get("m") || "signup";
boot(
  (u, p) => {
    if (u && !p)
      U = newProfile(
        (u.displayName || "Friend").split(" ")[0],
        "",
        "",
        u.email || "",
      );
    if (u && m0 !== "quiz") return go("dash");
    m0 === "quiz" && u ? showQuiz() : mode(m0 === "login" ? "login" : "signup");
  },
  { public: true },
);
