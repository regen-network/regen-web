import { useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/apolloSanity';
import { AnchoredProjectMetadataLD } from 'lib/db/types/json-ld';
import { normalizeProjectWithMetadata } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import {
  findSanityCreditClass,
  getIsOnChainId,
  getIsUuid,
  parseOffChainProject,
} from 'components/templates/ProjectDetails/ProjectDetails.utils';

export const useFetchProject = () => {
  const { projectId } = useParams();
  const { queryClient } = useLedger();
  const graphqlClient = useApolloClient();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const isOnChainId = getIsOnChainId(projectId);
  const isOffChainUUid = getIsUuid(projectId);

  // Fetch on-chain project
  const { data: projectRes, isFetching: isFetchingProject } = useQuery(
    getProjectQuery({
      request: {
        projectId: projectId as string,
      },
      enabled: !!projectId && isOnChainId && !!queryClient,
      client: queryClient,
    }),
  );

  // Fetch off-chain project by UUID or on-chain ID
  const { data: projectByOffChainIdRes, isFetching: isFetchingProjectById } =
    useQuery(
      getProjectByIdQuery({
        client: graphqlClient,
        languageCode: selectedLanguage,
        enabled: !!projectId && isOffChainUUid,
        id: projectId,
      }),
    );

  const {
    data: projectByOnChainIdRes,
    isFetching: isFetchingProjectByOnChainId,
  } = useQuery(
    getProjectByOnChainIdQuery({
      client: graphqlClient,
      enabled: !!projectId && isOnChainId,
      onChainId: projectId as string,
      languageCode: selectedLanguage,
    }),
  );

  const offChainProject = isOnChainId
    ? projectByOnChainIdRes?.data?.projectByOnChainId
    : projectByOffChainIdRes?.data?.projectById;

  const onChainProject = projectRes?.project;
  const { data: anchoredMetadata, isFetching: isFetchingMetadata } = useQuery(
    getMetadataQuery({
      iri: onChainProject?.metadata,
      enabled: !!onChainProject?.metadata && !!queryClient,
      client: queryClient,
      languageCode: selectedLanguage,
    }),
  );

  const {
    data: sanityCreditClassData,
    isFetching: isFetchingSanityCreditClasses,
  } = useQuery(
    getAllSanityCreditClassesQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  const { creditClass, creditClassVersion } =
    parseOffChainProject(offChainProject);

  const project = {
    ...normalizeProjectWithMetadata({
      offChainProject,
      projectMetadata: anchoredMetadata as
        | AnchoredProjectMetadataLD
        | undefined,
      projectPageMetadata: offChainProject?.metadata,
      sanityClass: findSanityCreditClass({
        sanityCreditClassData,
        creditClassIdOrUrl:
          creditClass?.onChainId ??
          creditClassVersion?.metadata?.['schema:url'] ??
          onChainProject?.id?.split('-')?.[0],
      }),
    }),
    id: projectId as string,
  };

  const isLoading =
    isFetchingProject ||
    isFetchingProjectById ||
    isFetchingMetadata ||
    isFetchingProjectByOnChainId ||
    isFetchingSanityCreditClasses;

  return { project, onChainProject, offChainProject, isLoading };
};
