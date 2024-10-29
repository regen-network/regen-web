import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  EcologicalImpactByIriQuery,
  EcologicalImpactByIriQueryVariables,
} from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGetEcologicalImpactByIriResponse =
  QueryObserverOptions<EcologicalImpactByIriQuery>;

export type ReactQueryGetEcologicalImpactByIriQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & EcologicalImpactByIriQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetEcologicalImpactByIriResponse>;
