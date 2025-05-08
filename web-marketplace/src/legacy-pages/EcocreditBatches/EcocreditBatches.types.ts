import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryBatchesResponse } from '@regen-network/api/regen/ecocredit/v1/query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { QueryBatchesProps } from 'lib/ecocredit/api';

/* BatchesQuery */

export type QueryBatchesLoaderProps = Omit<QueryBatchesProps, 'client'> & {
  client?: QueryBatchesProps['client'];
  enabled: boolean;
};

export type QueryBatchesLoaderResponse = {
  queryKey: string[];
  queryFn: () => Promise<QueryBatchesResponse | void>;
  enabled: boolean;
  staleTime: number;
};

/* getAllCreditClassesQuery */

export type GetAllCreditClassesLoaderParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
};

export type GetAllCreditClassesLoaderResponse = {
  queryKey: string[];
  queryFn: () => Promise<AllCreditClassQuery>;
};
