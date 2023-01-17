import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useProjectEditContext } from 'pages/ProjectEdit';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { BasicInfoForm, BasicInfoFormValues } from '../../components/organisms';
import { ProjectFormTemplate } from '../../components/templates/ProjectFormTemplate';
import { useUpdateProjectByIdMutation } from '../../generated/graphql';

const BasicInfo: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit, onChainProject, projectEditSubmit } = useProjectEditContext();
  const { metadata } = useProjectWithMetadata({
    projectId,
    isEdit,
    onChainProject,
  });
  const [updateProject] = useUpdateProjectByIdMutation();
  const [initialFieldValues, setInitialFieldValues] = useState<
    BasicInfoFormValues | undefined
  >();

  useEffect(() => {
    if (metadata) {
      setInitialFieldValues({
        'schema:name': metadata['schema:name'],
        'regen:projectSize': metadata['regen:projectSize'],
      });
    }
  }, [metadata]);

  // let initialFieldValues: BasicInfoFormValues | undefined;
  // if (metadata) {
  //   initialFieldValues = {
  //     'schema:name': metadata['schema:name'],
  //     'regen:projectSize': metadata['regen:projectSize'],
  //   };
  // }

  async function saveAndExit(): Promise<void> {
    // TODO: functionality
  }

  function navigateNext(): void {
    navigate(`/project-pages/${projectId}/location`);
  }

  async function submit(values: BasicInfoFormValues): Promise<void> {
    const newMetadata = { ...metadata, ...values };
    if (isEdit) {
      await projectEditSubmit(newMetadata);
    } else {
      try {
        await updateProject({
          variables: {
            input: {
              id: projectId,
              projectPatch: {
                metadata: newMetadata,
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

  return (
    <ProjectFormTemplate
      isEdit={isEdit}
      title="Basic Info"
      saveAndExit={saveAndExit}
    >
      <BasicInfoForm
        submit={submit}
        initialValues={initialFieldValues}
        onNext={navigateNext}
      />
    </ProjectFormTemplate>
  );
};

export { BasicInfo };
