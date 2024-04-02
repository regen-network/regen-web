import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { ProjectInput, useCreateProjectMutation } from 'generated/graphql';
import { useAuth } from 'lib/auth/auth';
import { getAccountProjectsByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountProjectsByIdQuery/getAccountProjectsByIdQuery.utils';
import { getProjectCreateBaseData } from 'lib/rdf';

import { useCreateProjectContext } from 'pages/ProjectCreate';
import {
  BasicInfoFormDraftSchemaType,
  BasicInfoFormSchemaType,
} from 'components/organisms/BasicInfoForm/BasicInfoForm.schema';

type SubmitCreateProjectParams = {
  values?: BasicInfoFormSchemaType | BasicInfoFormDraftSchemaType;
  shouldNavigate?: boolean;
  projectInput?: ProjectInput;
};

export const useSubmitCreateProject = () => {
  const { activeAccountId } = useAuth();
  const reactQueryClient = useQueryClient();
  const [createProject] = useCreateProjectMutation();
  const navigate = useNavigate();
  const { creditClassOnChainId, creditClassId } = useCreateProjectContext();

  const submitCreateProject = useCallback(
    async ({
      values,
      shouldNavigate,
      projectInput,
    }: SubmitCreateProjectParams) => {
      const metadata = getProjectCreateBaseData(creditClassOnChainId);

      try {
        const res = await createProject({
          variables: {
            input: {
              project: {
                adminAccountId: activeAccountId,
                creditClassId: creditClassId || undefined, // If creditClassId is '', pass undefined instead
                metadata: { ...metadata, ...values },
                ...projectInput,
              },
            },
          },
        });
        const projectId = res?.data?.createProject?.project?.id;
        if (projectId) {
          await reactQueryClient.invalidateQueries({
            queryKey: getAccountProjectsByIdQueryKey({ id: activeAccountId }),
          });
          if (shouldNavigate) navigate(`/project-pages/${projectId}/location`);
        }
      } catch (e) {
        throw new Error('Error creating project');
      }
    },
    [],
  );
  return { submitCreateProject };
};
