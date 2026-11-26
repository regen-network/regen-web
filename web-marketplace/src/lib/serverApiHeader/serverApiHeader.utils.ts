// Header added to the requests this site's server (Next.js on Netlify) sends
// to our API. Cloudflare lets requests carrying the right value past its bot
// detection: server-side rendering looks automated, like any script.
// The value is a secret, so it is only ever added on the server, and only to
// requests going to the API's own origin.
// eslint-disable-next-line lingui/no-unlocalized-strings
export const SERVER_REQUEST_HEADER = 'x-regen-ssr';

type FetchArgs = Parameters<typeof fetch>;

const requestUrl = (input: FetchArgs[0]): string =>
  typeof input === 'string'
    ? input
    : input instanceof URL
    ? input.href
    : input.url;

const originOf = (url: string): string | undefined => {
  try {
    return new URL(url).origin;
  } catch (e) {
    return undefined;
  }
};

/**
 * Returns a fetch that adds the secret header to requests whose origin is
 * exactly the API's origin (same scheme, host and port), and leaves every
 * other request untouched. Other origins include the metadata resolvers
 * registered on chain, which anyone can set: the secret must never go there.
 */
export function withServerRequestHeader(
  fetchImpl: typeof fetch,
  { apiUri, secret }: { apiUri: string; secret?: string },
): typeof fetch {
  const apiOrigin = originOf(apiUri);
  if (!secret || !apiOrigin) return fetchImpl;

  return function fetchWithServerRequestHeader(input, init) {
    if (originOf(requestUrl(input)) !== apiOrigin) {
      return fetchImpl(input, init);
    }
    const headers = new Headers(
      init?.headers ?? (input instanceof Request ? input.headers : undefined),
    );
    headers.set(SERVER_REQUEST_HEADER, secret);
    return fetchImpl(input, { ...init, headers });
  } as typeof fetch;
}
