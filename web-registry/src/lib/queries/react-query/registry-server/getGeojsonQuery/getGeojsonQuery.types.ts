import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGeojsonResponse = QueryObserverOptions<
  string | undefined
>;

export type ReactQueryGeojsonProps = {
  mapFile?: string;
} & ReactQueryBuilderResponse<ReactQueryGeojsonResponse>;
