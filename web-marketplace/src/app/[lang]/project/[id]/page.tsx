import { cache } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getClient, getSanityClient } from 'app/ApolloClient';
import { getRPCQueryClient } from 'app/makeRPCQueryClient';
import { redirect } from 'next/navigation';

import { Maybe, ProjectFieldsFragment } from 'generated/graphql';
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
  params: Promise<{ id: string; lang: string }>;
}

const getProject = cache(async (id: string, lang: string) => {
  try {
    const isOnChainId = getIsOnChainId(id);
    const isOffChainUuid = getIsUuid(id);
    let onChainProjectId: Maybe<string> | undefined;
    let offChainProject: Maybe<ProjectFieldsFragment> | undefined;
    let slug: Maybe<string> | undefined;

    const queryClient = new QueryClient();
    const apolloClient = await getClient();
    const rpcQueryClient = await getRPCQueryClient();
    if (isOnChainId) {
      const offChainProjectByIdData = await queryClient.fetchQuery(
        getProjectByOnChainIdQuery({
          client: apolloClient,
          onChainId: id,
          languageCode: lang,
        }),
      );
      onChainProjectId = id;
      offChainProject = offChainProjectByIdData?.data?.projectByOnChainId;
      slug = offChainProject?.slug;
    } else if (isOffChainUuid) {
      const offChainProjectByIdData = await queryClient.fetchQuery(
        getOffChainProjectByIdQuery({
          client: apolloClient,
          id,
          languageCode: lang,
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
          languageCode: lang,
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
        languageCode: lang,
      }),
    );

    return {
      projectMetadata: metadataResponse,
      projectPageMetadata: offChainProject?.metadata,
      slug,
      rpcQueryClient,
      queryClient,
    };
  } catch (error) {
    throw error;
  }
});

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id, lang } = await params;

  const { projectMetadata, projectPageMetadata } = await getProject(id, lang);
  const title =
    projectMetadata?.['schema:name'] || projectPageMetadata?.['schema:name'];
  const description = projectPageMetadata?.['schema:description'];
  const image =
    projectPageMetadata?.['schema:image'] ||
    projectPageMetadata?.['regen:previewPhoto']?.['schema:url'];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [new URL(image)] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id, lang } = await params;

  const sanityClient = await getSanityClient();
  const { rpcQueryClient, queryClient, slug } = await getProject(id, lang);
  if (slug) {
    redirect(`/${lang}/project/${slug}`);
  }

  queryClient.prefetchQuery(
    getAllProjectPageQuery({
      sanityClient: sanityClient,
      languageCode: lang,
    }),
  );

  queryClient.prefetchQuery(
    getAllSanityCreditClassesQuery({
      sanityClient: sanityClient,
      languageCode: lang,
    }),
  );

  if (rpcQueryClient)
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

