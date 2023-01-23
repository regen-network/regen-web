import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { DescriptionForm, DescriptionValues } from '../../components/organisms';
import { useProjectEditContext } from '../ProjectEdit';

const Description: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit, onChainProject, projectEditSubmit } = useProjectEditContext();
  const { metadata, metadataSubmit } = useProjectWithMetadata({
    projectId,
    isEdit,
    projectEditSubmit,
    navigateNext,
    onChainProject,
    anchored: false,
  });

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

  return (
    <ProjectFormTemplate
      isEdit={isEdit}
      title="Description"
      saveAndExit={saveAndExit}
    >
      <DescriptionForm
        submit={metadataSubmit}
        onNext={navigateNext}
        onPrev={navigatePrev}
        initialValues={initialFieldValues}
        // graphData={graphData}
      />
    </ProjectFormTemplate>
  );
};

export { Description };
