import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { makeClient } from 'app/makeApolloClient';

import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getProjectByIdQuery as getOffChainProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { getProjectBySlugQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectBySlugQuery/getProjectBySlugQuery';

import { ProjectDetails } from 'components/templates/ProjectDetails';
import {
  getIsOnChainId,
  getIsUuid,
} from 'components/templates/ProjectDetails/ProjectDetails.utils';

interface ProjectPageProps {
  params: { id: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const isOnChainId = getIsOnChainId(id);
  const isOffChainUuid = getIsUuid(id);

  const queryClient = new QueryClient();
  const apolloClient = makeClient(queryClient);

  // if (isOnChainId) {
  //   await queryClient.prefetchQuery(
  //     getProjectByOnChainIdQuery({
  //       client: apolloClient,
  //       onChainId: id,
  //       languageCode: 'en',
  //     }),
  //   );
  // } else if (isOffChainUuid)
  //   await queryClient.prefetchQuery(
  //     getOffChainProjectByIdQuery({
  //       client: apolloClient,
  //       id,
  //       languageCode: 'en',
  //     }),
  //   );
  // else {
  const res = await queryClient.fetchQuery(
    getProjectBySlugQuery({
      client: apolloClient,
      slug: id,
      languageCode: 'en',
    }),
  );
  console.log('res', res);
  // }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectDetails />
    </HydrationBoundary>
  );
}
