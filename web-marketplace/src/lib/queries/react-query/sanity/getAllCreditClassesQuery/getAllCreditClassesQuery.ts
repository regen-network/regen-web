/* eslint-disable lingui/no-unlocalized-strings */
import { getLocalizedData } from 'utils/sanity/getLocalizedData';

import {
  AllCreditClassDocument,
  AllCreditClassQuery,
} from 'generated/sanity-graphql';

import {
  ReactQueryGetAllCreditClassesParams,
  ReactQueryGetAllCreditClassesResponse,
} from './getAllCreditClassesQuery.types';

export const getAllSanityCreditClassesQuery = ({
  sanityClient,
  languageCode,
  ...params
}: ReactQueryGetAllCreditClassesParams): ReactQueryGetAllCreditClassesResponse => ({
  queryKey: ['AllCreditClassQuery', languageCode],
  queryFn: async () => {
    const { data: sanityCreditClassData } =
      await sanityClient.query<AllCreditClassQuery>({
        query: AllCreditClassDocument,
      });

    return {
      allCreditClass: getLocalizedData({
        data: sanityCreditClassData.allCreditClass,
        languageCode,
      }),
    };
  },
  ...params,
});
