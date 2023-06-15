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
    return await getMetadata(iri, dataClient);
  },
  ...params,
});
