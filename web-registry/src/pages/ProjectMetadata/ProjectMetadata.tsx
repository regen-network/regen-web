import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { omit } from 'lodash';

import { AnchoredProjectMetadataLD } from 'lib/db/types/json-ld';
import { getProjectShapeIri } from 'lib/rdf';

import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { useShaclGraphByUriQuery } from '../../generated/graphql';
import { isVCSCreditClass } from '../../lib/ecocredit/api';
import { useProjectEditContext } from '../ProjectEdit';
import { useProjectMetadataSubmit } from './hooks/useProjectMetadataSubmit';
import { OMITTED_METADATA_KEYS } from './ProjectMetadata.config';
import { ProjectMetadataSelectedForm } from './ProjectMetadata.SelectedForm';

export const ProjectMetadata: React.FC<React.PropsWithChildren<unknown>> =
  () => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const { isEdit, onChainProject, projectEditSubmit } =
      useProjectEditContext();
    const { metadata, metadataSubmit, offChainProject } =
      useProjectWithMetadata({
        projectId,
        isEdit,
        projectEditSubmit,
        navigateNext,
        onChainProject,
      });

    const projectMetadataSubmit = useProjectMetadataSubmit({
      metadata,
      metadataSubmit,
    });
    const creditClassId =
      offChainProject?.creditClassByCreditClassId?.onChainId;
    const isVCS = !!creditClassId && isVCSCreditClass(creditClassId);
    const { data: graphData } = useShaclGraphByUriQuery({
      skip: !creditClassId,
      variables: {
        uri: getProjectShapeIri(creditClassId),
      },
    });

    let customMetadata: Partial<AnchoredProjectMetadataLD> | undefined;
    if (metadata) {
      customMetadata = omit(metadata, OMITTED_METADATA_KEYS);
    }

    function navigateNext(): void {
      navigate(`/project-pages/${projectId}/review`);
    }

    return (
      <ProjectFormTemplate isEdit={isEdit} title="Metadata">
        <ProjectMetadataSelectedForm
          submit={projectMetadataSubmit}
          metadata={customMetadata}
          graphData={graphData}
          isVCS={isVCS}
          onNext={navigateNext}
          onPrev={() => navigate(`/project-pages/${projectId}/media`)}
        />
      </ProjectFormTemplate>
    );
  };
