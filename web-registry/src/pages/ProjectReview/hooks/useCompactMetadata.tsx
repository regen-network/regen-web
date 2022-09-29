import { useEffect, useState } from 'react';
import { JsonLdDocument, JsonLdProcessor } from 'jsonld';

import { ProjectMetadataLDUnion } from 'generated/json-ld';
import { COMPACTED_CONTEXT } from 'lib/rdf.compacted-context';

type Props = {
  metadataRaw: JsonLdDocument;
};

export const useCompactMetadata = ({
  metadataRaw,
}: Props): Partial<ProjectMetadataLDUnion> => {
  const [metadata, setMetadata] = useState<Partial<ProjectMetadataLDUnion>>({});

  useEffect(() => {
    const compactMetadata = async (): Promise<void> => {
      const compactMetadata = await JsonLdProcessor.compact(
        metadataRaw,
        COMPACTED_CONTEXT,
      );
      if (compactMetadata) {
        setMetadata(compactMetadata as Partial<ProjectMetadataLDUnion>);
      }
    };

    compactMetadata();
  }, [metadataRaw, setMetadata]);

  return metadata;
};
