/* eslint-disable lingui/no-unlocalized-strings */
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
  ...params
}: ReactQueryGetAllCreditClassesParams): ReactQueryGetAllCreditClassesResponse => ({
  queryKey: ['AllCreditClassQuery'],
  queryFn: async () => {
    const { data: sanityCreditClassData } =
      await sanityClient.query<AllCreditClassQuery>({
        query: AllCreditClassDocument,
      });

    return sanityCreditClassData;
  },
  ...params,
});
