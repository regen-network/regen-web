import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { makeClient } from 'app/makeApolloClient';

import { apiUri } from 'lib/apiUri';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
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

export async function makeServerClient() {
  const resp = await fetch(`${apiUri}/marketplace/v1/csrfToken`, {
    method: 'GET',
    credentials: 'include',
  });
  const csrfCookie = resp.headers.get('set-cookie');
  const { token: csrfToken } = await resp.json();

  const httpLink = new HttpLink({
    uri: `${apiUri}/marketplace/v1/graphql`,
    headers: {
      'X-CSRF-TOKEN': csrfToken,
      Cookie: csrfCookie ?? '', // pass along the CSRF cookie manually
      'Content-Type': 'application/json',
    },
    credentials: 'include', // required if your backend checks for cookie presence
    fetch,
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const isOnChainId = getIsOnChainId(id);
  const isOffChainUuid = getIsUuid(id);

  const queryClient = new QueryClient();
  const apolloClient = await makeServerClient();

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
      <div>{id}</div>
      <ProjectDetails />
    </HydrationBoundary>
  );
}
