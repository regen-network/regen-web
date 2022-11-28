import { useEffect, useState } from 'react';

import { getMetadata } from 'lib/db/api/metadata-graph';
import { ProjectMetadataLD } from 'lib/db/types/json-ld';

/**
 * Returns metadata from off-chain metadata-graph resolver
 *  */
export default function useQueryMetadataGraph(
  iri?: string,
): ProjectMetadataLD | undefined {
  const [metadata, setMetadata] = useState();

  useEffect(() => {
    const fetchMetadata = async (iri?: string): Promise<void> => {
      if (!iri) {
        setMetadata(undefined);
        return;
      }
      const result = await getMetadata(iri);
      setMetadata(result);
    };

    fetchMetadata(iri);
  }, [iri]);

  return metadata;
}
