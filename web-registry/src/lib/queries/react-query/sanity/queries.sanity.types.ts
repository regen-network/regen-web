import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { AllCreditClassQuery } from 'generated/sanity-graphql';

/* getAllCreditClassesQuery */

export type ReactQueryGetAllCreditClassesParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
};

export type ReactQueryGetAllCreditClassesResponse = {
  queryKey: string[];
  queryFn: () => Promise<AllCreditClassQuery>;
  staleTime: number;
};
