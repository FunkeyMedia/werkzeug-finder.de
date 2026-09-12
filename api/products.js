let accessToken;
let tokenExpires = 0;
const cache = new Map();

const searches = [
  ["Werkzeugkoffer komplett hochwertig", "Werkzeugkoffer", "Werkstatt"],
  ["Werkzeugkoffer Haushalt", "Werkzeugkoffer", "Möbelmontage"],
  ["Steckschlüsselsatz Ratschenkasten", "Handwerkzeug", "Werkstatt"],
  ["Schraubendreher Set", "Handwerkzeug", "Möbelmontage"],
  ["Zangen Set", "Handwerkzeug", "Elektro"],
  ["Maulschlüssel Ringschlüssel Satz", "Handwerkzeug", "Werkstatt"],
  ["Hammer Heimwerker", "Handwerkzeug", "Möbelmontage"],
  ["Wasserwaage Heimwerker", "Messen", "Möbelmontage"],
  ["Laser Entfernungsmesser", "Messen", "Möbelmontage"],
  ["Leitungssucher Wand", "Messen", "Elektro"],
  ["Akkuschrauber 18V Set", "Elektrowerkzeug", "Möbelmontage"],
  ["Akku Bohrschrauber 12V", "Elektrowerkzeug", "Möbelmontage"],
  ["Schlagbohrmaschine", "Elektrowerkzeug", "Elektro"],
  ["Bohrhammer SDS Plus", "Elektrowerkzeug", "Elektro"],
  ["Stichsäge elektrisch", "Sägen", "Holz"],
  ["Handkreissäge", "Sägen", "Holz"],
  ["Kappsäge Gehrungssäge", "Sägen", "Holz"],
  ["Multitool oszillierend", "Elektrowerkzeug", "Sanitär"],
  ["Exzenterschleifer", "Elektrowerkzeug", "Holz"],
  ["Winkelschleifer", "Elektrowerkzeug", "Werkstatt"],
  ["Heißluftpistole", "Elektrowerkzeug", "Sanitär"],
  ["Bohrer Set Holz Metall Stein", "Zubehör", "Elektro"],
  ["Bit Set hochwertig", "Zubehör", "Möbelmontage"],
  ["Dübel Sortiment Schrauben", "Zubehör", "Möbelmontage"],
  ["Rohrzange Wasserpumpenzange", "Sanitärwerkzeug", "Sanitär"],
  ["Rohrschneider Kupfer Kunststoff", "Sanitärwerkzeug", "Sanitär"],
  ["Kartuschenpresse Silikon", "Sanitärwerkzeug", "Sanitär"],
  ["Spaten Garten ergonomisch", "Gartenwerkzeug", "Garten"],
  ["Gartenschere hochwertig", "Gartenwerkzeug", "Garten"],
  ["Astschere Teleskop", "Gartenwerkzeug", "Garten"],
  ["Akku Heckenschere", "Gartengerät", "Garten"],
  ["Akku Rasentrimmer", "Gartengerät", "Garten"],
  ["Werkbank stabil", "Werkstattausstattung", "Werkstatt"],
  ["Schraubstock Werkbank", "Werkstattausstattung", "Werkstatt"],
  ["Werkzeugwand Lochwand", "Aufbewahrung", "Werkstatt"],
  ["Werkzeugwagen bestückt", "Aufbewahrung", "Werkstatt"]
].map(([keywords, category, use]) => ({ keywords, category, use }));

const PAGES_PER_SEARCH = 3;
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
  const partnerTag = "Onlinestarkei-21";
  return {
    asin: item.asin,
    parentAsin: item.parentASIN || null,
    title,
    brand: item.itemInfo?.byLineInfo?.brand?.displayValue || item.itemInfo?.byLineInfo?.manufacturer?.displayValue || "Amazon",
    category: search.category,
    use: search.use,
    features,
    image: trustedImage(item.images?.primary?.large?.url || ""),
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
      resources: ["images.primary.large", "itemInfo.title", "itemInfo.byLineInfo", "itemInfo.features", "offersV2.listings.price", "offersV2.listings.availability", "parentASIN"]
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
  const products = [];
  let lastError;
  const first = cursor * SEARCHES_PER_BATCH;
  const total = searches.length * PAGES_PER_SEARCH;
  for (let i = 0; i < SEARCHES_PER_BATCH; i++) {
    const searchPageIndex = first + i;
    if (searchPageIndex >= total) break;
    const searchIndex = searchPageIndex % searches.length;
    const itemPage = Math.floor(searchPageIndex / searches.length) + 1;
    try { products.push(...await searchPage(searchIndex, itemPage)); }
    catch (error) { lastError = error; if (String(error?.message || error).includes("_401")) throw error; }
    if (i < SEARCHES_PER_BATCH - 1) await new Promise(resolve => setTimeout(resolve, 1100));
  }
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
    return res.status(200).json({ products, cursor, totalCursors, target: 100, checkedAt: new Date().toISOString() });
  } catch (error) {
    res.setHeader("Cache-Control", "no-store");
    return res.status(503).json({ error: String(error.message || "amazon_unavailable"), products: [] });
  }
}
