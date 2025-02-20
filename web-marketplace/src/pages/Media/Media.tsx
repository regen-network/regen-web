import { useNavigate, useParams } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { getProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';

import { useNavigateNext } from 'pages/ProjectCreate/hooks/useNavigateNext';
import WithLoader from 'components/atoms/WithLoader';
import { MediaFormSchemaType } from 'components/organisms/MediaForm/MediaForm.schema';
import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { MediaForm } from '../../components/organisms/MediaForm';
import { useProjectEditContext } from '../ProjectEdit';

const Media = (): JSX.Element => {
  const { _ } = useLingui();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit, onChainProject, projectEditSubmit } = useProjectEditContext();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { data } = useQuery(
    getProjectByIdQuery({
      client: graphqlClient,
      languageCode: selectedLanguage,
      enabled: !isEdit,
      id: projectId,
    }),
  );
  const creditClassId =
    data?.data?.projectById?.metadata?.['regen:creditClassId'];
  const { navigateNext } = useNavigateNext({
    step: creditClassId ? 'metadata' : 'review',
    projectId,
  });
  const { offChainProject, metadata, metadataSubmit, loading } =
    useProjectWithMetadata({
      projectId,
      isEdit,
      projectEditSubmit,
      navigateNext,
      onChainProject,
      anchored: false,
    });

  const initialValues: MediaFormSchemaType = {
    'regen:previewPhoto': metadata?.['regen:previewPhoto'] ?? {
      'schema:url': '',
      'schema:creditText': '',
    },
    'regen:galleryPhotos': metadata?.['regen:galleryPhotos'],
    'regen:storyMedia': metadata?.['regen:storyMedia'] ?? {
      '@type': 'schema:VideoObject',
      'schema:url': '',
      'schema:creditText': '',
    },
  };

  function navigatePrev(): void {
    navigate(`/project-pages/${projectId}/description`);
  }

  return (
    <ProjectFormTemplate
      isEdit={isEdit}
      title={_(msg`Media`)}
      offChainProject={offChainProject}
      onChainProject={onChainProject}
      loading={loading}
    >
      <WithLoader
        isLoading={loading}
        sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
      >
        <MediaForm
          submit={metadataSubmit}
          initialValues={initialValues}
          onPrev={navigatePrev}
          projectId={offChainProject?.id}
          navigateNext={navigateNext}
        />
      </WithLoader>
    </ProjectFormTemplate>
  );
};

export { Media };
