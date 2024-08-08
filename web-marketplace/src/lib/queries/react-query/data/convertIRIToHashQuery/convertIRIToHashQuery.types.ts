import {
  ConvertIRIToHashRequest,
  ConvertIRIToHashResponse,
  DeepPartial,
  QueryClientImpl as DataQueryClientImpl,
} from '@regen-network/api/lib/generated/regen/data/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryIRIToHashResponse =
  QueryObserverOptions<ConvertIRIToHashResponse | null>;

export type ReactQueryIRIToHashProps = {
  request: DeepPartial<ConvertIRIToHashRequest>;
} & {
  client?: DataQueryClientImpl;
} & ReactQueryBuilderResponse<ReactQueryIRIToHashResponse>;
