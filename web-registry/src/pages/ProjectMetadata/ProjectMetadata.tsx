import { Box } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

import { ProjectMetadataForm } from '../../components/organisms';
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
import useProjectMetadataSave from './hooks/useProjectMetadataSave';
import useProjectMetadataSubmit from './hooks/useProjectMetadataSubmit';

const ProjectMetadata: React.FC = () => {
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
  let metadata: ProjectMetadataLD | undefined;

  const { data: graphData } = useShaclGraphByUriQuery({
    skip: !project,
    variables: {
      uri: getProjectShapeIri(creditClassId),
    },
  });

  if (project?.metadata) {
    metadata = project.metadata;
  }

  const saveAndExit = useProjectMetadataSave();
  const submit = useProjectMetadataSubmit({
    project,
    projectId,
    updateProject,
  });

  return isEdit ? (
    <EditFormTemplate>
      {!isVCS && (
        <ProjectMetadataForm
          submit={submit}
          initialValues={metadata}
          graphData={graphData}
        />
      )}
    </EditFormTemplate>
  ) : (
    <OnboardingFormTemplate
      activeStep={0}
      title="Metadata"
      saveAndExit={saveAndExit}
    >
      {isVCS ? (
        // TODO https://github.com/regen-network/regen-registry/issues/908
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {'VCS metadata form not implemented yet'}
        </Box>
      ) : (
        <ProjectMetadataForm
          submit={submit}
          initialValues={metadata}
          graphData={graphData}
        />
      )}
    </OnboardingFormTemplate>
  );
};

export { ProjectMetadata };
