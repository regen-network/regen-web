import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { omit } from 'lodash';

import { AnchoredProjectMetadataLD } from 'lib/db/types/json-ld';
import { getShaclGraphByUriQuery } from 'lib/queries/react-query/registry-server/graphql/getShaclGraphByUriQuery/getShaclGraphByUriQuery';
import { getProjectShapeIri } from 'lib/rdf';

import { NotFoundPage } from 'legacy-pages/NotFound/NotFound';
import { useNavigateNext } from 'legacy-pages/ProjectCreate/hooks/useNavigateNext';
import { MetadataForm } from 'components/organisms/MetadataForm/MetadataForm';
import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { useProjectEditContext } from '../ProjectEdit';
import { useProjectMetadataSubmit } from './hooks/useProjectMetadataSubmit';
import { OMITTED_METADATA_KEYS } from './ProjectMetadata.config';

export const ProjectMetadata: React.FC<React.PropsWithChildren<unknown>> =
  () => {
    const { _ } = useLingui();
    const navigate = useNavigate();
    const { projectId } = useParams();
    const graphqlClient = useApolloClient();
    const { isEdit, onChainProject, projectEditSubmit } =
      useProjectEditContext();
    const { navigateNext } = useNavigateNext({ step: 'review', projectId });

    const { metadata, metadataSubmit, offChainProject, loading } =
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
      offChainProject?.metadata?.['regen:creditClassId'] ??
      onChainProject?.classId;

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
    const initialValues = {
      metadata: customMetadata ? JSON.stringify(customMetadata, null, 2) : '',
    };

    return (
      <>
        {creditClassId ? (
          <ProjectFormTemplate
            isEdit={isEdit}
            title={_(msg`Metadata`)}
            offChainProject={offChainProject}
            onChainProject={onChainProject}
            loading={loading}
          >
            <MetadataForm
              onSubmit={projectMetadataSubmit}
              initialValues={initialValues}
              graphData={data?.data}
              creditClassId={creditClassId}
              onPrev={() => navigate(`/project-pages/${projectId}/media`)}
            />
          </ProjectFormTemplate>
        ) : (
          // Metadata form is not available for projects without any credit class
          <NotFoundPage />
        )}
      </>
    );
  };
