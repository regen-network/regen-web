import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { BasicInfoForm, BasicInfoFormValues } from '../components/organisms';
import { OnboardingFormTemplate, EditFormTemplate } from '../components/templates';
import { useProjectByIdQuery, useUpdateProjectByIdMutation } from '../generated/graphql';
import { useProjectEditContext } from '../pages/ProjectEdit';

const BasicInfo: React.FC = () => {
  const history = useHistory();
  const { projectId } = useParams<{ projectId: string }>();
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
      'http://schema.org/name': metadata['http://schema.org/name'],
      'http://regen.network/size': metadata['http://regen.network/size'],
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
      !isEdit && history.push(`/project-pages/${projectId}/location`);
    } catch (e) {
      // TODO: Should we display the error banner here?
      // https://github.com/regen-network/regen-registry/issues/554
      console.log(e);
    }
  }

  return isEdit ? (
    <EditFormTemplate>
      <BasicInfoForm submit={submit} initialValues={initialFieldValues} />
    </EditFormTemplate>
  ) : (
    <OnboardingFormTemplate activeStep={0} title="Basic Info" saveAndExit={saveAndExit}>
      <BasicInfoForm submit={submit} initialValues={initialFieldValues} />
    </OnboardingFormTemplate>
  );
};

export { BasicInfo };
