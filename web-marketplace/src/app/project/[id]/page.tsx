import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { ProjectDetails } from 'components/templates/ProjectDetails';

interface ProjectPageProps {
  params: { id: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ['posts'],
  //   queryFn: getPosts,
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectDetails />
    </HydrationBoundary>
  );
}
