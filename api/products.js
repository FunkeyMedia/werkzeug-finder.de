let accessToken;
let tokenExpires = 0;
const cache = new Map();

const coreSearches = [
  ["Akkuschrauber", "Akkuschrauber", "Möbelmontage"], ["Akku Bohrschrauber", "Bohrmaschinen", "Elektro"],
  ["Akku Schlagbohrschrauber", "Bohrmaschinen", "Elektro"], ["Schlagbohrmaschine", "Bohrmaschinen", "Elektro"],
  ["Bohrhammer SDS Plus", "Bohrmaschinen", "Elektro"], ["Abbruchhammer", "Bohrmaschinen", "Werkstatt"],
  ["Akku Schlagschrauber", "Akkuschrauber", "Werkstatt"], ["Trockenbauschrauber", "Akkuschrauber", "Werkstatt"],
  ["Stichsäge", "Sägen", "Holz"], ["Handkreissäge", "Sägen", "Holz"], ["Tauchsäge", "Sägen", "Holz"],
  ["Kappsäge Gehrungssäge", "Stationärgeräte", "Holz"], ["Tischkreissäge", "Stationärgeräte", "Holz"],
  ["Säbelsäge", "Sägen", "Werkstatt"], ["Bandsäge", "Stationärgeräte", "Holz"], ["Dekupiersäge", "Stationärgeräte", "Holz"],
  ["Exzenterschleifer", "Schleifmaschinen", "Holz"], ["Schwingschleifer", "Schleifmaschinen", "Holz"],
  ["Bandschleifer", "Schleifmaschinen", "Holz"], ["Deltaschleifer", "Schleifmaschinen", "Holz"],
  ["Winkelschleifer", "Trennen & Schleifen", "Werkstatt"], ["Mini Winkelschleifer", "Trennen & Schleifen", "Werkstatt"],
  ["Oberfräse", "Holzbearbeitung", "Holz"], ["Kantenfräse", "Holzbearbeitung", "Holz"], ["Elektrohobel", "Holzbearbeitung", "Holz"],
  ["Multifunktionswerkzeug oszillierend", "Multifunktionsgeräte", "Sanitär"], ["Rotationswerkzeug", "Multifunktionsgeräte", "Werkstatt"],
  ["Heißluftgebläse", "Elektrowerkzeug", "Sanitär"], ["Farbsprühsystem", "Renovieren", "Werkstatt"],
  ["Elektrotacker", "Elektrowerkzeug", "Möbelmontage"], ["Heißklebepistole", "Elektrowerkzeug", "Möbelmontage"],
  ["Akku Kompressor Luftpumpe", "Elektrowerkzeug", "Werkstatt"], ["Nass Trockensauger Werkstatt", "Reinigung", "Werkstatt"],
  ["Baustellenradio", "Werkstattausstattung", "Werkstatt"], ["Akku Arbeitsleuchte", "Werkstattausstattung", "Werkstatt"],
  ["Kreuzlinienlaser", "Messtechnik", "Möbelmontage"], ["Laser Entfernungsmesser", "Messtechnik", "Möbelmontage"],
  ["Ortungsgerät Leitungssucher", "Messtechnik", "Elektro"], ["Wärmebildkamera Handwerk", "Messtechnik", "Sanitär"],
  ["Werkzeugkoffer komplett", "Werkzeugkoffer", "Werkstatt"], ["Steckschlüsselsatz", "Handwerkzeug", "Werkstatt"],
  ["Schraubendreher Set", "Handwerkzeug", "Möbelmontage"], ["Zangen Set", "Handwerkzeug", "Elektro"],
  ["Drehmomentschlüssel", "Handwerkzeug", "Werkstatt"], ["Wasserwaage", "Messtechnik", "Möbelmontage"],
  ["Werkbank", "Werkstattausstattung", "Werkstatt"], ["Werkzeugwagen", "Aufbewahrung", "Werkstatt"],
  ["Rasenmäher Akku", "Rasenpflege", "Garten"], ["Rasenmäher Elektro", "Rasenpflege", "Garten"],
  ["Mähroboter", "Rasenpflege", "Garten"], ["Akku Rasentrimmer", "Rasenpflege", "Garten"],
  ["Akku Heckenschere", "Heckenpflege", "Garten"], ["Teleskop Heckenschere", "Heckenpflege", "Garten"],
  ["Akku Kettensäge", "Baumpflege", "Garten"], ["Akku Astsäge", "Baumpflege", "Garten"],
  ["Gartenhäcksler", "Gartengeräte", "Garten"], ["Laubbläser Laubsauger", "Gartengeräte", "Garten"],
  ["Akku Grasschere Strauchschere", "Gartengeräte", "Garten"], ["Gartenschere", "Gartenhandwerkzeug", "Garten"],
  ["Hochdruckreiniger", "Reinigung", "Garten"], ["Akku Regenwasserpumpe", "Pumpen", "Garten"],
  ["Gartenpumpe", "Pumpen", "Garten"], ["Tauchpumpe Schmutzwasser", "Pumpen", "Sanitär"],
  ["Rohrzange Wasserpumpenzange", "Sanitärwerkzeug", "Sanitär"], ["Rohrschneider", "Sanitärwerkzeug", "Sanitär"],
  ["Presszange Sanitär", "Sanitärwerkzeug", "Sanitär"], ["Kartuschenpresse", "Sanitärwerkzeug", "Sanitär"],
  ["Bohrer Set Holz Metall Stein", "Zubehör", "Elektro"], ["Bit Set", "Zubehör", "Möbelmontage"],
  ["Sägeblatt Set", "Zubehör", "Holz"], ["Schleifpapier Set", "Zubehör", "Holz"],
  ["Werkzeug Akku Ladegerät", "Akkus & Ladegeräte", "Werkstatt"], ["Werkzeug Aufbewahrung Systemkoffer", "Aufbewahrung", "Werkstatt"]
];
const brands = ["Bosch", "Makita", "DeWalt", "Einhell", "Metabo", "Milwaukee", "Ryobi", "Black Decker"];
const useGroups = Object.values(coreSearches.reduce((groups, item) => {
  (groups[item[2]] ||= []).push(item);
  return groups;
}, {}));
const orderedSearches = Array.from({ length: Math.max(...useGroups.map(group => group.length)) }, (_, index) =>
  useGroups.map(group => group[index]).filter(Boolean)
).flat();
const searches = [0, 1, 2].flatMap(round => orderedSearches.map(([keywords, category, use], index) => ({
  keywords: round === 0 ? keywords : `${brands[(index + round * 3) % brands.length]} ${keywords}`,
  category,
  use
})));

const PAGES_PER_SEARCH = 1;
const SEARCHES_PER_BATCH = 5;

function trustedImage(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      (url.hostname === "m.media-amazon.com" || url.hostname.endsWith(".ssl-images-amazon.com"))
      ? url.href : null;
  } catch { return null; }
}

async function getToken() {
  if (accessToken && tokenExpires > Date.now()) return accessToken;
  const response = await fetch("https://api.amazon.co.uk/auth/o2/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: process.env.AMAZON_CREDENTIAL_ID,
      client_secret: process.env.AMAZON_CREDENTIAL_SECRET,
      scope: "creatorsapi::default"
    }),
    signal: AbortSignal.timeout(12000)
  });
  if (!response.ok) throw new Error(`amazon_auth_${response.status}`);
  const data = await response.json();
  accessToken = data.access_token;
  tokenExpires = Date.now() + Math.max(60, Number(data.expires_in || 3600) - 120) * 1000;
  return accessToken;
}

function normalize(item, search) {
  const title = item.itemInfo?.title?.displayValue || "";
  const blocked = /(ersatzteil|abdeckung|aufkleber|buch|spielzeug|miniatur|kostüm|poster|akku adapter)/i;
  if (!item.asin || !title || blocked.test(title)) return null;
  const listing = (item.offersV2?.listings || []).find(entry => entry.isBuyBoxWinner) || item.offersV2?.listings?.[0];
  const money = listing?.price?.money;
  const features = (item.itemInfo?.features?.displayValues || []).filter(v => typeof v === "string").slice(0, 3);
  const images = [item.images?.primary?.large?.url, ...(item.images?.variants || []).map(image => image.large?.url)]
    .map(trustedImage).filter(Boolean);
  const partnerTag = "Onlinestarkei-21";
  return {
    asin: item.asin,
    parentAsin: item.parentASIN || null,
    title,
    brand: item.itemInfo?.byLineInfo?.brand?.displayValue || item.itemInfo?.byLineInfo?.manufacturer?.displayValue || "Amazon",
    category: search.category,
    use: search.use,
    features,
    image: images[0] || null,
    images: [...new Set(images)].slice(0, 5),
    price: money?.currency === "EUR" ? (money.displayAmount || `${money.amount} €`) : null,
    available: Boolean(listing) && !/unavailable|nicht verfügbar/i.test(listing?.availability?.message || ""),
    availability: listing?.availability?.message || null,
    url: `https://www.amazon.de/dp/${item.asin}?tag=${encodeURIComponent(partnerTag)}`,
    checkedAt: new Date().toISOString()
  };
}

async function searchPage(searchIndex, itemPage) {
  const cacheKey = `${searchIndex}:${itemPage}`;
  const cached = cache.get(cacheKey);
  if (cached && cached.expires > Date.now()) return cached.value;
  const search = searches[searchIndex];
  const response = await fetch("https://creatorsapi.amazon/catalog/v1/searchItems", {
    method: "POST",
    headers: { Authorization: `Bearer ${await getToken()}`, "Content-Type": "application/json", "x-marketplace": "www.amazon.de" },
    body: JSON.stringify({
      keywords: search.keywords, itemCount: 10, itemPage,
      marketplace: "www.amazon.de", partnerTag: (process.env.AMAZON_PARTNER_TAG || "Onlinestarkei-21").toLowerCase(), condition: "New",
      resources: ["images.primary.large", "images.variants.large", "itemInfo.title", "itemInfo.byLineInfo", "itemInfo.features", "offersV2.listings.price", "offersV2.listings.availability", "parentASIN"]
    }),
    signal: AbortSignal.timeout(15000)
  });
  if (!response.ok) throw new Error(`amazon_search_${response.status}`);
  const data = await response.json();
  const value = (data.searchResult?.items || []).map(item => normalize(item, search)).filter(Boolean);
  cache.set(cacheKey, { value, expires: Date.now() + 30 * 60 * 1000 });
  return value;
}

async function searchBatch(cursor) {
  const batches = [];
  let lastError;
  const first = cursor * SEARCHES_PER_BATCH;
  const total = searches.length * PAGES_PER_SEARCH;
  for (let i = 0; i < SEARCHES_PER_BATCH; i++) {
    const searchPageIndex = first + i;
    if (searchPageIndex >= total) break;
    const searchIndex = searchPageIndex % searches.length;
    const itemPage = Math.floor(searchPageIndex / searches.length) + 1;
    try { batches.push(await searchPage(searchIndex, itemPage)); }
    catch (error) { lastError = error; if (String(error?.message || error).includes("_401")) throw error; }
    if (i < SEARCHES_PER_BATCH - 1) await new Promise(resolve => setTimeout(resolve, 1100));
  }
  const products = Array.from({ length: Math.max(0, ...batches.map(batch => batch.length)) }, (_, index) =>
    batches.map(batch => batch[index]).filter(Boolean)
  ).flat();
  if (!products.length && lastError) throw lastError;
  return products;
}

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "method_not_allowed" });
  if (!process.env.AMAZON_CREDENTIAL_ID || !process.env.AMAZON_CREDENTIAL_SECRET) return res.status(503).json({ error: "credentials_missing", products: [] });
  const totalCursors = Math.ceil((searches.length * PAGES_PER_SEARCH) / SEARCHES_PER_BATCH);
  const cursor = Math.max(0, Math.min(totalCursors - 1, Number(req.query.cursor) || 0));
  try {
    const products = await searchBatch(cursor);
    res.setHeader("Cache-Control", "public, max-age=0, s-maxage=1800, stale-while-revalidate=3600");
    return res.status(200).json({ products, cursor, totalCursors, target: 1000, checkedAt: new Date().toISOString() });
  } catch (error) {
    res.setHeader("Cache-Control", "no-store");
    return res.status(503).json({ error: String(error.message || "amazon_unavailable"), products: [] });
  }
}
