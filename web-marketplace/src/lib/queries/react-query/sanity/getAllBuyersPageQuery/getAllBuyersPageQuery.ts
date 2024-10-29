import { getLocalizedData } from 'utils/sanity/getLocalizedData';

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
  languageCode,
  ...params
}: ReactQueryAllBuyersQueryParams): ReactQueryAllBuyersPageQueryResponse => ({
  queryKey: ['allBuyersPageQuery', languageCode],
  queryFn: async () => {
    const { data: sanityCreditClassData } =
      await sanityClient.query<AllBuyersPageQuery>({
        query: AllBuyersPageDocument,
      });

    return {
      allBuyersPage: getLocalizedData({
        data: sanityCreditClassData.allBuyersPage,
        languageCode,
      }),
    };
  },
  ...params,
});
