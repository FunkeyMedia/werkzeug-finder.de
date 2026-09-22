/** Server-only transport for the shared, authenticated Amazon catalogue gateway. */
export function gatewayToken() {
  return process.env.AMAZON_CATALOG_GATEWAY_URL && process.env.AMAZON_CATALOG_GATEWAY_SECRET
    ? process.env.AMAZON_CATALOG_GATEWAY_SECRET : null;
}
export function createAmazonFetch(fetchImpl = globalThis.fetch, env = process.env) {
  return async function amazonFetch(input, init) {
    const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input.href : input.url);
    const operation = url.pathname.match(/^\/catalog\/v1\/(getItems|searchItems|getVariations)$/)?.[1];
    if (url.hostname !== 'creatorsapi.amazon' || !operation || !env.AMAZON_CATALOG_GATEWAY_URL || !env.AMAZON_CATALOG_GATEWAY_SECRET) return fetchImpl(input, init);
    return fetchImpl(env.AMAZON_CATALOG_GATEWAY_URL, {
      ...init, method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.AMAZON_CATALOG_GATEWAY_SECRET}` },
      body: JSON.stringify({ operation, request: JSON.parse(String(init?.body || '{}')) }),
    });
  };
}
export const amazonFetch = createAmazonFetch();
