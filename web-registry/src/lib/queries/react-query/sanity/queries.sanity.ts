import {
  AllCreditClassDocument,
  AllCreditClassQuery,
} from 'generated/sanity-graphql';

import {
  ReactQueryGetAllCreditClassesParams,
  ReactQueryGetAllCreditClassesResponse,
} from './queries.sanity.types';

export const getAllCreditClassesQuery = ({
  sanityClient,
  enabled = true,
}: ReactQueryGetAllCreditClassesParams): ReactQueryGetAllCreditClassesResponse => ({
  queryKey: ['AllCreditClassQuery'],
  queryFn: async () => {
    const { data: sanityCreditClassData } =
      await sanityClient.query<AllCreditClassQuery>({
        query: AllCreditClassDocument,
      });

    return sanityCreditClassData;
  },
  staleTime: Infinity,
  enabled,
});
