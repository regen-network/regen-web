import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { DescriptionForm, DescriptionValues } from '../../components/organisms';
import { useUpdateProjectByIdMutation } from '../../generated/graphql';
import { useProjectEditContext } from '../ProjectEdit';

const Description: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit, onChainProject } = useProjectEditContext();
  const { metadata, offChainProject } = useProjectWithMetadata({
    projectId,
    isEdit,
    onChainProject,
    unanchored: true,
  });

  const [updateProject] = useUpdateProjectByIdMutation();

  // TODO validation regen-registry/issues/1501
  // Get ProjectPage SHACL graph (to validate unanchored data)
  // const { data: graphData } = useShaclGraphByUriQuery({
  //   variables: {
  //     uri: getProjectPageShapeIri(),
  //   },
  // });

  let initialFieldValues: DescriptionValues | undefined;
  if (metadata) {
    initialFieldValues = {
      'schema:description': metadata['schema:description'],
    };
  }

  const saveAndExit = (): Promise<void> => {
    // TODO: functionality
    return Promise.resolve();
  };

  function navigateNext(): void {
    navigate(`/project-pages/${projectId}/media`);
  }

  function navigatePrev(): void {
    navigate(`/project-pages/${projectId}/roles`);
  }

  async function submit(values: DescriptionValues): Promise<void> {
    const newMetadata = { ...metadata, ...values };
    try {
      if (offChainProject) {
        await updateProject({
          variables: {
            input: {
              id: offChainProject.id,
              projectPatch: {
                metadata: newMetadata,
              },
            },
          },
        });
        !isEdit && navigateNext();
      }
    } catch (e) {
      // TODO: Should we display the error banner here?
      // https://github.com/regen-network/regen-registry/issues/554
      // console.log(e);
    }
  }

  return (
    <ProjectFormTemplate
      isEdit={isEdit}
      title="Description"
      saveAndExit={saveAndExit}
    >
      <DescriptionForm
        submit={submit}
        onNext={navigateNext}
        onPrev={navigatePrev}
        initialValues={initialFieldValues}
        // graphData={graphData}
      />
    </ProjectFormTemplate>
  );
};

export { Description };
