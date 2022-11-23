import { useEffect, useState } from 'react';
import { JsonLdDocument } from 'jsonld';

import { ProjectMetadataIntersectionLD } from 'generated/json-ld';
import { jsonLdCompact } from 'lib/rdf.compacted-context';

type Props = {
  metadataRaw: JsonLdDocument;
};

export const useCompactMetadata = ({
  metadataRaw,
}: Props): Partial<ProjectMetadataIntersectionLD> => {
  const [metadata, setMetadata] = useState<
    Partial<ProjectMetadataIntersectionLD>
  >({});

  useEffect(() => {
    const compactMetadata = async (): Promise<void> => {
      const compactMetadata = await jsonLdCompact(metadataRaw);
      if (compactMetadata) {
        setMetadata(compactMetadata as Partial<ProjectMetadataIntersectionLD>);
      }
    };

    compactMetadata();
  }, [metadataRaw, setMetadata]);

  return metadata;
};
