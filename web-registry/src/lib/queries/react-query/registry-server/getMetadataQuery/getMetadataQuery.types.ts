import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryMetadataResponse = QueryObserverOptions<any>;

export type ReactQueryMetadataProps = {
  iri?: string;
} & ReactQueryBuilderResponse<ReactQueryMetadataResponse>;
