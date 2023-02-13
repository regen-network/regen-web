import { useCallback } from 'react';
import { merge, pick } from 'lodash';

import { NestedPartial } from 'types/nested-partial';
import { ProjectMetadataLD } from 'lib/db/types/json-ld';

import { MetadataSubmitProps } from 'hooks/projects/useProjectWithMetadata';

import { ProjectMetadataValues } from '../../../components/organisms';
import { OMITTED_METADATA_KEYS } from '../ProjectMetadata.config';

type Params = {
  metadata?: NestedPartial<ProjectMetadataLD>;
  metadataSubmit: (p: MetadataSubmitProps) => Promise<void>;
};

export type UseProjectMetadataSubmitReturn = (
  values: ProjectMetadataValues,
) => Promise<void>;

export const useProjectMetadataSubmit = ({
  metadata,
  metadataSubmit,
}: Params): UseProjectMetadataSubmitReturn => {
  const projectMetadataSubmit = useCallback(
    async (values: ProjectMetadataValues): Promise<void> => {
      const parsedMetaData = JSON.parse(values.metadata);
      const baseMetadata = pick(metadata, OMITTED_METADATA_KEYS);
      merge(baseMetadata, parsedMetaData);
      if (baseMetadata) {
        await metadataSubmit({ values: baseMetadata, overwrite: true });
      }
    },
    [metadata, metadataSubmit],
  );

  return projectMetadataSubmit;
};
