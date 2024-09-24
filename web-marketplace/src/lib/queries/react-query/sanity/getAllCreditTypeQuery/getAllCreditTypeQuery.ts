/* eslint-disable lingui/no-unlocalized-strings */
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
  ...params
}: ReactQueryGetAllCreditTypeParams): ReactQueryGetAllCreditTypeResponse => ({
  queryKey: ['AllCreditTypeQuery'],
  queryFn: async () => {
    const { data: sanityCreditTypeData } =
      await sanityClient.query<AllCreditTypeQuery>({
        query: AllCreditTypeDocument,
      });

    return sanityCreditTypeData;
  },
  ...params,
});
