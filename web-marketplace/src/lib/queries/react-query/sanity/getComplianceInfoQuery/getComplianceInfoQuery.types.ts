import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ComplianceInfoQuery } from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryComplianceInfoQueryResponse =
  QueryObserverOptions<ComplianceInfoQuery>;

export type ReactQueryComplianceInfoQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & ReactQueryBuilderResponse<ReactQueryComplianceInfoQueryResponse>;
