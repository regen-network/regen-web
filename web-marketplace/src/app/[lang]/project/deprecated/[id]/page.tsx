import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getSanityClient } from 'app/ApolloClient';
import { notFound, redirect } from 'next/navigation';

import { isBridgeClassIdPrefix } from 'lib/bridge';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { getAllProjectPageQuery } from 'lib/queries/react-query/sanity/getAllProjectPageQuery/getAllProjectPageQuery';

import { ProjectDetails } from 'components/templates/ProjectDetails';

import { getProject, ProjectPageProps } from '../../[id]/page';

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id, lang } = await params;

  const { projectMetadata, projectPageMetadata, onChainProjectId } =
    await getProject(id, lang);
  if (onChainProjectId && !isBridgeClassIdPrefix(onChainProjectId)) {
    return;
  }
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
  const { rpcQueryClient, queryClient, onChainProjectId, slug } =
    await getProject(id, lang);
  if (!onChainProjectId || !isBridgeClassIdPrefix(onChainProjectId)) {
    notFound();
  }
  if (slug) {
    redirect(`/${lang}/project/deprecated/${slug}`);
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
