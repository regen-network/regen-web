import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { omit } from 'lodash';

import { graphqlClient } from 'lib/clients/graphqlClient';
import { AnchoredProjectMetadataLD } from 'lib/db/types/json-ld';
import { getShaclGraphByUriQuery } from 'lib/queries/react-query/registry-server/graphql/getShaclGraphByUriQuery/getShaclGraphByUriQuery';
import { getProjectShapeIri } from 'lib/rdf';

import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

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
    const creditClassId = offChainProject?.metadata?.['regen:creditClassId'];
    const isVCS = !!creditClassId && isVCSCreditClass(creditClassId);

    const uri = creditClassId ? getProjectShapeIri(creditClassId) : '';
    const { data } = useQuery(
      getShaclGraphByUriQuery({
        client: graphqlClient,
        uri,
        enabled: !!uri,
      }),
    );

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
          graphData={data?.data}
          creditClassId={creditClassId}
          isVCS={isVCS}
          onNext={navigateNext}
          onPrev={() => navigate(`/project-pages/${projectId}/media`)}
        />
      </ProjectFormTemplate>
    );
  };
