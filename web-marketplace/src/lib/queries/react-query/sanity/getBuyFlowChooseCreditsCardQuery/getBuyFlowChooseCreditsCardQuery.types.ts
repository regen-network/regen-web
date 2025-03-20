import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { AllBuyFlowChooseCreditsCardQuery } from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryBuyFlowChooseCreditsCardResponse =
  QueryObserverOptions<AllBuyFlowChooseCreditsCardQuery>;

export type ReactQueryBuyFlowChooseCreditsCardQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & ReactQueryBuilderResponse<ReactQueryBuyFlowChooseCreditsCardResponse>;
