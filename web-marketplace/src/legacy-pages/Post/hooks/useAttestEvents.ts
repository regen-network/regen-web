import { useMemo } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'legacy-pages/Dashboard/Dashboard.constants';
import { getDefaultAvatar } from 'legacy-pages/Dashboard/Dashboard.utils';
import { StaticImageData } from 'next/image';

import { User } from 'web-components/src/components/user/UserInfo';
import { formatDate } from 'web-components/src/utils/format';

import { AccountByIdQuery, AccountType } from 'generated/graphql';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { getAccountByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';
import { getOrganizationByDaoAddressQuery } from 'lib/queries/react-query/registry-server/graphql/getOrganizationByDaoAddressQuery/getOrganizationByDaoAddressQuery';
import { getAllDataEventsByIriQuery } from 'lib/queries/react-query/registry-server/graphql/indexer/getAllDataEventsByIri/getAllDataEventsByIri';

import postCreated from '../../../../public/svg/post-created.svg';
import postSigned from '../../../../public/svg/post-signed.svg';
import { ADMIN, REGISTRY } from '../Post.constants';

type Event = {
  icon: string | StaticImageData;
  label: string;
  user: User;
  timestamp: string;
  txhash?: string;
};

type UseAttestEventsParams = {
  iri?: string;
  creatorAccount: AccountByIdQuery['accountById'];
  creatorIsAdmin: boolean;
  registryAddr?: string | null;
  adminAddr?: string | null;
  createdAt: string;
  onlyAttestEvents?: boolean;
};

export const useAttestEvents = ({
  iri,
  creatorAccount,
  creatorIsAdmin,
  registryAddr,
  adminAddr,
  createdAt,
  onlyAttestEvents,
}: UseAttestEventsParams) => {
  const { _ } = useLingui();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { data, isLoading: isLoadingEvents } = useQuery(
    getAllDataEventsByIriQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!iri,
      iri: iri as string,
    }),
  );

  const dataEvents = useMemo(
    () => data?.data?.allUnifiedDataEvents?.nodes || [],
    [data],
  );
  const anchorEvent = useMemo(
    // eslint-disable-next-line lingui/no-unlocalized-strings
    () => dataEvents.filter(event => event?.eventType?.includes('EventAnchor')), // gets both v1 and v2 anchor events
    [dataEvents],
  )?.[0]; // there should be only one anchor event
  const attestEvents = useMemo(
    // eslint-disable-next-line lingui/no-unlocalized-strings
    () => dataEvents.filter(event => event?.eventType?.includes('EventAttest')), // gets both v1 and v2 attest events
    [dataEvents],
  );

  const attestorsAccountsResults = useQueries({
    queries:
      attestEvents?.map(event =>
        getAccountByAddrQuery({
          addr: event?.attestor as string,
          client: graphqlClient,
          enabled: !!graphqlClient && !!event?.attestor,
          languageCode: selectedLanguage,
        }),
      ) || [],
  });
  const attestorsAccounts = attestorsAccountsResults?.map(
    res => res.data?.accountByAddr,
  );
  const attestorAccountsLoading = attestorsAccountsResults?.some(
    res => res.isLoading,
  );

  const attestorsOrgsResults = useQueries({
    queries:
      attestEvents?.map(event =>
        getOrganizationByDaoAddressQuery({
          daoAddress: event?.attestor as string,
          client: graphqlClient,
          enabled: !!graphqlClient && !!event?.attestor,
        }),
      ) || [],
  });
  const attestorsOrgs = attestorsOrgsResults?.map(
    res => res.data?.organizationByDaoAddress,
  );
  const attestorsOrgsLoading = attestorsOrgsResults?.some(res => res.isLoading);

  const events: Array<Event> = [];

  // Adding the creation event
  if (
    creatorAccount &&
    !onlyAttestEvents &&
    anchorEvent &&
    anchorEvent.txHash &&
    anchorEvent.timestamp
  ) {
    events.push({
      icon: postCreated,
      label: _(msg`Created by`),
      user: {
        name: creatorAccount.name || _(DEFAULT_NAME),
        link: `/profiles/${creatorAccount.id}`,
        type: creatorAccount.type,
        image: creatorAccount.image || DEFAULT_PROFILE_USER_AVATAR,
        tag: creatorIsAdmin ? _(ADMIN) : undefined,
      },
      timestamp:
        formatDate(
          anchorEvent.timestamp,
          // eslint-disable-next-line lingui/no-unlocalized-strings
          'MMMM D, YYYY | h:mm A',
        ) || createdAt,
      txhash: anchorEvent.txHash,
    });
  }

  // Adding attest events
  if (attestEvents && attestEvents.length > 0) {
    for (let i = attestEvents.length - 1; i >= 0; i--) {
      const attestorAccount = attestorsAccounts?.find(
        acc => acc?.addr === attestEvents?.[i]?.attestor,
      );
      const attestorOrg = attestorsOrgs?.find(
        org => org?.daoAddress === attestEvents?.[i]?.attestor,
      );
      const attestorIsRegistry =
        (!!registryAddr &&
          !!attestorAccount?.addr &&
          attestorAccount?.addr === registryAddr) ||
        (!!attestorOrg?.daoAddress && attestorOrg?.daoAddress === registryAddr);

      const attestorIsAdmin =
        (!!adminAddr &&
          !!attestorAccount?.addr &&
          attestorAccount?.addr === adminAddr) ||
        (!!attestorOrg?.daoAddress && attestorOrg?.daoAddress === adminAddr);

      const account = attestorAccount || attestorOrg;
      const accountType = attestorAccount
        ? AccountType.User
        : attestorOrg
        ? AccountType.Organization
        : AccountType.User;

      const attestEvent = attestEvents[i];
      if (attestEvent && attestEvent.txHash && attestEvent.timestamp)
        events.unshift({
          icon: postSigned,
          label: _(msg`Signed by`),
          timestamp: formatDate(
            attestEvent.timestamp,
            // eslint-disable-next-line lingui/no-unlocalized-strings
            'MMMM D, YYYY | h:mm A',
          ),
          txhash: attestEvent.txHash,
          user: {
            name: account?.name || _(DEFAULT_NAME),
            link: account?.id ? `/profiles/${account?.id}` : undefined,
            type: accountType,
            image: getDefaultAvatar({ ...account, type: accountType }),
            tag: attestorIsAdmin
              ? _(ADMIN)
              : attestorIsRegistry
              ? _(REGISTRY)
              : undefined,
          },
        });
    }
  }
  return {
    events,
    loading: isLoadingEvents || attestorAccountsLoading || attestorsOrgsLoading,
  };
};
