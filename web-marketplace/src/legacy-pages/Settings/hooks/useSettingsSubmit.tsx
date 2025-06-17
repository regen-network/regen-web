import { useCallback } from 'react';

import { ProjectPatch } from 'generated/graphql';

import { SettingsFormSchemaType } from 'components/organisms/SettingsForm/SettingsForm.schema';
import { useCreateOrUpdateProject } from 'hooks/projects/UseCreateOrUpdateProject';
import { OffChainProject } from 'hooks/projects/useProjectWithMetadata';

interface Props {
  offChainProject?: OffChainProject;
}

export type SettingsSubmitProps = {
  values: SettingsFormSchemaType;
};

export type Return = {
  settingsSubmit: (props: SettingsSubmitProps) => Promise<void>;
};

export const useSettingsSubmit = ({ offChainProject }: Props): Return => {
  const { createOrUpdateProject } = useCreateOrUpdateProject();

  const settingsSubmit = useCallback(
    async ({ values }: SettingsSubmitProps): Promise<void> => {
      try {
        let projectPatch: ProjectPatch = { ...values };

        await createOrUpdateProject({
          offChainProjectId: offChainProject?.id,
          projectPatch,
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
    [createOrUpdateProject, offChainProject?.id],
  );

  return { settingsSubmit };
};
