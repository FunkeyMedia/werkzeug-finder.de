const TAG = "Onlinestarkei-21";
document.head.insertAdjacentHTML(
  "beforeend",
  '<link rel="stylesheet" href="/enhancements.css"><link rel="stylesheet" href="/product-content.css">',
);
document
  .querySelector("nav")
  .insertAdjacentHTML(
    "beforeend",
    '<a href="/ratgeber/werkzeugkoffer-grundausstattung">Mein erster Werkzeugkoffer</a><a href="/ratgeber/werkstatt-einrichten">Mein Werkzeugkeller</a>',
  );
let compare = new Set(JSON.parse(sessionStorage.getItem("wf-compare") || "[]"));
let products = [
  [
    "B01M8G4JVD",
    "Brüder Mannesmann",
    "Werkzeugkoffer M29084, 87-teilig",
    "Koffer",
    "Wohnung",
    "49,99 €",
    "https://m.media-amazon.com/images/I/81JdHjnV9eL._AC_AIweblab1378949,T3_SF516.0,327.0_PQ65_.jpg?aicid=productui-image-1",
  ],
  [
    "B084XPQNG2",
    "kwb",
    "Universal-Werkzeugkoffer, 42-teilig",
    "Koffer",
    "Wohnung",
    "35,49 €",
    "https://m.media-amazon.com/images/I/61ijNy57kjL._AC_AIweblab1378949,T3_SF516.0,327.0_PQ65_.jpg?aicid=productui-image-1",
  ],
  [
    "B0051E16LW",
    "Brüder Mannesmann",
    "Haushalts-Werkzeugkoffer M29085, 89-teilig",
    "Koffer",
    "Haus",
    "52,84 €",
    "https://m.media-amazon.com/images/I/719CZ7WNJIL._AC_AIweblab1378949,T3_SF516.0,327.0_PQ65_.jpg?aicid=productui-image-1",
  ],
  [
    "B07X9YL4JT",
    "Hi-Spec",
    "Werkzeugset Haushalt & Garage, 53-teilig",
    "Koffer",
    "Werkstatt",
    "26,99 €",
    "https://m.media-amazon.com/images/I/81ShRRiSKqL._AC_AIweblab1378949,T3_SF480.0,480.0_PQ65_.jpg?aicid=productui-image-1",
  ],
  [
    "B076B5VS85",
    "Brüder Mannesmann",
    "Werkzeugkoffer M29032, 47-teilig",
    "Koffer",
    "Wohnung",
    "33,48 €",
    "https://m.media-amazon.com/images/I/81CgXt3mC9L._AC_AIweblab1378949,T3_SF516.0,327.0_PQ65_.jpg?aicid=productui-image-1",
  ],
  [
    "B005ERFK9U",
    "Brüder Mannesmann",
    "Alu-Werkzeugkoffer M29075, 108-teilig",
    "Koffer",
    "Werkstatt",
    "89,56 €",
    "https://m.media-amazon.com/images/I/91a12TvWP+L._AC_AIweblab1378949,T3_SF516.0,327.0_PQ65_.jpg?aicid=productui-image-1",
  ],
  [
    "B07ZCV6FJ5",
    "Hi-Spec",
    "Werkzeugkoffer mit Bit-Set, 42-teilig",
    "Koffer",
    "Wohnung",
    "21,99 €",
    "https://m.media-amazon.com/images/I/81QOdEoAt1L._AC_AIweblab1378949,T3_SF516.0,327.0_PQ65_.jpg?aicid=productui-image-1",
  ],
  [
    "B0CGDXKS9K",
    "kwb",
    "Universal-Werkzeugkoffer, 35-teilig",
    "Koffer",
    "Wohnung",
    "20,55 €",
    "https://m.media-amazon.com/images/I/71K9ZL4gy5L._AC_AIweblab1378949,T3_SF480.0,480.0_PQ65_.jpg?aicid=productui-image-1",
  ],
  [
    "B0DQD6STMP",
    "Hi-Spec",
    "Werkzeugkoffer mit 4V USB-Akkuschrauber",
    "Elektro",
    "Wohnung",
    "29,99 €",
    "https://m.media-amazon.com/images/I/71fKrPlICNL._AC_AIweblab1378949,T3_SF516.0,327.0_PQ65_.jpg?aicid=productui-image-1",
  ],
  [
    "B0G396NBSW",
    "Hi-Spec",
    "Werkzeugset mit 3,6V USB-Akkuschrauber",
    "Elektro",
    "Wohnung",
    "29,91 €",
    "https://m.media-amazon.com/images/I/81u4MF4dmPL._AC_AIweblab1378949,T3_SF480.0,480.0_PQ65_.jpg?aicid=productui-image-1",
  ],
  [
    "B0CRH89MVB",
    "WMC TOOLS",
    "Kleiner Werkzeugkoffer, 11-teilig",
    "Koffer",
    "Wohnung",
    "14,99 €",
    "https://m.media-amazon.com/images/I/71QDglzH27L._AC_AIweblab1378949,T3_SF516.0,327.0_PQ65_.jpg?aicid=productui-image-1",
  ],
  [
    "B0DYVM1YKX",
    "BAMATO",
    "Werkzeugtrolley WORK-193, 193-teilig",
    "Koffer",
    "Werkstatt",
    "173,99 €",
    "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T1/images/I/81We33VcIaL._AC_SR160,134_CB1169409_QL70_.jpg",
  ],
].map((x, i) => ({
  asin: x[0],
  brand: x[1],
  name: x[2],
  cat: x[3],
  use: ["Elektro", "Sanitär", "Garten", "Holz", "Möbelmontage", "Werkstatt"][
    i % 6
  ],
  price: x[5],
  img: x[6],
}));
const topics = [
  [
    "werkzeugkoffer-grundausstattung",
    "Der erste Werkzeugkoffer: Was wirklich hineinmuss",
    "Mit 15 gut gewählten Werkzeugen erledigst du die meisten Arbeiten in der Wohnung. Wir zeigen eine belastbare Grundausstattung.",
    "Wohnung",
  ],
  [
    "werkstatt-einrichten",
    "Die erste Werkstatt sinnvoll einrichten",
    "Von Licht und Strom bis Werkbank und Aufbewahrung: So wächst eine Werkstatt mit deinen Projekten.",
    "Werkstatt",
  ],
  [
    "akkuschrauber-kaufen",
    "Akkuschrauber kaufen: Volt, Drehmoment, Akku",
    "Welche Leistungsdaten zählen – und wann ein kompakter 12-Volt-Schrauber die bessere Wahl ist.",
    "Elektro",
  ],
  [
    "bohrmaschine-oder-bohrhammer",
    "Bohrmaschine oder Bohrhammer?",
    "Beton, Ziegel oder Holz verlangen unterschiedliche Maschinen. Diese Entscheidungshilfe verhindert Fehlkäufe.",
    "Elektro",
  ],
  [
    "zangen-grundausstattung",
    "Diese drei Zangen reichen für den Start",
    "Kombizange, Wasserpumpenzange und Seitenschneider: Aufgaben, Größen und sichere Anwendung.",
    "Handwerk",
  ],
  [
    "schraubendreher-bits",
    "Schraubendreher und Bits richtig auswählen",
    "PH, PZ, Torx oder Schlitz? Profile erkennen, passende Größe wählen und Schrauben schonen.",
    "Handwerk",
  ],
  [
    "werkzeug-fuer-mietwohnung",
    "Werkzeug für die erste Mietwohnung",
    "Eine kompakte Auswahl für Möbel, Bilder, Lampen und kleine Reparaturen – ohne unnötigen Ballast.",
    "Wohnung",
  ],
  [
    "werkzeug-fuer-haus",
    "Werkzeug-Grundausstattung fürs eigene Haus",
    "Mehr Fläche, mehr Aufgaben: Welche Ergänzungen zu Koffer, Leiter und Maschinen langfristig sinnvoll sind.",
    "Haus",
  ],
  [
    "gartenwerkzeug-grundausstattung",
    "Gartenwerkzeug: Die sinnvolle Grundausstattung",
    "Für Beet, Rasen, Hecke und Terrasse: ergonomisch auswählen, pflegen und platzsparend lagern.",
    "Garten",
  ],
  [
    "werkbank-planen",
    "Die richtige Werkbank planen",
    "Arbeitshöhe, Spannmöglichkeiten, Licht und Stauraum bestimmen, bevor du kaufst oder baust.",
    "Werkstatt",
  ],
  [
    "werkzeug-aufbewahren",
    "Werkzeug übersichtlich aufbewahren",
    "Koffer, Wandtafel, Schublade oder Trolley: Welches System zu welchem Arbeitsstil passt.",
    "Werkstatt",
  ],
  [
    "messen-anzeichnen",
    "Messen und Anzeichnen ohne teure Fehler",
    "Bandmaß, Winkel, Wasserwaage und Bleistift korrekt einsetzen – mit praktischer Kontrollroutine.",
    "Handwerk",
  ],
  [
    "saegen-vergleich",
    "Handsäge, Stichsäge oder Kreissäge?",
    "Die richtige Säge für Zuschnitt, Kurve und Abbruch – inklusive Sicherheits-Check.",
    "Elektro",
  ],
  [
    "dübel-wählen",
    "Dübel passend zur Wand wählen",
    "Gipskarton, Ziegel, Beton oder unbekannter Untergrund: Befestigungen systematisch planen.",
    "Wohnung",
  ],
  [
    "sicher-heimwerken",
    "Sicher heimwerken: Schutz, Ordnung, Routine",
    "Augen, Ohren, Atemwege und Hände schützen – mit einfachen Regeln für jede Werkstatt.",
    "Sicherheit",
  ],
  [
    "werkzeug-pflegen",
    "Werkzeug pflegen und Rost vermeiden",
    "Reinigung, trockene Lagerung, Schneidenpflege und Akkupflege verlängern die Nutzungsdauer.",
    "Werkstatt",
  ],
  [
    "drehmomentschluessel",
    "Drehmomentschlüssel richtig benutzen",
    "Bereich, Einheit, Einstellung und Lagerung: So arbeitest du kontrolliert an Fahrrad und Auto.",
    "Handwerk",
  ],
  [
    "leiter-kaufen",
    "Leiter kaufen: Höhe, Stand und Sicherheit",
    "Tritt, Stehleiter oder Anlegeleiter? So wählst du passend zu Raumhöhe und Aufgabe.",
    "Haus",
  ],
  [
    "rasenpflege-werkzeug",
    "Werkzeug für einen gepflegten Rasen",
    "Mäher, Trimmer, Rechen und Kantenwerkzeug passend zu Fläche und Gelände auswählen.",
    "Garten",
  ],
  [
    "werkzeug-qualitaet-erkennen",
    "Gutes Werkzeug erkennen",
    "Material, Verarbeitung, Ergonomie und Ersatzteile: Qualitätsmerkmale ohne Markenblindheit.",
    "Kaufberatung",
  ],
].map((x, i) => ({
  slug: x[0].normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
  title: x[1],
  intro: x[2],
  tag: x[3],
  time: 6 + (i % 5),
}));
let fav = new Set(JSON.parse(localStorage.getItem("wf-favs") || "[]")),
  shown = 8,
  active = "Alle";
let amazonState = {
  loading: false,
  loaded: false,
  checkedAt: null,
  error: null,
};
const $ = (s) => document.querySelector(s),
  esc = (s) =>
    s.replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
function saveFav() {
  localStorage.setItem("wf-favs", JSON.stringify([...fav]));
  document.querySelector("#favTop b").textContent = fav.size;
}
function productUsps(p) {
  let count = (p.name.match(/(\d+)-teilig/) || [])[1];
  return [
    count ? `${count}-teilig` : "Bewährte Markenqualität",
    p.cat,
    `Ideal für ${p.use}`,
  ];
}
function productCard(p) {
  let url = p.url || `https://www.amazon.de/dp/${p.asin}/ref=nosim?tag=${TAG}`;
  let images = [...new Set([p.img, ...(p.images || [])].filter(Boolean))].slice(0, 5);
  return `<article class="product shopCard"><div class="productVisual"><a class="shopPhoto" target="_blank" rel="nofollow sponsored noopener" href="${url}" aria-label="${esc(p.name)} bei Amazon ansehen"><img data-main-image="${p.asin}" src="${images[0]}" alt="${esc(p.name)}" loading="lazy"></a>${images.length > 1 ? `<div class="imageGallery" aria-label="Weitere Produktbilder">${images.map((image, index) => `<button type="button" class="galleryThumb ${index === 0 ? "active" : ""}" data-gallery="${p.asin}" data-image="${image}" aria-label="Produktbild ${index + 1} anzeigen"><img src="${image}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}</div><div class="productBody"><span class="shopCategory">${esc(p.brand)} · ${p.cat}</span><h3><a target="_blank" rel="nofollow sponsored noopener" href="${url}">${esc(p.name)}</a></h3><ul class="productUsps">${productUsps(
    p,
  )
    .map((x) => `<li>${esc(x)}</li>`)
    .join(
      "",
    )}</ul><label class="compareChoice"><input type="checkbox" data-compare="${p.asin}" ${compare.has(p.asin) ? "checked" : ""}> Vergleichen</label><div class="shopPurchase"><span class="priceLabel">Aktueller Amazon-Preis</span><div class="price">${p.price}</div><div class="shopActions"><a class="shopBuy" target="_blank" rel="nofollow sponsored noopener" href="${url}"><span>Preis bei Amazon prüfen*</span><b>→</b></a><button class="heart ${fav.has(p.asin) ? "on" : ""}" data-fav="${p.asin}" aria-label="${esc(p.name)} merken">♥</button></div><small class="purchaseHint">Direkt zum Angebot · für dich ohne Mehrkosten</small></div></div></article>`;
}
function home() {
  document.title = "Werkzeug Finder – Das richtige Werkzeug für dein Projekt";
  return `<section class="hero"><div class="heroCopy"><span class="eyebrow">Klar auswählen. Besser arbeiten.</span><h1>Mach’s richtig. Von Anfang an.</h1><p>Ob erste Mietwohnung, eigenes Haus, Garten oder Werkstatt: Finde genau das Werkzeug, das zu deinem Projekt und deinem Können passt.</p><div class="actions"><a class="button accent" href="#finder">Werkzeug finden</a><a class="button ghost" style="color:white" href="#ratgeber">Erst informieren</a></div><div class="stats"><div class="stat"><b id="productStat">100</b>aktuelle Modelle angestrebt</div><div class="stat"><b>20</b>Ratgeber</div><div class="stat"><b>0</b>erfundene Bewertungen</div></div></div><div class="heroImage"><span class="caption">Eigene KI-Illustration · keine Produktabbildung</span></div></section>
<section class="section" id="finder"><span class="eyebrow">Dein Werkzeug-Finder</span><h2>Was möchtest du anpacken?</h2><div class="finderPanel"><div class="needs">${["Alle", "Wohnung", "Haus", "Garten", "Werkstatt"].map((x) => `<button class="chip ${x === active ? "active" : ""}" data-use="${x}">${x}</button>`).join("")}</div><div class="chips" style="margin-top:12px">${["Alle Produkte", "Koffer", "Elektro"].map((x) => `<button class="chip" data-cat="${x}">${x}</button>`).join("")}</div><div class="toolbar"><input id="search" type="search" placeholder="Werkzeug oder Marke suchen" aria-label="Produkte durchsuchen"><select id="brand"><option value="">Alle Marken</option>${[...new Set(products.map((p) => p.brand))].map((x) => `<option>${x}</option>`).join("")}</select><select id="sort"><option value="rec">Empfehlung</option><option value="low">Preis aufsteigend</option><option value="high">Preis absteigend</option></select></div><div class="notice" id="amazonStatus"><b>Amazon wird verbunden:</b> Aktuelle Produkte, Bilder, Preise und Verfügbarkeit werden sicher über die Amazon Creators API geladen.</div><div id="resultCount" class="meta"></div><div class="productGrid" id="produkte"></div><button class="load" id="loadMore">Weitere Produkte anzeigen</button></div></section>
<section class="section" id="beratung"><span class="eyebrow">Kaufberatung ohne Fachchinesisch</span><h2>Erst verstehen. Dann kaufen.</h2><div class="productGrid"><div class="editorial"><span class="meta">Erste Werkstatt</span><h3>Ein guter Arbeitsplatz spart mehr Nerven als das hundertste Spezialwerkzeug.</h3><a href="/ratgeber/werkstatt-einrichten">Werkstatt planen →</a></div><article class="articleCard"><div class="num">01</div><h3>Wohnung</h3><p>Für Möbel, Bilder und kleine Reparaturen kompakt starten.</p><a href="/ratgeber/werkzeug-fuer-mietwohnung">Zur Checkliste →</a></article><article class="articleCard"><div class="num">02</div><h3>Haus</h3><p>Solide Grundausstattung, die mit den Aufgaben wachsen kann.</p><a href="/ratgeber/werkzeug-fuer-haus">Hausausstattung planen →</a></article><article class="articleCard"><div class="num">03</div><h3>Garten</h3><p>Werkzeug nach Fläche, Pflanzen und Lagerplatz auswählen.</p><a href="/ratgeber/gartenwerkzeug-grundausstattung">Garten-Guide öffnen →</a></article></div></section>
<section class="section" id="ratgeber"><span class="eyebrow">Werkzeug-Wissen</span><h2>20 Ratgeber für bessere Projekte.</h2><div class="articleGrid">${topics.map((a, i) => `<article class="articleCard"><div class="num">${String(i + 1).padStart(2, "0")}</div><span class="meta">${a.tag} · ${a.time} Min.</span><h3>${a.title}</h3><p>${a.intro}</p><a href="/ratgeber/${a.slug}">Ratgeber lesen →</a></article>`).join("")}</div></section>
<section class="section legal" id="transparenz"><span class="eyebrow">Transparenz</span><h2>So empfehlen wir.</h2><p>Werkzeug Finder bewertet keine Produkte aus eigener Praxiserfahrung, wenn kein dokumentierter Test vorliegt. Produkte, Originalbilder, Preise und Verfügbarkeit werden serverseitig über die Amazon Creators API abgerufen. Farbvarianten werden anhand ASIN, Eltern-ASIN und Modellbezeichnung zusammengeführt. Affiliate-Links enthalten ausschließlich die Partner-ID <b>${TAG}</b>.</p></section>`;
}
function article(a) {
  let related = topics.filter((x) => x.slug !== a.slug).slice(0, 2);
  return `<article class="articlePage"><a href="/#ratgeber">← Alle Ratgeber</a><p class="eyebrow">${a.tag} · ${a.time} Minuten Lesezeit</p><h1>${a.title}</h1><p style="font-size:1.25rem">${a.intro}</p><h2>Worum es bei der Auswahl wirklich geht</h2><p>Das passende Werkzeug ist nicht automatisch das größte oder teuerste. Entscheidend sind Material, Häufigkeit der Nutzung, verfügbarer Platz und die Präzision, die dein Projekt verlangt. Für gelegentliche Arbeiten lohnt sich ein kompaktes, solides Set. Wer regelmäßig arbeitet, ergänzt gezielt und achtet auf Ergonomie, Ersatzteile und ein einheitliches Akkusystem.</p><h2>Ein praktisches Beispiel</h2><p>Angenommen, du möchtest ein Regal montieren: Prüfe zuerst die Wand, bestimme Bohrer und Dübel, miss zweimal und markiere sauber. Lege Schutzbrille, Leitungssucher, Wasserwaage, Bohrmaschine, passenden Bit und Staubsauger bereit. Diese Vorbereitung verhindert die häufigsten Schäden – lange bevor Kraft oder Maschinenleistung wichtig werden.</p><h2>So gehst du Schritt für Schritt vor</h2><p><b>1. Aufgabe eingrenzen:</b> Was soll bearbeitet, verbunden oder gemessen werden? <b>2. Untergrund prüfen:</b> Holz, Metall, Mauerwerk und Gipskarton brauchen unterschiedliche Lösungen. <b>3. Werkzeug passend dimensionieren:</b> Arbeitsbereich und Zubehör müssen zusammenpassen. <b>4. Sicher arbeiten:</b> Anleitung lesen, Arbeitsbereich freihalten und Schutz passend zur Gefahr wählen.</p><div class="checklist"><h2>Checkliste</h2><ul><li>Material und Abmessungen geprüft</li><li>Passendes Werkzeug und Zubehör bereitgelegt</li><li>Strom-, Wasser- oder Gasleitungen ausgeschlossen</li><li>Schutzbrille und erforderlicher Gehörschutz vorhanden</li><li>Werkstück sicher fixiert</li><li>Ergebnis vor dem finalen Schritt kontrolliert</li></ul></div><h2>Häufige Fehler vermeiden</h2><p>Viele Probleme entstehen durch falsche Größe, stumpfes Zubehör oder zu viel Kraft. Stoppe, wenn ein Werkzeug verkantet, ungewöhnlich heiß wird oder der Untergrund unerwartet reagiert. Im Zweifel ist eine kurze Materialprobe an einer unauffälligen Stelle sinnvoller als ein riskanter Versuch.</p><h2>Quellen und weiterführende Hinweise</h2><p>Für sicherheitsrelevante Arbeiten gelten die Anleitung des Herstellers, die Hinweise der Deutschen Gesetzlichen Unfallversicherung und bei Elektroinstallationen die Regeln des zuständigen Fachhandwerks. Arbeiten an festen Elektro-, Gas- oder Wasserinstallationen gehören je nach Umfang in Fachhände.</p><div class="related">${related.map((x) => `<a class="articleCard" href="/ratgeber/${x.slug}"><span class="meta">Weiterlesen</span><h3>${x.title}</h3><p>${x.intro}</p></a>`).join("")}</div><div class="notice">Ausgewählte Startsets findest du im <a href="/#produkte"><b>Produktfinder</b></a>. Produktlinks sind Werbelinks zu Amazon.</div></article>`;
}
function legal(kind) {
  if (kind === "Impressum")
    return `<section class="section legal"><span class="eyebrow">Werkzeug Finder · Stand: 12. September 2026</span><h2>Impressum</h2><h3>Anbieter gemäß § 5 DDG</h3><p>marktSTARK®<br>Inhaber: Pascal Weyers<br>Birkenwaldstraße 46<br>63179 Obertshausen<br>Deutschland</p><h3>Postanschrift</h3><p>marktSTARK®<br>Pestalozzistraße 5a<br>63538 Großkrotzenburg<br>Deutschland</p><h3>Kontakt</h3><p>E-Mail: <a href="mailto:weyers@markt-stark.de">weyers@markt-stark.de</a></p><h3>Umsatzsteuer</h3><p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE299749508</p><h3>Redaktionelle Verantwortung</h3><p>Verantwortlich gemäß § 18 Abs. 2 MStV: Pascal Weyers, Birkenwaldstraße 46, 63179 Obertshausen.</p><h3>Verbraucherschlichtung</h3><p>Eine Teilnahme an Verfahren vor einer Verbraucherschlichtungsstelle erfolgt nicht; eine Verpflichtung hierzu besteht nicht.</p><h3>Über dieses Angebot</h3><p>Werkzeug Finder ist ein redaktioneller Produktfinder und kein Onlineshop. Vertragspartner für einen Kauf ist der jeweilige Händler. Als Amazon-Partner verdienen wir an qualifizierten Verkäufen. Preise und Verfügbarkeit können sich ändern; entscheidend ist das Angebot beim Händler zum Kaufzeitpunkt.</p><h3>Inhalte, Links und Bildmaterial</h3><p>Unsere Auswahl und Beratung ersetzen keine fachliche Prüfung des konkreten Projekts. Wir führen keine eigenen Produkttests durch und vergeben keine Testnoten. Fehlerhinweise nehmen wir über die oben genannte Kontaktadresse entgegen.</p><p>Für verlinkte Angebote sind deren Betreiber zuständig. Hinweise auf rechtswidrige Inhalte prüfen wir und entfernen betroffene Verweise erforderlichenfalls. Gesetzliche Pflichten bleiben bestehen.</p><p>Redaktionelle KI-Motive sind gekennzeichnet und zeigen keine authentischen Produkte der genannten Marken. Produktbilder stammen von Amazon-Bildservern. Rechte an Marken und fremden Bildern verbleiben bei den jeweiligen Rechteinhabern. Für unsere eigenen Texte und Gestaltungen gelten die gesetzlichen urheberrechtlichen Regelungen.</p><p><a href="/datenschutz"><b>Zur Datenschutzerklärung →</b></a></p></section>`;
  return `<section class="section legal"><span class="eyebrow">Werkzeug Finder · Stand: 12. September 2026</span><h2>Datenschutzerklärung</h2><h3>1. Verantwortlicher und Kontakt</h3><p>Pascal Weyers, marktSTARK®<br>Birkenwaldstraße 46, 63179 Obertshausen, Deutschland<br>E-Mail: <a href="mailto:weyers@markt-stark.de">weyers@markt-stark.de</a></p><p>Postanschrift: marktSTARK®, Pestalozzistraße 5a, 63538 Großkrotzenburg, Deutschland.</p><h3>2. Bereitstellung und Hosting</h3><p>Werkzeug Finder wird über Vercel Inc., USA, bereitgestellt. Beim Abruf von Seiten, Bildern und Dateien fallen insbesondere IP-Adresse, Abrufzeit, angefragte Adresse, HTTP-Status sowie Browser- und Verbindungsinformationen an. Diese Daten dienen der Auslieferung, Fehlerdiagnose und Abwehr missbräuchlicher Zugriffe. Rechtsgrundlage ist Art. 6 Abs. 1 Buchst. f DSGVO; unser Interesse ist ein funktionsfähiges und sicheres Informationsangebot.</p><p>Technische Protokolle werden nach den Speicher- und Sicherheitsregeln des Hostingdienstes vorgehalten und gelöscht, sobald ihr Betriebs- oder Sicherheitszweck entfällt. Sicherheitsvorfälle und gesetzliche Pflichten können eine längere Aufbewahrung erfordern. Die Anwendung legt keine eigene Besucherdatenbank an.</p><p>Vercel nutzt internationale Infrastruktur; eine Verarbeitung in den USA ist möglich. Angaben zu den Übermittlungsgrundlagen findest du in der <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener">Datenschutzerklärung von Vercel</a>.</p><h3>3. Suche und Filter</h3><p>Suchbegriff, Einsatz-, Kategorie-, Marken- und Sortierfilter werden ausschließlich im Browser verarbeitet. Es gibt kein Benutzerkonto. Suchtexte werden nicht als Profil an Amazon übermittelt.</p><h3>4. Merkliste</h3><p>Die Merkliste speichert Amazon-Produktkennungen unter „wf-favs“ im Local Storage deines Browsers. Sie bleiben bis zum Entfernen der Einträge oder Löschen der Website-Daten erhalten. Eine Synchronisierung mit einem Benutzerkonto findet nicht statt.</p><p>Die Speicherung dient ausschließlich der von dir angeforderten Merkfunktion (§ 25 Abs. 2 Nr. 2 TDDDG). Soweit personenbezogene Daten betroffen sind, erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 Buchst. f DSGVO zur Bereitstellung dieser Funktion. Du kannst die Einträge über die Merkliste oder die Website-Daten in den Browsereinstellungen löschen.</p><h3>5. Amazon-Produktbilder und Partnerlinks</h3><p>Produktfotos werden direkt von Amazon-Bildservern geladen. Dabei erhält Amazon bereits beim Anzeigen eines Bildes deine IP-Adresse und technische Abrufdaten, gegebenenfalls auch die Herkunftswebsite gemäß der Referrer-Einstellung des Browsers. Dies geschieht nicht erst beim Anklicken eines Kaufverweises. Unser berechtigtes Interesse gemäß Art. 6 Abs. 1 Buchst. f DSGVO ist die verständliche Darstellung der tatsächlich angebotenen Produkte.</p><p>Kaufverweise enthalten die Partnerkennung „${TAG}“. Beim Öffnen gelangst du zu Amazon, wo Amazon die weitere Verarbeitung einschließlich etwaiger Cookies nach eigenen Informationen und deinen Einstellungen verantwortet. Werkzeug Finder erhält keine Zahlungs- oder Lieferdaten über diese Website. Der Zweck der Partnerverweise ist die Finanzierung des kostenlosen Finders; Rechtsgrundlage ist Art. 6 Abs. 1 Buchst. f DSGVO. Weitere Informationen findest du in den <a href="https://www.amazon.de/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ" target="_blank" rel="noopener">Datenschutzhinweisen von Amazon</a>.</p><h3>6. Eigene Medien und Analysewerkzeuge</h3><p>Das gekennzeichnete redaktionelle KI-Bild wird über dieselbe Website ausgeliefert. Es sind keine YouTube-Player, Social-Media-Widgets, externen Webfonts oder Analyse- und Marketing-Skripte eingebunden. Die Website verwendet Systemschriften und setzt keine Analyse- oder Werbecookies. Sicherheitsfunktionen des Hostings bleiben hiervon unberührt.</p><h3>7. Kontakt per E-Mail</h3><p>Bei einer Nachricht verarbeiten wir deine E-Mail-Adresse, freiwillige Angaben und den Nachrichteninhalt zur Bearbeitung deines Anliegens. Bei vertragsbezogenen Anfragen gilt Art. 6 Abs. 1 Buchst. b DSGVO, ansonsten unser berechtigtes Interesse an der Beantwortung gemäß Buchst. f. Nach Abschluss und Wegfall weiterer Aufbewahrungszwecke löschen wir die Korrespondenz; gesetzlich aufbewahrungspflichtige Unterlagen bleiben für die vorgeschriebene Frist gespeichert.</p><h3>8. Deine Datenschutzrechte</h3><p>Nach den gesetzlichen Voraussetzungen kannst du Auskunft, Berichtigung, Löschung, Einschränkung und Datenübertragbarkeit verlangen. Gegen Verarbeitungen aufgrund berechtigter Interessen kannst du aus Gründen deiner besonderen Situation Widerspruch einlegen. Eine etwaige Einwilligung kannst du für die Zukunft widerrufen. Kontaktiere uns dazu über die oben genannte E-Mail-Adresse.</p><p>Du kannst dich bei einer Datenschutzaufsichtsbehörde beschweren, insbesondere an deinem Aufenthaltsort, Arbeitsplatz oder am Ort des vermuteten Verstoßes. Für Hessen: Der Hessische Beauftragte für Datenschutz und Informationsfreiheit, Wilhelmstraße 7, 65185 Wiesbaden.</p><p>Die Nutzung des Finders erfordert keine Angabe von Namen oder Kontaktdaten. Ohne technisch notwendige Verbindungsdaten kann die Website nicht ausgeliefert werden. Die Anwendung trifft keine automatisierten Entscheidungen mit rechtlicher oder vergleichbar erheblicher Wirkung.</p><h3>9. Änderungen</h3><p>Diese Erklärung beschreibt den aktuellen Funktionsumfang von Werkzeug Finder. Bei Änderungen an Diensten oder Datenverarbeitungen wird sie aktualisiert.</p><p><a href="/impressum"><b>Zum Impressum →</b></a></p></section>`;
}
function finderExtras() {
  if (!$("#finder")) return;
  $("#finder h2").textContent = "Für wo brauchst du dein Werkzeug?";
  let panel = document.querySelector(".finderPanel"),
    needs = panel.querySelector(".needs");
  needs.innerHTML = `<div class="filterGroup"><b>Thema wählen</b><div class="filterChoices">${["Alle", "Elektro", "Sanitär", "Garten", "Holz", "Möbelmontage", "Werkstatt"].map((x) => `<button class="chip ${x === active ? "active" : ""}" data-use="${x}">${x}</button>`).join("")}</div></div>`;
  let cats = panel.querySelector(".chips");
  const premiumNames = ["Bosch Professional", "Bosch", "Makita", "DeWalt", "Festool", "Metabo", "Milwaukee", "Knipex", "Wera", "Wiha", "Hazet", "GEDORE"];
  const availableBrands = [...new Set(products.map((p) => p.brand))];
  const premiumBrands = [...new Set(premiumNames.map((name) => availableBrands.find((brand) => brand.toLowerCase().includes(name.toLowerCase()))).filter(Boolean))];
  cats.innerHTML = `<div class="filterGroup premiumFilter"><b>Premium-Marken</b><span class="filterHelp">Schnell zu bewährten Herstellern</span><div class="filterChoices"><button class="chip active" data-brand-chip="">Alle Marken</button>${premiumBrands.map((brand) => `<button class="chip premiumChip" data-brand-chip="${esc(brand)}">${esc(brand)}</button>`).join("")}</div></div>`;
  let bar = document.createElement("div");
  bar.className = "filterUtility";
  bar.innerHTML =
    '<button class="filterToggle" aria-expanded="true">Filter & Sortierung</button><button class="clearFilters">Alle Filter löschen</button>';
  panel.insertBefore(bar, needs);
  bar.querySelector(".filterToggle").onclick = (e) => {
    let open = e.currentTarget.getAttribute("aria-expanded") === "true";
    e.currentTarget.setAttribute("aria-expanded", !open);
    document
      .querySelectorAll(".needs,.chips,.toolbar")
      .forEach((x) => (x.hidden = open));
  };
  bar.querySelector(".clearFilters").onclick = () => {
    active = "Alle";
    shown = 8;
    document.querySelector('[data-use="Alle"]')?.click();
    $("#search").value = "";
    $("#brand").value = "";
    $("#sort").value = "rec";
    $("#search").dispatchEvent(new Event("input"));
  };
  setTimeout(
    () =>
      document.querySelectorAll("[data-brand-chip]").forEach(
        (b) =>
          (b.onclick = () => {
            $("#brand").value = b.dataset.brandChip;
            document
              .querySelectorAll("[data-brand-chip]")
              .forEach((x) => x.classList.toggle("active", x === b));
            $("#brand").dispatchEvent(new Event("change"));
          }),
      ),
    0,
  );
  compareBar();
}
function compareBar() {
  document.querySelector(".compareDock")?.remove();
  if (!compare.size) return;
  let list = [...compare]
      .map((id) => products.find((p) => p.asin === id))
      .filter(Boolean),
    d = document.createElement("aside");
  d.className = "compareDock";
  d.innerHTML = `<div><b>${list.length} Produkt${list.length > 1 ? "e" : ""} ausgewählt</b><span>${list.map((p) => p.name).join(" · ")}</span></div><button class="compareOpen" ${list.length < 2 ? "disabled" : ""}>Jetzt vergleichen</button><button class="compareClear" aria-label="Vergleich leeren">×</button>`;
  document.body.append(d);
  d.querySelector(".compareClear").onclick = () => {
    compare.clear();
    sessionStorage.removeItem("wf-compare");
    document
      .querySelectorAll("[data-compare]")
      .forEach((x) => (x.checked = false));
    compareBar();
  };
  d.querySelector(".compareOpen").onclick = () =>
    alert(
      list
        .map((p) => `${p.name}\n${p.brand} · ${p.cat} · ${p.use} · ${p.price}`)
        .join("\n\n"),
    );
}
function bindCompare() {
  document.onchange = (e) => {
    let x = e.target.closest?.("[data-compare]");
    if (!x) return;
    if (x.checked && compare.size >= 3) {
      x.checked = false;
      alert("Du kannst bis zu drei Produkte gleichzeitig vergleichen.");
      return;
    }
    x.checked
      ? compare.add(x.dataset.compare)
      : compare.delete(x.dataset.compare);
    sessionStorage.setItem("wf-compare", JSON.stringify([...compare]));
    compareBar();
  };
}
function modelKey(p) {
  return (
    p.parentAsin ||
    `${p.brand}|${p.name
      .toLowerCase()
      .replace(/\b(schwarz|blau|rot|grün|gelb|grau|silber|weiß|orange)\b/g, "")
      .replace(/\s+/g, " ")}`
  );
}
async function loadAmazonProducts() {
  if (amazonState.loading || amazonState.loaded) return;
  amazonState.loading = true;
  let found = [],
    seen = new Set();
  try {
    for (let cursor = 0; cursor < 24 && found.length < 100; cursor++) {
      let response = await fetch(`/api/products?cursor=${cursor}`, {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      let data = await response.json();
      for (let item of data.products || []) {
        let p = {
          asin: item.asin,
          parentAsin: item.parentAsin,
          brand: item.brand || "Amazon",
          name: item.title,
          cat: item.category,
          use: item.use,
          price: item.price,
          img: item.image,
          images: item.images || [item.image],
          url: item.url,
          features: item.features || [],
        };
        let key = modelKey(p);
        if (p.asin && p.img && p.price && item.available && !seen.has(key)) {
          seen.add(key);
          found.push(p);
        }
      }
      amazonState.checkedAt = data.checkedAt || amazonState.checkedAt;
      let status = $("#amazonStatus");
      if (status)
        status.innerHTML = `<b>Amazon wird geladen:</b> ${Math.min(found.length, 100)} von 100 unterschiedlichen, verfügbaren Werkzeugmodellen geprüft.`;
      if (cursor + 1 >= Number(data.totalCursors || 0)) break;
    }
    if (!found.length) throw new Error("Keine verfügbaren Angebote");
    products = found.slice(0, 100);
    amazonState.loaded = true;
    amazonState.loading = false;
    render();
    updateAmazonStatus();
  } catch (error) {
    amazonState.loading = false;
    amazonState.error = error;
    let status = $("#amazonStatus");
    if (status)
      status.innerHTML =
        "<b>Hinweis:</b> Amazon war vorübergehend nicht erreichbar. Deshalb wird die geprüfte Basisauswahl angezeigt; die Live-Daten werden beim nächsten Aufruf erneut geladen.";
  }
}
function updateAmazonStatus() {
  let status = $("#amazonStatus");
  if (!status) return;
  if (amazonState.loaded) {
    let stamp = amazonState.checkedAt
      ? new Date(amazonState.checkedAt).toLocaleString("de-DE", {
          dateStyle: "short",
          timeStyle: "short",
        })
      : "soeben";
    status.innerHTML = `<b>Live von Amazon:</b> ${products.length} verfügbare Modelle mit Originalbildern und aktuellen Preisen · zuletzt geprüft ${stamp}.`;
    let stat = $("#productStat");
    if (stat) stat.textContent = products.length;
  } else if (amazonState.loading) {
    status.innerHTML =
      "<b>Amazon wird verbunden:</b> Aktuelle Produkte, Bilder, Preise und Verfügbarkeit werden geladen.";
  }
}
function render() {
  let path = decodeURI(location.pathname);
  let a = path.startsWith("/ratgeber/")
    ? topics.find((x) => "/ratgeber/" + x.slug === path)
    : null;
  $("#main").innerHTML = a
    ? article(a)
    : path === "/impressum"
      ? legal("Impressum")
      : path === "/datenschutz"
        ? legal("Datenschutz")
        : home();
  finderExtras();
  bind();
  bindCompare();
  saveFav();
  scrollTo(0, 0);
}
function bind() {
  if (!$("#produkte")) return;
  let cat = "Alle Produkte";
  function update() {
    let q = ($("#search").value || "").toLowerCase(),
      brand = $("#brand").value;
    let arr = products.filter(
      (p) =>
        (active === "Alle" || p.use === active) &&
        (cat === "Alle Produkte" || p.cat === cat) &&
        (!brand || p.brand === brand) &&
        (p.name + " " + p.brand).toLowerCase().includes(q),
    );
    let sort = $("#sort").value;
    if (sort !== "rec")
      arr.sort(
        (a, b) =>
          (parseFloat(a.price.replace(",", ".")) -
            parseFloat(b.price.replace(",", "."))) *
          (sort === "low" ? 1 : -1),
      );
    $("#resultCount").textContent = `${arr.length} geprüfte Modelle`;
    $("#produkte").innerHTML =
      arr.slice(0, shown).map(productCard).join("") +
      (arr.length === 0 ? "<p>Keine passenden Produkte gefunden.</p>" : "");
    $("#loadMore").hidden = shown >= arr.length;
    document.querySelectorAll("[data-fav]").forEach(
      (b) =>
        (b.onclick = () => {
          fav.has(b.dataset.fav)
            ? fav.delete(b.dataset.fav)
            : fav.add(b.dataset.fav);
          saveFav();
          update();
        }),
    );
    document.querySelectorAll("[data-gallery]").forEach((button) => {
      button.onclick = () => {
        const main = document.querySelector(`[data-main-image="${button.dataset.gallery}"]`);
        if (main) main.src = button.dataset.image;
        button.parentElement
          .querySelectorAll(".galleryThumb")
          .forEach((thumb) => thumb.classList.toggle("active", thumb === button));
      };
    });
  }
  document.querySelectorAll("[data-use]").forEach(
    (b) =>
      (b.onclick = () => {
        active = b.dataset.use;
        document
          .querySelectorAll("[data-use]")
          .forEach((x) =>
            x.classList.toggle("active", x.dataset.use === active),
          );
        update();
      }),
  );
  document.querySelectorAll("[data-cat]").forEach(
    (b) =>
      (b.onclick = () => {
        cat = b.dataset.cat;
        document
          .querySelectorAll("[data-cat]")
          .forEach((x) => x.classList.toggle("active", x.dataset.cat === cat));
        update();
      }),
  );
  ["search", "brand", "sort"].forEach((id) =>
    $("#" + id).addEventListener(id === "search" ? "input" : "change", update),
  );
  $("#loadMore").onclick = () => {
    shown = 99;
    update();
  };
  update();
}
$("#menu").onclick = () => {
  let n = document.querySelector("nav"),
    open = n.style.display !== "flex";
  n.style.cssText = open
    ? "display:flex;position:absolute;top:76px;left:0;right:0;background:#f5f3ed;padding:22px;flex-direction:column;border-bottom:1px solid #ddd9cf"
    : " ";
  $("#menu").setAttribute("aria-expanded", open);
};
document.addEventListener("click", (e) => {
  let a = e.target.closest("a");
  if (a && a.origin === location.origin) {
    e.preventDefault();
    history.pushState({}, "", a.pathname + a.hash);
    document.querySelector("nav").style.cssText = "";
    render();
    updateAmazonStatus();
    if (a.hash)
      setTimeout(() => document.querySelector(a.hash)?.scrollIntoView(), 0);
  }
});
addEventListener("popstate", () => {
  render();
  updateAmazonStatus();
});
render();
updateAmazonStatus();
loadAmazonProducts();
