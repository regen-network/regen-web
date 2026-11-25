import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { apiUri } from 'lib/apiUri';
import { CSRF_ERROR } from 'lib/errors/apiErrors';
import { GET_CSRF_QUERY_KEY } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery.constants';

import { generateIri } from './metadata-graph';

vi.mock('lib/rdf', () => ({ jsonLdCompact: vi.fn() }));

describe('generateIri', () => {
  const metadata = { '@id': 'https://example.com/test-metadata' };
  const data = { iri: 'regen:test.rdf', metadata };
  const url = `${apiUri}/data/v2/iri-gen`;
  const requestConfig = (token: string) => ({
    withCredentials: true,
    headers: { 'X-CSRF-TOKEN': token },
  });
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity } },
  });

  afterEach(() => {
    queryClient.clear();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('sends the session cookie and the cached CSRF token', async () => {
    queryClient.setQueryData([GET_CSRF_QUERY_KEY], 'cached-token');
    const post = vi.spyOn(axios, 'post').mockResolvedValue({ data });

    await expect(generateIri(metadata, queryClient)).resolves.toEqual(data);

    expect(post).toHaveBeenCalledWith(
      url,
      metadata,
      requestConfig('cached-token'),
    );
  });

  it('refreshes a rejected CSRF token and retries the request once', async () => {
    queryClient.setQueryData([GET_CSRF_QUERY_KEY], 'stale-token');
    const fetchToken = vi.fn().mockResolvedValue({
      json: async () => ({ token: 'fresh-token' }),
    });
    vi.stubGlobal('fetch', fetchToken);
    const post = vi
      .spyOn(axios, 'post')
      .mockRejectedValueOnce({
        isAxiosError: true,
        response: { status: 403, data: { error: CSRF_ERROR } },
      })
      .mockResolvedValueOnce({ data });

    await expect(generateIri(metadata, queryClient)).resolves.toEqual(data);

    expect(fetchToken).toHaveBeenCalledWith(
      `${apiUri}/marketplace/v1/csrfToken`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );
    expect(post).toHaveBeenCalledTimes(2);
    expect(post).toHaveBeenNthCalledWith(
      1,
      url,
      metadata,
      requestConfig('stale-token'),
    );
    expect(post).toHaveBeenNthCalledWith(
      2,
      url,
      metadata,
      requestConfig('fresh-token'),
    );
    expect(queryClient.getQueryData([GET_CSRF_QUERY_KEY])).toBe('fresh-token');
  });
});
