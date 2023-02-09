import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { merge, omit, pick } from 'lodash';

import { AnchoredProjectMetadataLD } from 'lib/db/types/json-ld';
import { getProjectShapeIri } from 'lib/rdf';

import { ProjectMetadataValues } from 'components/organisms';
import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { useShaclGraphByUriQuery } from '../../generated/graphql';
import { isVCSCreditClass } from '../../lib/ecocredit/api';
import { useProjectEditContext } from '../ProjectEdit';
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

    const submit = useCallback(
      async (values: ProjectMetadataValues): Promise<void> => {
        const parsedMetaData = JSON.parse(values.metadata);
        const baseMetadata = pick(metadata, OMITTED_METADATA_KEYS);
        merge(baseMetadata, parsedMetaData);
        if (baseMetadata) {
          await metadataSubmit({ values: baseMetadata, overwrite: true });
        }
      },
      [metadata, metadataSubmit],
    );

    function navigateNext(): void {
      navigate(`/project-pages/${projectId}/review`);
    }

    return (
      <ProjectFormTemplate isEdit={isEdit} title="Metadata">
        <ProjectMetadataSelectedForm
          submit={submit}
          metadata={customMetadata}
          graphData={graphData}
          isVCS={isVCS}
          onNext={navigateNext}
          onPrev={() => navigate(`/project-pages/${projectId}/media`)}
        />
      </ProjectFormTemplate>
    );
  };
