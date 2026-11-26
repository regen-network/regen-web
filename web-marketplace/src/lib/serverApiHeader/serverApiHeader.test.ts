// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { installServerRequestHeader } from './serverApiHeader';
import { SERVER_REQUEST_HEADER } from './serverApiHeader.utils';

const config = vi.hoisted(() => ({ apiUri: '' }));
vi.mock('lib/apiUri', () => config);

const SECRET = 'test-secret';

describe('installServerRequestHeader', () => {
  const fetchImpl = vi.fn<typeof fetch>(async () => new Response('ok'));

  beforeEach(() => {
    fetchImpl.mockClear();
    vi.stubEnv('CLOUDFLARE_SSR_SECRET', SECRET);
    vi.stubGlobal('fetch', fetchImpl);
    vi.stubGlobal(Symbol.for('regen.serverRequestHeader'), undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it.each(['http://api.example.com', 'http://localhost:5000', 'invalid'])(
    'leaves fetch unchanged for API configuration %s',
    apiUri => {
      config.apiUri = apiUri;

      installServerRequestHeader();

      expect(globalThis.fetch).toBe(fetchImpl);
    },
  );

  it('sends the header to the configured HTTPS API', async () => {
    config.apiUri = 'https://api.example.com';
    const url = `${config.apiUri}/marketplace/v1/graphql`;

    installServerRequestHeader();
    await fetch(url);

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [input, init] = fetchImpl.mock.calls[0];
    expect(input).toBe(url);
    expect(new Headers(init?.headers).get(SERVER_REQUEST_HEADER)).toBe(SECRET);
  });
});
