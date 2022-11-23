import { QueryClient, QueryObserverOptions } from '@tanstack/react-query';

interface GetFromCacheOrFetchParams<QueryResponse> {
  reactQueryClient?: QueryClient;
  query: QueryObserverOptions<QueryResponse>;
}

export async function getFromCacheOrFetchUnresolved<QueryResponse>({
  reactQueryClient,
  query,
}: GetFromCacheOrFetchParams<QueryResponse>): Promise<QueryResponse | void> {
  if (!reactQueryClient) return undefined;

  const response =
    reactQueryClient?.getQueryData<QueryResponse>(query.queryKey ?? []) ??
    reactQueryClient?.fetchQuery(query);

  return response;
}
