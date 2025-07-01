import { useCallback } from 'react';
import { useCreateProjectContext } from 'legacy-pages/ProjectCreate';
import { merge, pick } from 'lodash';

import { NestedPartial } from 'types/nested-partial';
import { ProjectMetadataLD } from 'lib/db/types/json-ld';

import { MetadataFormSchemaType } from 'components/organisms/MetadataForm/MetadataForm.schema';
import { MetadataSubmitProps } from 'hooks/projects/useProjectWithMetadata';

import { OMITTED_METADATA_KEYS } from '../ProjectMetadata.config';

type Params = {
  metadata?: NestedPartial<ProjectMetadataLD>;
  metadataSubmit: (p: MetadataSubmitProps) => Promise<void>;
};

type SubmitParams = {
  values: MetadataFormSchemaType;
};

export type UseProjectMetadataSubmitReturn = ({
  values,
}: SubmitParams) => Promise<void>;

export const useProjectMetadataSubmit = ({
  metadata,
  metadataSubmit,
}: Params): UseProjectMetadataSubmitReturn => {
  const { shouldNavigateRef } = useCreateProjectContext();
  const projectMetadataSubmit = useCallback(
    async ({ values }: SubmitParams): Promise<void> => {
      const parsedMetaData = JSON.parse(values.metadata || '{}');
      const baseMetadata = pick(metadata, [
        '@context',
        ...OMITTED_METADATA_KEYS,
      ]);
      merge(baseMetadata, parsedMetaData);
      if (baseMetadata) {
        await metadataSubmit({
          values: baseMetadata,
          overwrite: true,
          shouldNavigate: shouldNavigateRef?.current,
        });
      }
    },
    [metadata, metadataSubmit, shouldNavigateRef],
  );

  return projectMetadataSubmit;
};
