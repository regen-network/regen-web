import { FetchQueryOptions, QueryClient } from '@tanstack/react-query';

interface GetFromCacheOrFetchParams<QueryResponse> {
  reactQueryClient?: QueryClient;
  query: FetchQueryOptions<QueryResponse>;
  queryKeys?: string[];
}

export async function getFromCacheOrFetch<QueryResponse>({
  reactQueryClient,
  query,
  queryKeys,
}: GetFromCacheOrFetchParams<QueryResponse>): Promise<
  QueryResponse | undefined
> {
  if (!reactQueryClient) return;

  const response =
    reactQueryClient?.getQueryData<QueryResponse>(queryKeys ?? []) ??
    (await reactQueryClient?.fetchQuery(query));

  return response;
}
