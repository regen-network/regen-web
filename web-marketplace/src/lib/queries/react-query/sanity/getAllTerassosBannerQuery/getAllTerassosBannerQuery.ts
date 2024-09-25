import {
  TerrasosHeaderDocument,
  TerrasosHeaderQuery,
} from 'generated/sanity-graphql';

import {
  ReactQueryAllActivityQueryParams,
  ReactQueryTerrasosHeaderQueryResponse,
} from './getAllTerassosBannerQuery.types';

export const getAllTerrasosHeaderQuery = ({
  sanityClient,
  ...params
}: ReactQueryAllActivityQueryParams): ReactQueryTerrasosHeaderQueryResponse => ({
  queryKey: ['terrasosHeaderQuery'],
  queryFn: async () => {
    const { data } = await sanityClient.query<TerrasosHeaderQuery>({
      query: TerrasosHeaderDocument,
    });

    return data;
  },
  ...params,
});
