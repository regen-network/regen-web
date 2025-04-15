import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryClient } from 'ledger';
import {
  AnchoredProjectMetadataLD,
  CreditClassMetadataLD,
} from 'lib/db/types/json-ld';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryMetadataResponse = QueryObserverOptions<
  AnchoredProjectMetadataLD | CreditClassMetadataLD
>;

export type ReactQueryMetadataProps = {
  iri?: string;
  client?: QueryClient;
  languageCode: string;
} & ReactQueryBuilderResponse<ReactQueryMetadataResponse>;
