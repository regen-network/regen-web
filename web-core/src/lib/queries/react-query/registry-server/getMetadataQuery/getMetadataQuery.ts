import { getMetadata } from 'lib/db/api/metadata-graph';

import {
  ReactQueryMetadataProps,
  ReactQueryMetadataResponse,
} from './getMetadataQuery.types';

export const getMetadataQuery = ({
  iri,
  dataClient,
  ...params
}: ReactQueryMetadataProps): ReactQueryMetadataResponse => ({
  queryKey: ['metadata', iri ?? ''],
  queryFn: async () => {
    try {
      return await getMetadata(iri, dataClient);
    } catch {
      return null;
    }
  },
  ...params,
});
