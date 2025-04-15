import { getMetadata } from 'lib/db/api/metadata-graph';

import {
  ReactQueryMetadataProps,
  ReactQueryMetadataResponse,
} from './getMetadataQuery.types';

export const getMetadataQuery = ({
  iri,
  client,
  languageCode,
  ...params
}: ReactQueryMetadataProps): ReactQueryMetadataResponse => ({
  queryKey: ['metadata', iri ?? '', languageCode],
  queryFn: async () => {
    try {
      return await getMetadata({ iri, client, languageCode });
    } catch {
      return null;
    }
  },
  ...params,
});
