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

const REDIRECT_STATUSES = [301, 302, 303, 307, 308];
export const MAX_REDIRECTS = 5;

/**
 * Returns a fetch that adds the secret header to requests whose origin is
 * exactly the API's origin (same scheme, host and port), and leaves every
 * other request untouched. Other origins include the metadata resolvers
 * registered on chain, which anyone can set: the secret must never go there.
 *
 * Redirects: fetch would forward the header to wherever a redirect points,
 * including another origin. So requests carrying the header don't let fetch
 * follow redirects: same-origin redirects of GET/HEAD requests are followed
 * here, with the header; any other redirect is returned to the caller as is.
 */
export function withServerRequestHeader(
  fetchImpl: typeof fetch,
  { apiUri, secret }: { apiUri: string; secret?: string },
): typeof fetch {
  const apiOrigin = originOf(apiUri);
  if (!secret || !apiOrigin) return fetchImpl;

  return async function fetchWithServerRequestHeader(input, init) {
    let url = requestUrl(input);
    if (originOf(url) !== apiOrigin) {
      return fetchImpl(input, init);
    }
    const headers = new Headers(
      init?.headers ?? (input instanceof Request ? input.headers : undefined),
    );
    headers.set(SERVER_REQUEST_HEADER, secret);

    const redirect =
      init?.redirect ?? (input instanceof Request ? input.redirect : 'follow');
    if (redirect !== 'follow') {
      // 'manual' or 'error': fetch doesn't follow redirects either way
      return fetchImpl(input, { ...init, headers, redirect });
    }

    const method = (
      init?.method ?? (input instanceof Request ? input.method : 'GET')
    ).toUpperCase();
    let response = await fetchImpl(input, {
      ...init,
      headers,
      redirect: 'manual',
    });
    for (let hop = 0; hop < MAX_REDIRECTS; hop++) {
      const location = REDIRECT_STATUSES.includes(response.status)
        ? response.headers.get('location')
        : null;
      if (!location) break;
      const next = new URL(location, url);
      if (
        next.origin !== apiOrigin ||
        (method !== 'GET' && method !== 'HEAD')
      ) {
        break;
      }
      url = next.href;
      response = await fetchImpl(url, {
        method,
        headers,
        redirect: 'manual',
        signal: init?.signal,
      });
    }
    return response;
  } as typeof fetch;
}
