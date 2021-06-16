import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { BasicInfoForm, BasicInfoFormValues } from '../components/organisms';
import { OnboardingFormTemplate } from '../components/templates';
import { useProjectByIdQuery, useUpdateProjectByIdMutation } from '../generated/graphql';

const BasicInfo: React.FC = () => {
  const history = useHistory();
  const { projectId } = useParams();

  const [updateProject] = useUpdateProjectByIdMutation();
  const { data } = useProjectByIdQuery({
    variables: { id: projectId },
  });

  // TODO Set initial field values based on existing project data
  const [initialFieldValues] = useState<Partial<BasicInfoFormValues> | undefined>();

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
      // This should go to `/project-pages/${projectId}/location`
      // which is not implemented yet,
      // so just using /story for now for testing purposes
      history.push(`/project-pages/${projectId}/story`);
    } catch (e) {
      // TODO: Should we display the error banner here?
      console.log(e);
    }
  }

  return (
    <OnboardingFormTemplate activeStep={0} title="Basic Info" saveAndExit={saveAndExit}>
      <BasicInfoForm submit={submit} initialValues={initialFieldValues} />
    </OnboardingFormTemplate>
  );
};

export { BasicInfo };
