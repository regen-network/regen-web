import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGeojsonResponse = QueryObserverOptions<string | null>;

export type ReactQueryGeojsonProps = {
  mapFile?: string;
} & ReactQueryBuilderResponse<ReactQueryGeojsonResponse>;
