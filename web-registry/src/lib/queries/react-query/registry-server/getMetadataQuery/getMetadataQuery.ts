import { getMetadata } from 'lib/db/api/metadata-graph';

import {
  ReactQueryMetadataProps,
  ReactQueryMetadataResponse,
} from './getMetadataQuery.types';

export const getMetadataQuery = ({
  iri,
  context,
  ...params
}: ReactQueryMetadataProps): ReactQueryMetadataResponse => ({
  queryKey: ['metadata', iri ?? ''],
  queryFn: async () => {
    return await getMetadata(iri, context);
  },
  ...params,
});
