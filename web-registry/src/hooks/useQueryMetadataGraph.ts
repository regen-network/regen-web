import { useEffect, useState } from 'react';

import { getMetadata } from 'lib/db/api/metadata-graph';
import { AnchoredProjectMetadataIntersectionLD } from 'lib/db/types/json-ld';

type UseQueryMetadataGraphResponse = {
  /** Anchored project metadata that comes from IRI resolver. */
  metadata: Partial<AnchoredProjectMetadataIntersectionLD> | undefined;
  loading?: boolean;
};

/**
 * Returns metadata from off-chain metadata-graph resolver
 *  */
export default function useQueryMetadataGraph(
  iri?: string,
): UseQueryMetadataGraphResponse {
  const [metadata, setMetadata] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMetadata = async (iri?: string): Promise<void> => {
      if (!iri) {
        setMetadata(undefined);
        return;
      }
      setLoading(true);
      const result = await getMetadata(iri);
      setMetadata(result);
      setLoading(false);
    };

    fetchMetadata(iri);
  }, [iri]);

  return { metadata, loading };
}
