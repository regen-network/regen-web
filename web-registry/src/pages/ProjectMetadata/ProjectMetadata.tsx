import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { omit } from 'lodash';

import { ProjectMetadataLD } from 'lib/db/types/json-ld';
import { getProjectShapeIri } from 'lib/rdf';

import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';

import {
  useProjectByIdQuery,
  useShaclGraphByUriQuery,
  useUpdateProjectByIdMutation,
} from '../../generated/graphql';
import { isVCSCreditClass } from '../../lib/ecocredit/api';
import { useProjectEditContext } from '../ProjectEdit';
import { useProjectMetadataSave } from './hooks/useProjectMetadataSave';
import { useProjectMetadataSubmit } from './hooks/useProjectMetadataSubmit';
import { OMITTED_METADATA_KEYS } from './ProjectMetadata.config';
import { ProjectMetadataSelectedForm } from './ProjectMetadata.SelectedForm';

export const ProjectMetadata: React.FC<React.PropsWithChildren<unknown>> =
  () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { isEdit } = useProjectEditContext();
    const [updateProject] = useUpdateProjectByIdMutation();
    const { data } = useProjectByIdQuery({
      variables: { id: projectId },
      fetchPolicy: 'cache-and-network',
    });
    const project = data?.projectById;
    const creditClassId = project?.creditClassByCreditClassId?.onChainId;
    const isVCS = !!creditClassId && isVCSCreditClass(creditClassId);
    let metadata: Partial<ProjectMetadataLD> | undefined;
    const editPath = `/project-pages/${projectId}`;

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

    return (
      <ProjectFormTemplate
        isEdit={isEdit}
        title="Metadata"
        saveAndExit={saveAndExit}
      >
        <ProjectMetadataSelectedForm
          submit={submit}
          metadata={metadata}
          graphData={graphData}
          isVCS={isVCS}
          onNext={() => navigate(`${editPath}/review`)}
          onPrev={() => navigate(`${editPath}/media`)}
        />
      </ProjectFormTemplate>
    );
  };
