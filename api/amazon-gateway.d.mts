export function gatewayToken(): string | null;
export function createAmazonFetch(fetchImpl?: typeof fetch, env?: Record<string, string | undefined>): typeof fetch;
export const amazonFetch: typeof fetch;
