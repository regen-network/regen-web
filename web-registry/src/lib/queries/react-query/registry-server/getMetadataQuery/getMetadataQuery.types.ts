import { QueryObserverOptions } from '@tanstack/react-query';

import { ProjectMetadataLD } from 'lib/db/types/json-ld';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryMetadataResponse =
  QueryObserverOptions<ProjectMetadataLD>;

export type ReactQueryMetadataProps = {
  iri?: string;
} & ReactQueryBuilderResponse<ReactQueryMetadataResponse>;
