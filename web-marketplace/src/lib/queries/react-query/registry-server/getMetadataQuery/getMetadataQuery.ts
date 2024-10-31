import { getMetadata } from 'lib/db/api/metadata-graph';

import {
  ReactQueryMetadataProps,
  ReactQueryMetadataResponse,
} from './getMetadataQuery.types';

export const getMetadataQuery = ({
  iri,
  dataClient,
  languageCode,
  ...params
}: ReactQueryMetadataProps): ReactQueryMetadataResponse => ({
  queryKey: ['metadata', iri ?? '', languageCode],
  queryFn: async () => {
    try {
      return await getMetadata({ iri, client: dataClient, languageCode });
    } catch {
      return null;
    }
  },
  ...params,
});
