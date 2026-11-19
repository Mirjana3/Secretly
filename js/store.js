/* Shared: Firebase init, helpers, quiz data, navigation, boot() */
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(),
  db = firebase.firestore(),
  FV = firebase.firestore.FieldValue;
const $ = (id) => document.getElementById(id),
  Q = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) =>
  String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );
const TRANSLATIONS = {
  en: {
    language: "Language",
    interests: "Your interests",
    clothingSize: "Clothing size",
    favoriteColors: "Favorite colors",
    dislikes: "Things I don’t want",
    giftIdeas: "Gift ideas",
    giftIdeasHelp:
      "Choose any that fit, then add a specific wish if it isn’t listed.",
    add: "Add",
    more: "More",
    less: "Show less",
    otherWishes: "Other wishes",
    wishPlaceholder:
      "Write a specific gift, brand, book, or anything else you’d love…",
    saveQuiz: "Save My Quiz →",
    quizTitle: "Help us know you.",
    quizIntro:
      "Your answers help your Secret Santa choose something that feels personal.",
    addInterest: "Add an interest",
    addGiftIdea: "Add a gift idea",
    newInterest: "New interest",
    newGiftIdea: "New gift idea",
    yourEntry: "Type your own option",
    cancel: "Cancel",
    addOption: "Add",
    emptyOption: "Enter an option first",
    duplicateOption: "That option is already on the list.",
    dislikesSummary: "Dislikes",
    wishlistSummary: "Wishlist",
    editQuiz: "Edit my quiz",
    tagLabels: {
      Tech: "Tech",
      Books: "Books",
      Coffee: "Coffee",
      Gaming: "Gaming",
      Fashion: "Fashion",
      Home: "Home",
      Travel: "Travel",
      Music: "Music",
      Sports: "Sports",
      Art: "Art",
      Cooking: "Cooking",
      Nature: "Nature",
      Movies: "Movies",
      Pets: "Pets",
    },
    wishLabels: {
      "Books & stationery": "Books & stationery",
      "Tech accessories": "Tech accessories",
      "Board games & puzzles": "Board games & puzzles",
      "Coffee & tea": "Coffee & tea",
      "Cooking & baking": "Cooking & baking",
      "Art & craft supplies": "Art & craft supplies",
      "Plants & home decor": "Plants & home decor",
      "Clothing & accessories": "Clothing & accessories",
      "Experiences & activities": "Experiences & activities",
      "Sports & outdoors": "Sports & outdoors",
    },
  },
  hr: {
    language: "Jezik",
    interests: "Moji interesi",
    clothingSize: "Veličina odjeće",
    favoriteColors: "Omiljene boje",
    dislikes: "Što ne želim",
    giftIdeas: "Ideje za poklon",
    giftIdeasHelp:
      "Odaberi što ti odgovara, a želju koja nedostaje dodaj zasebno.",
    add: "Dodaj",
    more: "Više",
    less: "Prikaži manje",
    otherWishes: "Ostale želje",
    wishPlaceholder:
      "Upiši poklon, marku, knjigu ili nešto drugo što bi te razveselilo…",
    saveQuiz: "Spremi kviz →",
    quizTitle: "Upoznajmo te.",
    quizIntro: "Odgovori pomažu tvom Secret Santi odabrati osoban poklon.",
    addInterest: "Dodaj interes",
    addGiftIdea: "Dodaj ideju za poklon",
    newInterest: "Novi interes",
    newGiftIdea: "Nova ideja za poklon",
    yourEntry: "Upiši vlastitu stavku",
    cancel: "Odustani",
    addOption: "Dodaj",
    emptyOption: "Najprije upiši stavku",
    duplicateOption: "Ta stavka je već na popisu.",
    dislikesSummary: "Ne voli",
    wishlistSummary: "Lista želja",
    editQuiz: "Uredi moj kviz",
    tagLabels: {
      Tech: "Tehnologija",
      Books: "Knjige",
      Coffee: "Kava",
      Gaming: "Videoigre",
      Fashion: "Moda",
      Home: "Dom",
      Travel: "Putovanja",
      Music: "Glazba",
      Sports: "Sport",
      Art: "Umjetnost",
      Cooking: "Kuhanje",
      Nature: "Priroda",
      Movies: "Filmovi",
      Pets: "Kućni ljubimci",
    },
    wishLabels: {
      "Books & stationery": "Knjige i pribor",
      "Tech accessories": "Tehnološki dodaci",
      "Board games & puzzles": "Društvene igre i slagalice",
      "Coffee & tea": "Kava i čaj",
      "Cooking & baking": "Kuhanje i pečenje",
      "Art & craft supplies": "Likovni i kreativni pribor",
      "Plants & home decor": "Biljke i uređenje doma",
      "Clothing & accessories": "Odjeća i modni dodaci",
      "Experiences & activities": "Doživljaji i aktivnosti",
      "Sports & outdoors": "Sport i aktivnosti na otvorenom",
    },
  },
  de: {
    language: "Sprache",
    interests: "Meine Interessen",
    clothingSize: "Kleidergröße",
    favoriteColors: "Lieblingsfarben",
    dislikes: "Was ich nicht möchte",
    giftIdeas: "Geschenkideen",
    giftIdeasHelp:
      "Wähle passende Ideen aus und füge einen eigenen Wunsch hinzu, falls er fehlt.",
    add: "Hinzufügen",
    more: "Mehr",
    less: "Weniger anzeigen",
    otherWishes: "Weitere Wünsche",
    wishPlaceholder:
      "Schreibe ein Geschenk, eine Marke, ein Buch oder einen anderen Wunsch auf…",
    saveQuiz: "Quiz speichern →",
    quizTitle: "Lerne uns kennen.",
    quizIntro:
      "Deine Antworten helfen deinem Secret Santa, ein persönliches Geschenk zu finden.",
    addInterest: "Interesse hinzufügen",
    addGiftIdea: "Geschenkidee hinzufügen",
    newInterest: "Neues Interesse",
    newGiftIdea: "Neue Geschenkidee",
    yourEntry: "Eigene Option eingeben",
    cancel: "Abbrechen",
    addOption: "Hinzufügen",
    emptyOption: "Bitte zuerst eine Option eingeben",
    duplicateOption: "Diese Option steht bereits auf der Liste.",
    dislikesSummary: "Abneigungen",
    wishlistSummary: "Wunschliste",
    editQuiz: "Mein Quiz bearbeiten",
    tagLabels: {
      Tech: "Technik",
      Books: "Bücher",
      Coffee: "Kaffee",
      Gaming: "Gaming",
      Fashion: "Mode",
      Home: "Zuhause",
      Travel: "Reisen",
      Music: "Musik",
      Sports: "Sport",
      Art: "Kunst",
      Cooking: "Kochen",
      Nature: "Natur",
      Movies: "Filme",
      Pets: "Haustiere",
    },
    wishLabels: {
      "Books & stationery": "Bücher und Schreibwaren",
      "Tech accessories": "Technikzubehör",
      "Board games & puzzles": "Brettspiele und Puzzle",
      "Coffee & tea": "Kaffee und Tee",
      "Cooking & baking": "Kochen und Backen",
      "Art & craft supplies": "Kunst- und Bastelbedarf",
      "Plants & home decor": "Pflanzen und Wohndeko",
      "Clothing & accessories": "Kleidung und Accessoires",
      "Experiences & activities": "Erlebnisse und Aktivitäten",
      "Sports & outdoors": "Sport und draußen",
    },
  },
};
let appLanguage = "en";
try {
  const savedLanguage = localStorage.getItem("secretly-language");
  if (TRANSLATIONS[savedLanguage]) appLanguage = savedLanguage;
} catch (_) {}
const tr = (key) =>
  TRANSLATIONS[appLanguage][key] || TRANSLATIONS.en[key] || key;
const choiceLabel = (group, value) =>
  TRANSLATIONS[appLanguage][group][value] || value;
const setLanguage = (value) => {
  appLanguage = TRANSLATIONS[value] ? value : "en";
  try {
    localStorage.setItem("secretly-language", appLanguage);
  } catch (_) {}
  document.documentElement.lang = appLanguage;
  Q("[data-language]").forEach((s) => {
    s.value = appLanguage;
    s.setAttribute("aria-label", tr("language"));
  });
  Q("[data-i18n]").forEach((e) => (e.textContent = tr(e.dataset.i18n)));
  Q("[data-i18n-placeholder]").forEach(
    (e) => (e.placeholder = tr(e.dataset.i18nPlaceholder)),
  );
  if (window.onLanguageChange) window.onLanguageChange();
};
document.documentElement.lang = appLanguage;
const fmt = (d) =>
  new Date(d + "T12:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
const PAGES = {
  home: "index.html",
  dash: "dashboard.html",
  lobby: "lobby.html",
  match: "match.html",
  profile: "profile.html",
};
const TAGS = [
    "Tech",
    "Books",
    "Coffee",
    "Gaming",
    "Fashion",
    "Home",
    "Travel",
    "Music",
    "Sports",
    "Art",
    "Cooking",
    "Nature",
    "Movies",
    "Pets",
  ],
  SIZES = ["XS", "S", "M", "L", "XL"];
const BG = ["#f9e0d9", "#dcebe1", "#fdf0c9"];
const EMPTY_QUIZ = { tags: [], size: "M", colors: [], dl: "", wl: "" };
let U = null,
  uid = null; /* U = profile document of the signed-in user (users/{uid}) */
const fullName = () => (U.f + " " + (U.l || "")).trim();
const ini = () => ((U.f || "")[0] || "") + ((U.l || "")[0] || "");
const saveU = () => db.doc("users/" + uid).set(U);
const log = (t) => {
  U.act = [{ t, w: new Date().toISOString() }, ...(U.act || [])].slice(0, 15);
  return saveU();
};
const roomCode = () =>
  (new URLSearchParams(location.search).get("room") || "").toUpperCase();
const flash = (m) => {
  try {
    sessionStorage.setItem("flash", m);
  } catch (_) {}
};
const go = (n) => {
  location.href = PAGES[n];
};
const goFlash = (n, m) => {
  flash(m);
  go(n);
};
const goRoom = (p, c, m) => {
  if (m) flash(m);
  location.href = PAGES[p] + "?room=" + c;
};
let tt;
function toast(m) {
  const t = $("toast");
  t.textContent = m;
  t.classList.add("on");
  clearTimeout(tt);
  tt = setTimeout(() => t.classList.remove("on"), 2400);
}
const fail = (e) => {
  console.error(e);
  toast(
    e && e.code === "permission-denied"
      ? "Not allowed. Check the Firestore rules."
      : "Something went wrong. Please try again.",
  );
};
/* what other people may see about you in a room */
const quizDoc = () => ({
  name: fullName(),
  gender: U.g || "",
  size: U.quiz.size,
  tags: U.quiz.tags,
  colors: U.quiz.colors,
  dislikes: U.quiz.dl,
  wishlist: U.quiz.wl,
});
const enterRoom = (code) =>
  Promise.all([
    db
      .doc(`rooms/${code}/members/${uid}`)
      .set({ name: fullName(), ready: U.quiz.tags.length > 0 }),
    db.doc(`rooms/${code}/quizzes/${uid}`).set(quizDoc()),
  ]);
async function syncQuiz() {
  const s = await db
    .collection("rooms")
    .where("memberIds", "array-contains", uid)
    .get();
  await Promise.all(s.docs.map((d) => enterRoom(d.id)));
}
/* navigation: data-go="dash|lobby|match|profile|home", data-auth="signup|login|quiz" */
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-go],[data-auth]");
  if (!t) return;
  t.dataset.go
    ? go(t.dataset.go)
    : (location.href = "auth.html?m=" + t.dataset.auth);
});
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Enter" &&
    e.target.matches("[data-go],[data-auth]") &&
    e.target.tagName !== "BUTTON"
  )
    e.target.click();
});
if (firebaseConfig.apiKey.startsWith("YOUR"))
  document.body.insertAdjacentHTML(
    "afterbegin",
    '<div style="background:#D62828;color:#fff;padding:10px;text-align:center;font-weight:600">Firebase isn’t set up yet: paste your config into js/firebase-config.js</div>',
  );
/* boot(cb): waits for sign-in, loads the profile, then calls cb(user, profile).
   Protected pages redirect to the login screen; {public:true} pages (home, auth) get null. */
function boot(cb, opts = {}) {
  const off = auth.onAuthStateChanged(async (u) => {
    off();
    try {
      try {
        const f = sessionStorage.getItem("flash");
        if (f) {
          sessionStorage.removeItem("flash");
          toast(f);
        }
      } catch (_) {}
      if (!u) {
        if (opts.public) return cb(null, null);
        return location.replace("auth.html?m=login");
      }
      uid = u.uid;
      const s = await db.doc("users/" + uid).get();
      if (s.exists) {
        U = s.data();
        U.quiz = { ...EMPTY_QUIZ, ...U.quiz };
        U.saved = U.saved || [];
        U.act = U.act || [];
      } else if (!opts.public) return location.replace("auth.html?m=quiz");
      if (U && $("avTop")) {
        $("avTop").textContent = ini();
        $("quizBtn").onclick = () => (location.href = "auth.html?m=quiz");
      }
      cb(u, U);
    } catch (e) {
      fail(e);
    }
  });
}
