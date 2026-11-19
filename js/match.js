/* Match details, locally oriented gift estimates, and optional nearby-store links */
const STORE_LIST = [
  { name: "dm", domain: "dm.hr" },
  { name: "Müller", domain: "mueller.hr" },
  { name: "Interspar", domain: "interspar.hr" },
  { name: "Konzum", domain: "konzum.hr" },
  { name: "Pepco", domain: "pepco.hr" },
  { name: "TEDi", domain: "tedi.com" },
  { name: "JYSK", domain: "jysk.hr" },
];
const GIFT_IDEAS = {
  Tech: [
    [
      "🧹",
      "Organizator za kablove",
      0.2,
      "Mali praktičan dodatak za uredniji radni stol.",
      ["TEDi", "Pepco", "Müller"],
    ],
    [
      "🔌",
      "Kabel za punjenje ili adapter",
      0.35,
      "Koristan dodatak; provjeri priključak i kompatibilnost.",
      ["Müller", "TEDi"],
    ],
    [
      "📱",
      "Stalak za mobitel",
      0.3,
      "Jednostavan dodatak za stol ili noćni ormarić.",
      ["TEDi", "Pepco", "Müller"],
    ],
  ],
  Books: [
    [
      "📓",
      "Bilježnica i set kemijskih olovaka",
      0.25,
      "Praktičan izbor za čitanje, posao ili školu.",
      ["Müller", "TEDi", "Pepco"],
    ],
    [
      "🔖",
      "Poklon-knjiga prema njihovom popisu želja",
      0.6,
      "Odaberi naslov s popisa želja i provjeri izdanje.",
      ["Müller"],
    ],
    [
      "🔦",
      "Čitalačka lampica",
      0.35,
      "Mali dodatak za čitanje kod kuće ili na putu.",
      ["Müller", "Pepco", "TEDi"],
    ],
  ],
  Coffee: [
    [
      "☕",
      "Šalica za kavu ili čaj",
      0.3,
      "Odaberi jednostavan dizajn ili šalicu za ponijeti.",
      ["Müller", "Pepco", "TEDi", "JYSK"],
    ],
    [
      "🍫",
      "Kava i čokolada za mali poklon-paket",
      0.4,
      "Složi nekoliko proizvoda prema njihovu ukusu.",
      ["Interspar", "Konzum", "Müller"],
    ],
    [
      "🫙",
      "Staklenka ili posuda za kavu",
      0.3,
      "Praktična ideja za kuhinju; provjeri dimenzije.",
      ["TEDi", "Pepco", "JYSK"],
    ],
  ],
  Gaming: [
    [
      "🎲",
      "Društvena ili kartaška igra",
      0.55,
      "Brza igra može biti dobar dodatak večeri s društvom.",
      ["Müller"],
    ],
    [
      "🍿",
      "Paket grickalica za večer igranja",
      0.3,
      "Složi paket prema omiljenim okusima i ograničenjima prehrane.",
      ["Interspar", "Konzum"],
    ],
    [
      "🗃️",
      "Kutija za spremanje sitnog pribora",
      0.25,
      "Koristan organizator za stol ili dodatke.",
      ["TEDi", "Pepco"],
    ],
  ],
  Fashion: [
    [
      "🧦",
      "Tople čarape",
      0.25,
      "Jednostavan izbor; provjeri veličinu i sastav.",
      ["Pepco", "Müller"],
    ],
    [
      "🧣",
      "Šal u neutralnoj boji",
      0.45,
      "Odaberi boju koja odgovara njihovim omiljenim bojama.",
      ["Pepco", "Müller", "JYSK"],
    ],
    [
      "🧤",
      "Zimske rukavice",
      0.4,
      "Praktičan sezonski poklon; provjeri veličinu.",
      ["Pepco", "Müller"],
    ],
  ],
  Home: [
    [
      "🧺",
      "Dekorativna košara za odlaganje",
      0.45,
      "Odaberi veličinu koja odgovara njihovu prostoru.",
      ["JYSK", "Pepco", "TEDi"],
    ],
    [
      "🪴",
      "Ukrasna tegla za biljku",
      0.3,
      "Dobar dodatak ako već imaju biljke ili začinsko bilje.",
      ["JYSK", "Pepco", "TEDi"],
    ],
    [
      "🕯️",
      "Dekorativni svijećnjak",
      0.3,
      "Provjeri sviđaju li im se svijeće i mirisi prije kupnje.",
      ["dm", "Pepco", "TEDi", "JYSK"],
    ],
  ],
  Travel: [
    [
      "🧳",
      "Putni organizatori za kofer",
      0.45,
      "Pomažu odvojiti odjeću i sitnice na putovanju.",
      ["JYSK", "Pepco", "TEDi"],
    ],
    [
      "🥤",
      "Boca za višekratnu upotrebu",
      0.35,
      "Praktična za izlete i svakodnevno nošenje.",
      ["Müller", "Pepco", "TEDi"],
    ],
    [
      "😴",
      "Maska za spavanje za put",
      0.25,
      "Mali dodatak za putovanja autobusom ili avionom.",
      ["JYSK", "Müller", "Pepco"],
    ],
  ],
  Music: [
    [
      "🎵",
      "Bilježnica za tekstove ili glazbene ideje",
      0.2,
      "Osobna i praktična ideja za zapisivanje ideja.",
      ["Müller", "TEDi", "Pepco"],
    ],
    [
      "🎧",
      "Organizator za slušalice i kablove",
      0.25,
      "Pomaže držati sitnu opremu uredno spremljenom.",
      ["Müller", "TEDi"],
    ],
    [
      "🎟️",
      "Poklon-bon za glazbu",
      0.5,
      "Provjeri koji servis ili trgovinu osoba koristi.",
      ["Müller"],
    ],
  ],
  Sports: [
    [
      "🥤",
      "Boca za trening",
      0.35,
      "Odaberi veličinu i poklopac koji odgovaraju aktivnosti.",
      ["Pepco", "TEDi", "Müller"],
    ],
    [
      "🧖",
      "Ručnik za trening",
      0.35,
      "Praktičan izbor za teretanu ili izlete.",
      ["JYSK", "Pepco"],
    ],
    [
      "🧦",
      "Sportske čarape",
      0.3,
      "Provjeri veličinu i namjenu prije kupnje.",
      ["Pepco", "Müller"],
    ],
  ],
  Art: [
    [
      "✏️",
      "Skicirka i olovke",
      0.35,
      "Dobar osnovni set za crtanje i bilješke.",
      ["Müller", "TEDi", "Pepco"],
    ],
    [
      "🎨",
      "Set flomastera ili bojica",
      0.35,
      "Odaberi veličinu seta prema budžetu.",
      ["Müller", "TEDi"],
    ],
    [
      "🖌️",
      "Kutija za kreativni pribor",
      0.25,
      "Može poslužiti za spremanje pribora za rukotvorine.",
      ["TEDi", "Pepco"],
    ],
  ],
  Cooking: [
    [
      "🥄",
      "Kuhinjski pribor",
      0.35,
      "Odaberi alat koji odgovara onome što vole kuhati.",
      ["Interspar", "Konzum", "TEDi", "Pepco"],
    ],
    [
      "🧂",
      "Začini za određenu kuhinju",
      0.3,
      "Složi mali set začina prema njihovim ukusima.",
      ["Interspar", "Konzum"],
    ],
    [
      "🫙",
      "Staklenke za pohranu namirnica",
      0.35,
      "Praktičan dodatak za organiziranu kuhinju.",
      ["JYSK", "TEDi", "Pepco"],
    ],
  ],
  Nature: [
    [
      "🌱",
      "Mali set za uzgoj začinskog bilja",
      0.4,
      "Provjeri uvjete uzgoja i prostor koji imaju.",
      ["Interspar", "Konzum", "Pepco"],
    ],
    [
      "🪴",
      "Tegla za biljku",
      0.3,
      "Uskladi veličinu s biljkom koju već imaju.",
      ["JYSK", "Pepco", "TEDi"],
    ],
    [
      "🌼",
      "Sjemenke sezonskog cvijeća",
      0.15,
      "Lagan poklon za osobu koja voli vrt ili balkon.",
      ["Interspar", "Konzum"],
    ],
  ],
  Movies: [
    [
      "🍿",
      "Paket za filmsku večer",
      0.3,
      "Složi grickalice prema njihovim omiljenim okusima.",
      ["Interspar", "Konzum"],
    ],
    [
      "🥤",
      "Čaše za filmske večeri",
      0.3,
      "Praktičan dodatak za kućno gledanje filmova.",
      ["Pepco", "TEDi", "JYSK"],
    ],
    [
      "🎟️",
      "Poklon-bon za kino",
      0.55,
      "Provjeri dostupne kino-lokacije i uvjete bona.",
      ["Müller"],
    ],
  ],
  Pets: [
    [
      "🐾",
      "Poslastice za kućnog ljubimca",
      0.25,
      "Provjeri vrstu ljubimca i sastojke prije kupnje.",
      ["Interspar", "Konzum", "dm"],
    ],
    [
      "🧸",
      "Igračka za ljubimca",
      0.35,
      "Odaberi prema vrsti i veličini ljubimca.",
      ["Müller", "Pepco"],
    ],
    [
      "🧺",
      "Podloga ili dekica za ljubimca",
      0.45,
      "Provjeri dimenzije i mogućnost pranja.",
      ["JYSK", "Pepco"],
    ],
  ],
};
const WISH_CATEGORIES = {
  "Books & stationery": ["Books", "Art"],
  "Tech accessories": ["Tech"],
  "Board games & puzzles": ["Gaming"],
  "Coffee & tea": ["Coffee"],
  "Cooking & baking": ["Cooking"],
  "Art & craft supplies": ["Art"],
  "Plants & home decor": ["Nature", "Home"],
  "Clothing & accessories": ["Fashion"],
  "Experiences & activities": ["Movies", "Travel"],
  "Sports & outdoors": ["Sports", "Travel"],
};
const MATCH_COPY = {
  hr: {
    title: "Ideje za kupnju u Hrvatskoj",
    notice:
      "Ovo su okvirni prijedlozi za trgovine koje si naveo. Cijene i dostupnost nisu potvrđene; provjeri ih prije odlaska.",
    nearby: "Pronađi trgovine u blizini",
    privacy:
      "Lokacija se traži samo nakon klika. Aplikacija je ne sprema; približna lokacija šalje se Kartama tek kad otvoriš poveznicu.",
    loading: "Tražim lokaciju…",
    search: "Pretraži trgovinu",
    availability: "Procjena — zaliha nije potvrđena",
    estimated: "Okvirno",
    locationDenied:
      "Pristup lokaciji nije dopušten. Možeš ga uključiti u postavkama preglednika.",
    locationFailed: "Lokaciju trenutačno nije moguće dohvatiti.",
    locationUnsupported: "Ovaj preglednik ne podržava lokaciju.",
    storeLabel: "Moguće trgovine za provjeru",
  },
  en: {
    title: "Gift ideas to check in Croatia",
    notice:
      "These are approximate ideas for the listed retailers. Prices and stock are not verified; check before visiting.",
    nearby: "Find nearby stores",
    privacy:
      "Location is requested only after clicking. The app does not save it; approximate coordinates are sent to Maps only if you open a link.",
    loading: "Getting location…",
    search: "Search retailer",
    availability: "Estimate — stock not confirmed",
    estimated: "Approx.",
    locationDenied:
      "Location access was denied. You can enable it in your browser settings.",
    locationFailed: "Your location could not be retrieved.",
    locationUnsupported: "This browser does not support location.",
    storeLabel: "Possible stores to check",
  },
  de: {
    title: "Geschenkideen zum Prüfen in Kroatien",
    notice:
      "Dies sind ungefähre Vorschläge für die genannten Händler. Preise und Bestand sind nicht bestätigt; bitte vorher prüfen.",
    nearby: "Geschäfte in der Nähe finden",
    privacy:
      "Der Standort wird erst nach einem Klick abgefragt. Die App speichert ihn nicht; ungefähre Koordinaten werden erst beim Öffnen eines Kartenlinks an Maps gesendet.",
    loading: "Standort wird ermittelt…",
    search: "Händler suchen",
    availability: "Schätzung — Bestand nicht bestätigt",
    estimated: "Ca.",
    locationDenied:
      "Der Standortzugriff wurde abgelehnt. Du kannst ihn in den Browsereinstellungen aktivieren.",
    locationFailed: "Dein Standort konnte nicht ermittelt werden.",
    locationUnsupported: "Dieser Browser unterstützt keine Standortbestimmung.",
    storeLabel: "Mögliche Geschäfte zum Prüfen",
  },
};

boot(async () => {
  const code = roomCode();
  if (!code) return go("dash");
  $("back").onclick = () => goRoom("lobby", code);
  let room,
    match,
    ideas = [];
  const copy = MATCH_COPY[appLanguage] || MATCH_COPY.en;
  $("aiT").textContent = copy.title;
  $("stockNote").textContent = copy.notice;
  $("nearby").textContent = copy.nearby;
  $("locationPrivacy").textContent = copy.privacy;
  try {
    const [roomSnapshot, matchSnapshot] = await Promise.all([
      db.doc("rooms/" + code).get(),
      db.doc(`rooms/${code}/matches/${uid}`).get(),
    ]);
    if (!roomSnapshot.exists) return go("dash");
    room = roomSnapshot.data();
    if (!matchSnapshot.exists) {
      $("mc").innerHTML =
        '<h2>Names haven’t been drawn yet</h2><p class="mut">Once the host draws, your match will show up here.</p>';
      $("localGifts").classList.add("hide");
      return;
    }
    match = matchSnapshot.data();
  } catch (e) {
    $("mc").innerHTML =
      '<p class="mut" role="status">Could not load your match. Please try again.</p>';
    $("localGifts").classList.add("hide");
    return fail(e);
  }

  function getIdeas() {
    const categories = [...(match.tags || [])];
    (match.wishlist || "")
      .split(/\r?\n/)
      .map((x) => x.trim())
      .filter(Boolean)
      .forEach((wish) => {
        categories.push(...(WISH_CATEGORIES[wish] || []));
      });
    const unique = categories.filter(
      (category, index) => categories.indexOf(category) === index,
    );
    const relevant = unique.filter((category) => GIFT_IDEAS[category]);
    const selected = relevant.length ? relevant : ["Home", "Books", "Coffee"];
    return selected
      .flatMap((category) => GIFT_IDEAS[category])
      .slice(0, 6)
      .map(([emoji, title, ratio, reason, stores]) => ({
        e: emoji,
        t: title,
        p: Math.max(1, Math.round(room.budget * ratio)),
        ratio,
        reason,
        stores,
      }));
  }

  function renderMatch() {
    const name = match.name || "";
    $("mc").innerHTML =
      `<div class="row" style="gap:18px;align-items:flex-start;flex-wrap:wrap"><div class="av" style="width:72px;height:72px;font-size:22px;cursor:default">${esc(
        name
          .split(" ")
          .map((x) => x[0])
          .join(""),
      )}</div><div style="flex:1;min-width:220px"><div class="mut" style="font-size:13px">Your secret match</div><h1>Buying for: ${esc(name)}</h1><p class="mut" style="margin:6px 0 10px">${esc(match.gender || "—")} · Size ${esc(match.size || "—")}</p><div class="chips">${(match.tags || []).map((t) => `<span class="chip sm">${esc(t)}</span>`).join("")}</div><p style="margin:12px 0 0"><b>Dislikes:</b> ${esc(match.dislikes || "") || "—"}<br><b>Wishlist:</b> ${esc(match.wishlist || "").replace(/\r?\n/g, "<br>") || "—"}</p></div></div>`;
    $("localGifts").classList.remove("hide");
    ideas = getIdeas();
    $("ideas").innerHTML = ideas
      .map((idea, index) => {
        const saved = U.saved.some((item) => item.t === idea.t);
        const storeLinks = idea.stores
          .map((name) => {
            const store = STORE_LIST.find((item) => item.name === name);
            if (!store) return "";
            const search = new URL("https://www.google.com/search");
            search.searchParams.set("q", `site:${store.domain} ${idea.t}`);
            return `<a href="${esc(search.href)}" target="_blank" rel="noopener noreferrer">${esc(name)} ↗</a>`;
          })
          .join("");
        return `<div class="card"><div class="img" style="background:${BG[index % BG.length]}">${idea.e}</div><h3 style="font-size:16px;margin-bottom:8px">${esc(idea.t)}</h3><div class="idea-meta"><span class="price">${esc(copy.estimated)} €${idea.p}</span><button class="heart ${saved ? "on" : ""}" aria-label="Save gift" data-sv="${index}">${saved ? "♥" : "♡"}</button></div><span class="availability">${esc(copy.availability)}</span><p class="reason">${esc(idea.reason)}</p><div class="store-label">${esc(copy.storeLabel)}</div><div class="store-links">${storeLinks}</div></div>`;
      })
      .join("");
  }

  $("nearby").onclick = () => {
    if (!navigator.geolocation) {
      toast(copy.locationUnsupported);
      return;
    }
    const button = $("nearby");
    button.disabled = true;
    button.textContent = copy.loading;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude.toFixed(2),
          longitude = position.coords.longitude.toFixed(2);
        $("nearbyStores").innerHTML = STORE_LIST.map((store) => {
          const query = `${store.name} near ${latitude},${longitude}`;
          const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
          return `<a href="${esc(mapUrl)}" target="_blank" rel="noopener noreferrer">${esc(store.name)} ↗</a>`;
        }).join("");
        button.disabled = false;
        button.textContent = copy.nearby;
      },
      (error) => {
        button.disabled = false;
        button.textContent = copy.nearby;
        toast(error.code === 1 ? copy.locationDenied : copy.locationFailed);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    );
  };
  $("ideas").onclick = async (event) => {
    const button = event.target.closest("[data-sv]");
    if (!button) return;
    const idea = ideas[Number(button.dataset.sv)];
    if (!idea) return;
    const index = U.saved.findIndex((item) => item.t === idea.t);
    if (index < 0) {
      U.saved.push({ e: idea.e, t: idea.t, p: idea.p, estimate: true });
      toast("Saved to your gifts ♥");
    } else {
      U.saved.splice(index, 1);
      toast("Removed from saved");
    }
    renderMatch();
    try {
      await saveU();
    } catch (e) {
      fail(e);
    }
  };
  renderMatch();
});
