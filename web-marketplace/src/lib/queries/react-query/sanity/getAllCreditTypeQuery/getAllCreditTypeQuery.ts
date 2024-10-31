/* eslint-disable lingui/no-unlocalized-strings */
import { getLocalizedData } from 'utils/sanity/getLocalizedData';

import {
  AllCreditTypeDocument,
  AllCreditTypeQuery,
} from 'generated/sanity-graphql';

import {
  ReactQueryGetAllCreditTypeParams,
  ReactQueryGetAllCreditTypeResponse,
} from './getAllCreditTypeQuery.types';

export const getAllCreditTypeQuery = ({
  sanityClient,
  languageCode,
  ...params
}: ReactQueryGetAllCreditTypeParams): ReactQueryGetAllCreditTypeResponse => ({
  queryKey: ['AllCreditTypeQuery', languageCode],
  queryFn: async () => {
    const { data: sanityCreditTypeData } =
      await sanityClient.query<AllCreditTypeQuery>({
        query: AllCreditTypeDocument,
      });

    return {
      allCreditType: getLocalizedData({
        data: sanityCreditTypeData.allCreditType,
        languageCode,
      }),
    };
  },
  ...params,
});
