import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import {
  AllCreditClassQuery,
  AllPrefinanceProjectQuery,
} from 'generated/sanity-graphql';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { IS_TERRASOS } from 'lib/env';
import { normalizeProjectWithMetadata } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { getAllProjectsQuery } from 'lib/queries/react-query/registry-server/graphql/getAllProjectsQuery/getAllProjectsQuery';

import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

type Props = {
  sanityCreditClassesData?: AllCreditClassQuery;
  enabled?: boolean;
  prefinanceProjectsData?: AllPrefinanceProjectQuery;
};

export const useFetchAllOffChainProjects = ({
  sanityCreditClassesData,
  enabled = true,
  prefinanceProjectsData,
}: Props) => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const { data, isFetching } = useQuery(
    getAllProjectsQuery({
      client: graphqlClient,
      enabled,
      languageCode: selectedLanguage,
    }),
  );
  const allProjectsData = data?.data;
  const englishProjectsMetadata = data?.englishProjectsMetadata;

  const onlyOffChainProjectsWithData =
    allProjectsData?.allProjects?.nodes?.map(project => {
      const prefinanceProject = prefinanceProjectsData?.allProject?.find(
        sanityProject =>
          sanityProject.projectId === project?.id ||
          sanityProject.projectId === project?.slug,
      );
      return {
        onChainId: project?.onChainId,
        offChain: !project?.onChainId,
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
          projectPrefinancing: prefinanceProject?.projectPrefinancing,
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

  const onlyOffChainProjectsWithDataFilteredByType =
    onlyOffChainProjectsWithData.filter(project => {
      return IS_TERRASOS ? project.type === 'TerrasosProjectInfo' : true;
    });

  return {
    allOffChainProjects: onlyOffChainProjectsWithDataFilteredByType,
    isAllOffChainProjectsLoading: isFetching,
  };
};
