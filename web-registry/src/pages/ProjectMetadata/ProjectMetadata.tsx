import React from 'react';
import { useParams } from 'react-router-dom';
import { omit } from 'lodash';

import {
  EditFormTemplate,
  OnboardingFormTemplate,
} from '../../components/templates';
import {
  useProjectByIdQuery,
  useShaclGraphByUriQuery,
  useUpdateProjectByIdMutation,
} from '../../generated/graphql';
import { ProjectMetadataLD } from '../../generated/json-ld';
import { getProjectShapeIri } from '../../lib/rdf';
import { useProjectEditContext } from '../ProjectEdit';
import { useProjectMetadataSave } from './hooks/useProjectMetadataSave';
import { useProjectMetadataSubmit } from './hooks/useProjectMetadataSubmit';
import { OMITTED_METADATA_KEYS } from './ProjectMetadata.config';
import { ProjectMetadataSelectedForm } from './ProjectMetadata.SelectedForm';

export const ProjectMetadata: React.FC = () => {
  const { projectId } = useParams();
  const { isEdit } = useProjectEditContext();
  const [updateProject] = useUpdateProjectByIdMutation();
  const { data } = useProjectByIdQuery({
    variables: { id: projectId },
    fetchPolicy: 'cache-and-network',
  });
  const project = data?.projectById;
  const creditClassId = project?.creditClassByCreditClassId?.onChainId;
  const isVCS = creditClassId === 'C01';
  let metadata: Partial<ProjectMetadataLD> | undefined;

  const { data: graphData } = useShaclGraphByUriQuery({
    skip: !project,
    variables: {
      uri: getProjectShapeIri(creditClassId),
    },
  });

  if (project?.metadata) {
    metadata = omit(project.metadata, OMITTED_METADATA_KEYS);
  }

  const saveAndExit = useProjectMetadataSave();
  const submit = useProjectMetadataSubmit({
    project,
    projectId,
    updateProject,
  });

  return isEdit ? (
    <EditFormTemplate>
      <ProjectMetadataSelectedForm
        submit={submit}
        metadata={metadata}
        graphData={graphData}
        isVCS={isVCS}
      />
    </EditFormTemplate>
  ) : (
    <OnboardingFormTemplate
      activeStep={0}
      title="Metadata"
      saveAndExit={saveAndExit}
    >
      <ProjectMetadataSelectedForm
        submit={submit}
        metadata={metadata}
        graphData={graphData}
        isVCS={isVCS}
      />
    </OnboardingFormTemplate>
  );
};
