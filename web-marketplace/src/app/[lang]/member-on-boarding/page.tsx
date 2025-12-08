import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getClient } from 'app/ApolloClient';

import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';

import { MemberOnBoarding } from 'components/organisms/MemberOnBoarding/MemberOnBoarding';

import { findDao } from './utils';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { lang } = await params;
  const _searchParams = await searchParams;
  const { accountId, email, role, daoAddress } = _searchParams;
  const queryClient = new QueryClient();
  const apolloClient = await getClient();

  if (
    !accountId ||
    typeof accountId !== 'string' ||
    !email ||
    typeof email !== 'string' ||
    !role ||
    typeof role !== 'string' ||
    !daoAddress ||
    typeof daoAddress !== 'string'
  ) {
    return null;
  }

  // Double check account with given accountId is part of the DAO membership
  const accountResponse = await queryClient.fetchQuery(
    getAccountByIdQuery({
      client: apolloClient,
      languageCode: lang,
      id: accountId,
      enabled: !!accountId,
    }),
  );

  const dao = findDao(daoAddress, accountResponse);

  if (!dao) {
    return null;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="bg-bc-neutral-100 min-h-screen border-bc-neutral-300 border-solid border-0 border-t pt-50">
        <MemberOnBoarding
          accountId={accountId}
          role={role}
          email={email}
          daoAddress={daoAddress}
        />
      </div>
    </HydrationBoundary>
  );
}
