import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import {
  AllCreditClassQuery,
  AllProjectsQuery,
} from 'generated/sanity-graphql';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { IS_TERRASOS } from 'lib/env';
import { normalizeProjectWithMetadata } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { getAccountProjectsByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountProjectsByIdQuery/getAccountProjectsByIdQuery';
import { getAllProjectsQuery } from 'lib/queries/react-query/registry-server/graphql/getAllProjectsQuery/getAllProjectsQuery';

import {
  ADMIN_OFF_CHAIN_PROJECTS,
  OFF_CHAIN_PROJECTS,
} from 'components/templates/ProjectDetails/hooks/useMoreProjects.constants';
import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

type Props = {
  sanityCreditClassesData?: AllCreditClassQuery;
  enabled?: boolean;
  sanityProjectsData?: AllProjectsQuery;
  adminId?: string;
  limitOffChainProjects?: number;
  skippedProjectId?: string;
};

export const useOffChainProjects = ({
  sanityCreditClassesData,
  enabled = true,
  sanityProjectsData,
  adminId,
  limitOffChainProjects,
  skippedProjectId,
}: Props) => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  // Offchain only projects by admin
  const { data: accountData, isFetching: isAccountLoading } = useQuery(
    getAccountProjectsByIdQuery({
      id: adminId,
      condition: {
        id: { not: skippedProjectId },
        onChainId: null,
        published: true,
        approved: true,
      },
      client: graphqlClient,
      enabled: enabled && !!adminId,
      languageCode: selectedLanguage,
    }),
  );
  const offChainProjectsByAdmin =
    accountData?.data?.accountById?.projectsByAdminAccountId?.nodes;

  const enoughOffChainProjectsByAdmin =
    !!offChainProjectsByAdmin &&
    !!limitOffChainProjects &&
    offChainProjectsByAdmin.length >= limitOffChainProjects;

  const { data, isFetching } = useQuery(
    getAllProjectsQuery({
      client: graphqlClient,
      enabled: enabled && !enoughOffChainProjectsByAdmin,
      languageCode: selectedLanguage,
    }),
  );

  const allProjects = data?.data?.allProjects?.nodes;
  let projects =
    adminId && enoughOffChainProjectsByAdmin
      ? offChainProjectsByAdmin
      : allProjects;
  const englishProjectsMetadata =
    adminId && enoughOffChainProjectsByAdmin
      ? accountData?.englishProjectsMetadata
      : data?.englishProjectsMetadata;

  const offChainProjectsWithData =
    projects?.map(project => {
      const sanityProject = sanityProjectsData?.allProject?.find(
        sanityProject =>
          sanityProject.projectId === project?.id ||
          sanityProject.projectId === project?.slug,
      );
      const offChain = !project?.onChainId;
      return {
        adminOrder: offChain
          ? adminId && adminId === project?.adminAccountId
            ? ADMIN_OFF_CHAIN_PROJECTS
            : OFF_CHAIN_PROJECTS
          : undefined,
        onChainId: project?.onChainId,
        offChain,
        sellOrdersByProjectId: project?.sellOrdersByProjectId,
        ...normalizeProjectWithMetadata({
          offChainProject: project,
          projectMetadata: project?.metadata,
          projectPageMetadata: project?.metadata,
          programAccount:
            project?.creditClassByCreditClassId?.accountByRegistryId,
          sanityClass: findSanityCreditClass({
            sanityCreditClassData: sanityCreditClassesData,
            creditClassIdOrUrl:
              project?.creditClassByCreditClassId?.onChainId ??
              project?.metadata?.['regen:creditClassId'] ??
              '',
          }),
          projectPrefinancing: sanityProject?.projectPrefinancing,
        }),
        // We keep those values in english
        // so we can filter based on their value
        ecosystemType: englishProjectsMetadata?.[project?.id]?.[
          'regen:ecosystemType'
        ] as string[] | undefined,
        region: englishProjectsMetadata?.[project?.id]?.['regen:region'] as
          | string
          | undefined,
      };
    }) ?? [];

  const offChainProjectsWithDataFilteredByType =
    offChainProjectsWithData.filter(project => {
      return IS_TERRASOS ? project.type === 'TerrasosProjectInfo' : true;
    });

  return {
    allOffChainProjects: offChainProjectsWithDataFilteredByType,
    isAllOffChainProjectsLoading: isFetching || isAccountLoading,
  };
};
