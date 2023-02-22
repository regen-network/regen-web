import {
  AllBuyersPageDocument,
  AllBuyersPageQuery,
} from 'generated/sanity-graphql';

import {
  ReactQueryAllBuyersPageQueryResponse,
  ReactQueryAllBuyersQueryParams,
} from './getAllBuyersPageQuery.types';

export const getAllBuyersPageQuery = ({
  sanityClient,
  ...params
}: ReactQueryAllBuyersQueryParams): ReactQueryAllBuyersPageQueryResponse => ({
  queryKey: ['allBuyersPageQuery'],
  queryFn: async () => {
    const { data: sanityCreditClassData } =
      await sanityClient.query<AllBuyersPageQuery>({
        query: AllBuyersPageDocument,
      });

    return sanityCreditClassData;
  },
  ...params,
});
