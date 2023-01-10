import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useProjectEditContext } from 'pages/ProjectEdit';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { BasicInfoForm, BasicInfoFormValues } from '../../components/organisms';
import {
  EditFormTemplate,
  OnboardingFormTemplate,
} from '../../components/templates';
import { useUpdateProjectByIdMutation } from '../../generated/graphql';

const BasicInfo: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit } = useProjectEditContext();
  const { metadata } = useProjectWithMetadata(projectId, isEdit);
  const [updateProject] = useUpdateProjectByIdMutation();

  let initialFieldValues: BasicInfoFormValues | undefined;
  if (metadata) {
    initialFieldValues = {
      'schema:name': metadata['schema:name'],
      'regen:projectSize': metadata['regen:projectSize'],
    };
  }

  async function saveAndExit(): Promise<void> {
    // TODO: functionality
  }

  function navigateNext(): void {
    navigate(`/project-pages/${projectId}/location`);
  }

  async function submit(values: BasicInfoFormValues): Promise<void> {
    if (isEdit) {
      // TODO initiate on-chain tx
    } else {
      try {
        await updateProject({
          variables: {
            input: {
              id: projectId,
              projectPatch: {
                metadata: { ...metadata, ...values },
              },
            },
          },
        });
        navigateNext();
      } catch (e) {
        // TODO: Should we display the error banner here?
        // https://github.com/regen-network/regen-registry/issues/554
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }
  }

  const Form = (): JSX.Element => (
    <BasicInfoForm
      submit={submit}
      initialValues={initialFieldValues}
      onNext={navigateNext}
    />
  );

  return isEdit ? (
    <EditFormTemplate>
      <Form />
    </EditFormTemplate>
  ) : (
    <OnboardingFormTemplate
      activeStep={0}
      title="Basic Info"
      saveAndExit={saveAndExit}
    >
      <Form />
    </OnboardingFormTemplate>
  );
};

export { BasicInfo };
