import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { ProjectInfo } from '@regen-network/api/regen/ecocredit/v1/query';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { getProjectsByClassQuery } from 'lib/queries/react-query/ecocredit/getProjectsByClass/getProjectsByClassQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getClassesByIssuerQuery } from 'lib/queries/react-query/registry-server/graphql/indexer/getClassesByIssuer/getClassesByIssuer';

import { useLedger } from '../ledger';
import type { ProjectWithMetadataObj as Project } from '../types/ledger/ecocredit';

export default function useQueryProjectsByIssuer(issuer?: string): Project[] {
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { queryClient } = useLedger();

  const { data: classesByIssuerData } = useQuery(
    getClassesByIssuerQuery({
      enabled: !!issuer && !!graphqlClient,
      client: graphqlClient,
      issuer,
    }),
  );
  const classIds = classesByIssuerData?.data?.allClassIssuers?.nodes?.map(
    n => n?.classId,
  );

  const projectsResults = useQueries({
    queries:
      classIds?.map(classId =>
        getProjectsByClassQuery({
          enabled: !!classId && !!queryClient,
          client: queryClient,
          request: { classId: classId as string },
        }),
      ) || [],
  });

  const projects = projectsResults
    .map(res => {
      return res.data?.projects;
    })
    .flat();
  const projectsLoading = projectsResults.some(res => res.isLoading);

  const projectsMetadatasResults = useQueries({
    queries: projects.map(project =>
      getMetadataQuery({
        iri: project?.metadata,
        client: queryClient,
        enabled: !!queryClient,
        languageCode: selectedLanguage,
      }),
    ),
  });
  const projectsMetadata = projectsMetadatasResults.map(
    queryResult => queryResult.data,
  );

  return projectsLoading
    ? []
    : projects.map((project, i) => ({
        ...(project as ProjectInfo),
        metadata: projectsMetadata[i],
      }));
}
