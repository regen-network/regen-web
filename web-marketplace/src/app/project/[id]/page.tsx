import { cache } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getClient, getSanityClient } from 'app/ApolloClient';
import { getRPCQueryClient } from 'app/makeRPCQueryClient';
import { redirect } from 'next/navigation';

import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getProjectByIdQuery as getOffChainProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { getProjectBySlugQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectBySlugQuery/getProjectBySlugQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { getAllProjectPageQuery } from 'lib/queries/react-query/sanity/getAllProjectPageQuery/getAllProjectPageQuery';

import { ProjectDetails } from 'components/templates/ProjectDetails';
import {
  getIsOnChainId,
  getIsUuid,
} from 'components/templates/ProjectDetails/ProjectDetails.utils';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

// getProject will be used twice, but execute only once
const getProject = cache(async (id: string) => {
  const isOnChainId = getIsOnChainId(id);
  const isOffChainUuid = getIsUuid(id);

  const queryClient = new QueryClient();
  const apolloClient = await getClient();
  const rpcQueryClient = await getRPCQueryClient();

  let onChainProjectId;
  let offChainProject;
  let slug;
  if (isOnChainId) {
    const offChainProjectByIdData = await queryClient.fetchQuery(
      getProjectByOnChainIdQuery({
        client: apolloClient,
        onChainId: id,
        languageCode: 'en', // TODO get language code
      }),
    );
    onChainProjectId = isOnChainId;
    offChainProject = offChainProjectByIdData?.data?.projectByOnChainId;
    slug = offChainProject?.slug;
  } else if (isOffChainUuid) {
    const offChainProjectByIdData = await queryClient.fetchQuery(
      getOffChainProjectByIdQuery({
        client: apolloClient,
        id,
        languageCode: 'en',
      }),
    );
    offChainProject = offChainProjectByIdData?.data?.projectById;
    onChainProjectId = offChainProject?.onChainId;
    slug = offChainProject?.slug;
  } else {
    const projectBySlug = await queryClient.fetchQuery(
      getProjectBySlugQuery({
        client: apolloClient,
        slug: id,
        languageCode: 'en',
      }),
    );
    offChainProject = projectBySlug?.data.projectBySlug;
    onChainProjectId = offChainProject?.onChainId;
  }

  const projectResponse = await queryClient.fetchQuery(
    getProjectQuery({
      request: { projectId: onChainProjectId as string },
      client: rpcQueryClient,
      enabled: !!rpcQueryClient && !!onChainProjectId,
    }),
  );
  const onChainProject = projectResponse?.project;

  const metadataResponse = await queryClient.fetchQuery(
    getMetadataQuery({
      iri: onChainProject?.metadata,
      client: rpcQueryClient,
      enabled: !!rpcQueryClient,
      languageCode: 'en',
    }),
  );

  return {
    projectMetadata: metadataResponse,
    projectPageMetadata: offChainProject?.metadata,
    slug,
    rpcQueryClient,
    queryClient,
  };
});

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;

  const { projectMetadata, projectPageMetadata } = await getProject(id);

  const title =
    projectMetadata?.['schema:name'] || projectPageMetadata?.['schema:name'];
  const description = 'TODO';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      // images: [
      //   new URL(
      //     projectPageMetadata?.['schema:image'] ||
      //       projectPageMetadata?.['regen:previewPhoto']?.['schema:url'],
      //   ),
      // ],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  const sanityClient = await getSanityClient();
  const { rpcQueryClient, queryClient, slug } = await getProject(id);
  if (slug) {
    // TODO preserve hash it exists
    redirect(`/project/${slug}`);
  }

  // https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#streaming-with-server-components
  queryClient.prefetchQuery(
    getAllProjectPageQuery({
      sanityClient: sanityClient,
      languageCode: 'en',
    }),
  );

  queryClient.prefetchQuery(
    getAllSanityCreditClassesQuery({
      sanityClient: sanityClient,
      languageCode: 'en',
    }),
  );

  queryClient.prefetchQuery(
    getSellOrdersExtendedQuery({
      client: rpcQueryClient,
      reactQueryClient: queryClient,
      request: {},
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectDetails />
    </HydrationBoundary>
  );
}
