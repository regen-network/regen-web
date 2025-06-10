import {
  ConvertIRIToHashRequest,
  ConvertIRIToHashResponse,
} from '@regen-network/api/regen/data/v2/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryClient } from 'ledger';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryIRIToHashResponse =
  QueryObserverOptions<ConvertIRIToHashResponse | null>;

export type ReactQueryIRIToHashProps = {
  request: ConvertIRIToHashRequest;
} & {
  client?: QueryClient;
} & ReactQueryBuilderResponse<ReactQueryIRIToHashResponse>;
