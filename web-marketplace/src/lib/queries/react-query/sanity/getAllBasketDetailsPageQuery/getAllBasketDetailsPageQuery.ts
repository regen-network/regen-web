import { getLocalizedData } from 'utils/sanity/getLocalizedData';

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
  languageCode,
  ...params
}: ReactQueryAllBasketDetailsQueryParams): ReactQueryAllBasketDetailsPageQueryResponse => ({
  queryKey: ['allBasketDetailsPageQuery', languageCode],
  queryFn: async () => {
    const { data: sanityCreditClassData } =
      await sanityClient.query<AllBasketDetailsPageQuery>({
        query: AllBasketDetailsPageDocument,
      });

    return {
      allBasketDetailsPage: getLocalizedData({
        data: sanityCreditClassData.allBasketDetailsPage,
        languageCode,
      }),
    };
  },
  ...params,
});
