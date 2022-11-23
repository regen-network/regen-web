import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { AllCreditClassQuery } from 'generated/sanity-graphql';

/* getAllCreditClassesQuery */

export type ReactQueryGetAllCreditClassesParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
  enabled?: boolean;
};

export type ReactQueryGetAllCreditClassesResponse = {
  queryKey: string[];
  queryFn: () => Promise<AllCreditClassQuery>;
  staleTime: number;
  enabled: boolean;
};
