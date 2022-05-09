import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BasicInfoForm, BasicInfoFormValues } from '../components/organisms';
import {
  OnboardingFormTemplate,
  EditFormTemplate,
} from '../components/templates';
import {
  useProjectByIdQuery,
  useUpdateProjectByIdMutation,
} from '../generated/graphql';
import { useProjectEditContext } from '../pages/ProjectEdit';

const BasicInfo: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [updateProject] = useUpdateProjectByIdMutation();
  const { isEdit } = useProjectEditContext();

  const { data } = useProjectByIdQuery({
    variables: { id: projectId },
    fetchPolicy: 'cache-and-network',
  });

  let initialFieldValues: BasicInfoFormValues | undefined;
  if (data?.projectById?.metadata) {
    const metadata = data.projectById.metadata;
    initialFieldValues = {
      'schema:name': metadata['schema:name'],
      'regen:size': metadata['regen:size'],
    };
  }

  async function saveAndExit(): Promise<void> {
    // TODO: functionality
  }

  async function submit(values: BasicInfoFormValues): Promise<void> {
    const metadata = { ...data?.projectById?.metadata, ...values };
    try {
      await updateProject({
        variables: {
          input: {
            id: projectId,
            projectPatch: {
              metadata,
            },
          },
        },
      });
      !isEdit && navigate(`/project-pages/${projectId}/location`);
    } catch (e) {
      // TODO: Should we display the error banner here?
      // https://github.com/regen-network/regen-registry/issues/554
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  return isEdit ? (
    <EditFormTemplate>
      <BasicInfoForm submit={submit} initialValues={initialFieldValues} />
    </EditFormTemplate>
  ) : (
    <OnboardingFormTemplate
      activeStep={0}
      title="Basic Info"
      saveAndExit={saveAndExit}
    >
      <BasicInfoForm submit={submit} initialValues={initialFieldValues} />
    </OnboardingFormTemplate>
  );
};

export { BasicInfo };
