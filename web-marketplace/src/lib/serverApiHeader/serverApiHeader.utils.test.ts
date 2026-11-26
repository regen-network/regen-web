import { describe, expect, it, vi } from 'vitest';

import {
  MAX_REDIRECTS,
  SERVER_REQUEST_HEADER,
  withServerRequestHeader,
} from './serverApiHeader.utils';

const API = 'https://api.example.com';
const SECRET = 'test-secret';

const setup = (secret: string | undefined = SECRET, apiUri = API) => {
  const inner = vi.fn(async () => new Response('ok'));
  const wrapped = withServerRequestHeader(inner as unknown as typeof fetch, {
    apiUri,
    secret,
  });
  const sentHeaders = () => {
    const [input, init] = inner.mock.calls[0] as unknown as Parameters<
      typeof fetch
    >;
    return new Headers(
      init?.headers ?? (input instanceof Request ? input.headers : undefined),
    );
  };
  return { inner, wrapped, sentHeaders };
};

describe('withServerRequestHeader', () => {
  it('adds the header to requests to the API (string URL)', async () => {
    const { wrapped, sentHeaders } = setup();
    await wrapped(`${API}/marketplace/v1/graphql`, { method: 'POST' });
    expect(sentHeaders().get(SERVER_REQUEST_HEADER)).toBe(SECRET);
  });

  it('adds the header to requests to the API (URL and Request objects)', async () => {
    const first = setup();
    await first.wrapped(new URL(`${API}/ledger`));
    expect(first.sentHeaders().get(SERVER_REQUEST_HEADER)).toBe(SECRET);

    const second = setup();
    await second.wrapped(
      new Request(`${API}/data/v2/metadata-graph/regen:x`, {
        headers: { accept: 'application/json' },
      }),
    );
    expect(second.sentHeaders().get(SERVER_REQUEST_HEADER)).toBe(SECRET);
    expect(second.sentHeaders().get('accept')).toBe('application/json');
  });

  it('keeps the headers the caller set', async () => {
    const { wrapped, sentHeaders } = setup();
    await wrapped(`${API}/marketplace/v1/graphql`, {
      headers: { 'X-CSRF-TOKEN': 'token', Cookie: 'a=b' },
    });
    expect(sentHeaders().get('x-csrf-token')).toBe('token');
    expect(sentHeaders().get('cookie')).toBe('a=b');
    expect(sentHeaders().get(SERVER_REQUEST_HEADER)).toBe(SECRET);
  });

  it.each([
    ['another host', 'https://resolver.example.com/regen:x'],
    ['a look-alike host', 'https://api.example.com.evil.com/x'],
    ['a subdomain of the API host', 'https://x.api.example.com/x'],
    ['the same host over http', 'http://api.example.com/x'],
    ['the same host on another port', 'https://api.example.com:8443/x'],
    ['the Sanity API', 'https://abc.api.sanity.io/v1/graphql'],
  ])('leaves requests to %s untouched', async (_, url) => {
    const { inner, wrapped } = setup();
    const init = { method: 'GET' };
    await wrapped(url, init);
    expect(inner).toHaveBeenCalledWith(url, init);
  });

  it('changes nothing without a secret', () => {
    const inner = vi.fn() as unknown as typeof fetch;
    expect(withServerRequestHeader(inner, { apiUri: API })).toBe(inner);
    expect(withServerRequestHeader(inner, { apiUri: API, secret: '' })).toBe(
      inner,
    );
  });

  it('changes nothing with an invalid API address', () => {
    const inner = vi.fn() as unknown as typeof fetch;
    expect(
      withServerRequestHeader(inner, { apiUri: 'not a url', secret: SECRET }),
    ).toBe(inner);
  });

  it('passes relative or invalid URLs through untouched', async () => {
    const { inner, wrapped } = setup();
    await wrapped('/local/path');
    expect(inner).toHaveBeenCalledWith('/local/path', undefined);
  });
});

describe('withServerRequestHeader redirects', () => {
  const redirectTo = (location: string, status = 302) =>
    new Response(null, { status, headers: { location } });

  // Returns the given responses in order, then 200
  const setupWith = (...responses: Response[]) => {
    const inner = vi.fn(async () => responses.shift() ?? new Response('ok'));
    const wrapped = withServerRequestHeader(inner as unknown as typeof fetch, {
      apiUri: API,
      secret: SECRET,
    });
    const call = (i: number) =>
      inner.mock.calls[i] as unknown as Parameters<typeof fetch>;
    return { inner, wrapped, call };
  };

  it('never lets fetch follow redirects itself for API requests', async () => {
    const { wrapped, call } = setupWith();
    await wrapped(`${API}/marketplace/v1/graphql`, { method: 'POST' });
    expect(call(0)[1]?.redirect).toBe('manual');
  });

  it('does not follow a redirect to another origin', async () => {
    const redirect = new Response('redirect body', {
      status: 302,
      headers: { location: 'https://evil.example.com/collect' },
    });
    const { inner, wrapped } = setupWith(redirect);
    const res = await wrapped(`${API}/data/v2/metadata-graph/regen:x`);
    expect(res.status).toBe(302);
    expect(await res.text()).toBe('redirect body');
    expect(inner).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['another scheme', 'http://api.example.com/x'],
    ['another port', 'https://api.example.com:8443/x'],
    ['a protocol-relative URL', '//evil.example.com/x'],
  ])('does not follow a redirect to %s', async (_, location) => {
    const { inner, wrapped } = setupWith(redirectTo(location));
    await wrapped(`${API}/ledger`);
    expect(inner).toHaveBeenCalledTimes(1);
  });

  it('follows a same-origin redirect of a GET, keeping the header', async () => {
    const { inner, wrapped, call } = setupWith(
      redirectTo('/data/v2/metadata-graph/regen:y', 308),
    );
    const res = await wrapped(`${API}/data/v2/metadata-graph/regen:x`);
    expect(res.status).toBe(200);
    expect(inner).toHaveBeenCalledTimes(2);
    expect(call(1)[0]).toBe(`${API}/data/v2/metadata-graph/regen:y`);
    const headers = new Headers(call(1)[1]?.headers);
    expect(headers.get(SERVER_REQUEST_HEADER)).toBe(SECRET);
    expect(call(1)[1]?.redirect).toBe('manual');
  });

  it('starts canceling the discarded body before following a redirect', async () => {
    const [redirectBody, otherBranch] = new ReadableStream().tee();
    const cancel = vi.spyOn(redirectBody, 'cancel');
    const redirect = new Response(redirectBody, {
      status: 302,
      headers: { location: '/next' },
    });
    const { inner, wrapped } = setupWith(redirect);

    const res = await wrapped(`${API}/start`);

    expect(await res.text()).toBe('ok');
    expect(cancel).toHaveBeenCalledTimes(1);
    expect(cancel.mock.invocationCallOrder[0]).toBeLessThan(
      inner.mock.invocationCallOrder[1],
    );
    await otherBranch.cancel();
  });

  it.each([
    ['the Request signal', undefined],
    ['the init signal', new AbortController().signal],
    ['the explicit null signal', null],
  ] as const)('uses %s on a same-origin redirect', async (_, initSignal) => {
    const { wrapped, call } = setupWith(redirectTo('/next'));
    const request = new Request(`${API}/start`, {
      signal: new AbortController().signal,
    });
    const init = initSignal === undefined ? undefined : { signal: initSignal };

    await wrapped(request, init);

    expect(call(1)[1]?.signal).toBe(init ? init.signal : request.signal);
  });

  it('stops following a chain that leaves the API origin', async () => {
    const { inner, wrapped } = setupWith(
      redirectTo(`${API}/a`),
      redirectTo('https://evil.example.com/b'),
    );
    const res = await wrapped(`${API}/start`);
    expect(res.status).toBe(302);
    expect(res.headers.get('location')).toBe('https://evil.example.com/b');
    expect(inner).toHaveBeenCalledTimes(2);
  });

  it('does not follow redirects of a POST', async () => {
    const { inner, wrapped } = setupWith(redirectTo(`${API}/other`, 307));
    const res = await wrapped(`${API}/marketplace/v1/graphql`, {
      method: 'POST',
      body: '{}',
    });
    expect(res.status).toBe(307);
    expect(inner).toHaveBeenCalledTimes(1);
  });

  it(`stops after ${MAX_REDIRECTS} same-origin redirects`, async () => {
    const loop = Array.from({ length: 10 }, (_, i) =>
      redirectTo(`${API}/${i}`),
    );
    const { inner, wrapped } = setupWith(...loop);
    const res = await wrapped(`${API}/start`);
    expect(res.status).toBe(302);
    expect(inner).toHaveBeenCalledTimes(MAX_REDIRECTS + 1);
  });

  it.each(['manual', 'error'] as const)(
    "keeps the caller's redirect: '%s'",
    async redirect => {
      const { inner, wrapped, call } = setupWith(
        redirectTo('https://evil.example.com/x'),
      );
      await wrapped(`${API}/x`, { redirect });
      expect(inner).toHaveBeenCalledTimes(1);
      expect(call(0)[1]?.redirect).toBe(redirect);
    },
  );
});
