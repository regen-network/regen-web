import {
  AllBasketDetailsPageDocument,
  AllBasketDetailsPageQuery,
} from 'generated/sanity-graphql';

import {
  ReactQueryAllBasketDetailsPageQueryResponse,
  ReactQueryAllBasketDetailsQueryParams,
} from './getAllBasketDetailsPageQuery.types';

export const getAllBasketDetailsPageQuery = ({
  sanityClient,
  ...params
}: ReactQueryAllBasketDetailsQueryParams): ReactQueryAllBasketDetailsPageQueryResponse => ({
  queryKey: ['allBasketDetailsPageQuery'],
  queryFn: async () => {
    const { data: sanityCreditClassData } =
      await sanityClient.query<AllBasketDetailsPageQuery>({
        query: AllBasketDetailsPageDocument,
      });

    return sanityCreditClassData;
  },
  ...params,
});
