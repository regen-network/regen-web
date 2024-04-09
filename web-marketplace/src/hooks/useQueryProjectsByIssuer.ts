import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQueries, useQuery } from '@tanstack/react-query';

import { getProjectsByClassQuery } from 'lib/queries/react-query/ecocredit/getProjectsByClass/getProjectsByClassQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getClassesByIssuerQuery } from 'lib/queries/react-query/registry-server/graphql/indexer/getClassesByIssuer/getClassesByIssuer';

import { useLedger } from '../ledger';
import type { ProjectWithMetadataObj as Project } from '../types/ledger/ecocredit';

export default function useQueryProjectsByIssuer(issuer: string): Project[] {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { ecocreditClient, dataClient } = useLedger();

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
          enabled: !!classId && !!ecocreditClient,
          client: ecocreditClient,
          request: { classId },
        }),
      ) || [],
  });
  const projects = projectsResults
    .map(res => {
      return res.data?.projects;
    })
    .flat();

  const projectsMetadatasResults = useQueries({
    queries: projects.map(project =>
      getMetadataQuery({
        iri: project?.metadata,
        dataClient,
        enabled: !!dataClient,
      }),
    ),
  });
  const projectsMetadata = projectsMetadatasResults.map(
    queryResult => queryResult.data,
  );

  return projects.map((project, i) => ({
    ...(project as ProjectInfo),
    metadata: projectsMetadata[i],
  }));
}
