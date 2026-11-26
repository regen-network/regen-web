import { describe, expect, it, vi } from 'vitest';

import {
  SERVER_REQUEST_HEADER,
  withServerRequestHeader,
} from './serverApiHeader.utils';

const API = 'https://api.regen.network';
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
    ['a look-alike host', 'https://api.regen.network.evil.com/x'],
    ['a subdomain of the API host', 'https://x.api.regen.network/x'],
    ['the same host over http', 'http://api.regen.network/x'],
    ['the same host on another port', 'https://api.regen.network:8443/x'],
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
