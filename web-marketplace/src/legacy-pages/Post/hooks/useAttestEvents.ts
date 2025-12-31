import { useCallback, useMemo } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { OrderBy } from '@regen-network/api/cosmos/tx/v1beta1/service';
import {
  MsgAnchor as MsgAnchorV1,
  MsgAttest as MsgAttestV1,
} from '@regen-network/api/regen/data/v1/tx';
import {
  EventAnchor,
  EventAttest,
} from '@regen-network/api/regen/data/v2/events';
import {
  MsgAnchor as MsgAnchorV2,
  MsgAttest as MsgAttestV2,
} from '@regen-network/api/regen/data/v2/tx';
import { useQueries, useQuery } from '@tanstack/react-query';
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx';
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
import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { messageActionEquals } from 'lib/ecocredit/constants';
import { getGetTxsEventQuery } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery';
import { GetTxsEventQueryResponse } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery.types';
import { getAccountByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';
import { getOrganizationByDaoAddressQuery } from 'lib/queries/react-query/registry-server/graphql/getOrganizationByDaoAddressQuery/getOrganizationByDaoAddressQuery';

import postCreated from '../../../../public/svg/post-created.svg';
import postSigned from '../../../../public/svg/post-signed.svg';
import { ADMIN, REGISTRY } from '../Post.constants';
import { matchesIri } from './useAttestEvents.utils';

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
  const { queryClient } = useLedger();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const {
    data: anchorV1TxsEventData,
    isLoading: isLoadingAnchorV1TxsEventData,
  } = useQuery(
    getGetTxsEventQuery({
      client: queryClient,
      enabled: !!queryClient && !onlyAttestEvents,
      request: {
        query: `${messageActionEquals}'${MsgAnchorV1.typeUrl}'`,
        orderBy: OrderBy.ORDER_BY_DESC,
      },
    }),
  );

  const {
    data: anchorV2TxsEventData,
    isLoading: isLoadingAnchorV2TxsEventData,
  } = useQuery(
    getGetTxsEventQuery({
      client: queryClient,
      enabled: !!queryClient && !onlyAttestEvents,
      request: {
        query: `${messageActionEquals}'${MsgAnchorV2.typeUrl}'`,
        orderBy: OrderBy.ORDER_BY_DESC,
      },
    }),
  );

  const {
    data: attestV1TxsEventData,
    isLoading: isLoadingAttestV1TxsEventData,
  } = useQuery(
    getGetTxsEventQuery({
      client: queryClient,
      enabled: !!queryClient,
      request: {
        query: `${messageActionEquals}'${MsgAttestV1.typeUrl}'`,
        orderBy: OrderBy.ORDER_BY_DESC,
      },
    }),
  );

  const {
    data: attestV2TxsEventData,
    isLoading: isLoadingAttestV2TxsEventData,
  } = useQuery(
    getGetTxsEventQuery({
      client: queryClient,
      enabled: !!queryClient,
      request: {
        query: `${messageActionEquals}'${MsgAttestV2.typeUrl}'`,
        orderBy: OrderBy.ORDER_BY_DESC,
      },
    }),
  );

  const anchorTxFromAnchorMsg = useMemo(
    () =>
      [
        ...(anchorV1TxsEventData?.txResponses ?? []),
        ...(anchorV2TxsEventData?.txResponses ?? []),
      ].filter(txRes => iri && matchesIri(txRes, iri))?.[0],
    [anchorV1TxsEventData, anchorV2TxsEventData, iri],
  );

  const attestTxsFromAttestMsg = useMemo(
    () =>
      [
        ...(attestV1TxsEventData?.txResponses ?? []),
        ...(attestV2TxsEventData?.txResponses ?? []),
      ].filter(txRes => iri && matchesIri(txRes, iri)),

    [attestV1TxsEventData, attestV2TxsEventData, iri],
  );

  const shouldStopMsgExecuteContractQuery = useCallback(
    () =>
      ({ txResponses = [] }: GetTxsEventQueryResponse): boolean => {
        if (!iri) return false;

        const hasAnchorEvent =
          onlyAttestEvents ||
          !!anchorTxFromAnchorMsg ||
          txResponses.some(
            txRes =>
              matchesIri(txRes, iri) &&
              txRes.events?.some(event =>
                EventAnchor.typeUrl.includes(event.type),
              ),
          );
        const hasAttestEvent = txResponses.some(
          txRes =>
            matchesIri(txRes, iri) &&
            txRes.events?.some(event =>
              EventAttest.typeUrl.includes(event.type),
            ),
        );

        return hasAnchorEvent && hasAttestEvent;
      },
    [iri, onlyAttestEvents, anchorTxFromAnchorMsg],
  );

  // If we haven't found both anchor and attest txs yet, keep querying MsgExecuteContract txs
  // in case the attest or anchor was done via a contract call
  const {
    data: msgExecuteContractTxsEventData,
    isLoading: isLoadingMsgExecuteContractTxsEventData,
  } = useQuery(
    getGetTxsEventQuery({
      client: queryClient,
      enabled:
        !!queryClient &&
        attestTxsFromAttestMsg.length === 0 &&
        !isLoadingAnchorV1TxsEventData &&
        !isLoadingAnchorV2TxsEventData &&
        !isLoadingAttestV1TxsEventData &&
        !isLoadingAttestV2TxsEventData,
      request: {
        query: `${messageActionEquals}'${MsgExecuteContract.typeUrl}'`,
        orderBy: OrderBy.ORDER_BY_DESC,
      },
      stopCondition: iri ? shouldStopMsgExecuteContractQuery() : undefined,
      stopConditionKey: iri
        ? `${iri}-${onlyAttestEvents ? 'attest-only' : 'anchor-attest'}`
        : undefined,
    }),
  );

  const msgExecuteContractTxsEventDataResponses = useMemo(
    () =>
      msgExecuteContractTxsEventData?.txResponses.filter(
        txRes => iri && matchesIri(txRes, iri),
      ),
    [msgExecuteContractTxsEventData, iri],
  );

  const anchorTx = useMemo(
    () =>
      anchorTxFromAnchorMsg ??
      msgExecuteContractTxsEventDataResponses?.filter(txRes =>
        txRes.events.find(event => EventAnchor.typeUrl.includes(event.type)),
      )?.[0] ??
      undefined,
    [msgExecuteContractTxsEventDataResponses, anchorTxFromAnchorMsg],
  );

  const attestMsgExecuteContractTxsEventData = useMemo(
    () =>
      msgExecuteContractTxsEventDataResponses?.filter(txRes =>
        txRes.events.find(event => EventAttest.typeUrl.includes(event.type)),
      ) ?? [],
    [msgExecuteContractTxsEventDataResponses],
  );

  const attestTxResponses = useMemo(
    () =>
      [
        ...(attestTxsFromAttestMsg ?? []),
        ...attestMsgExecuteContractTxsEventData,
      ]?.map(txRes => {
        const events = txRes.events.filter(event => {
          return EventAttest.typeUrl.includes(event.type);
        });
        const attestors = events.map(event => {
          const attributes = event.attributes
            .filter(attr => attr.key === 'attestor')
            .map(attr => attr.value);
          return attributes;
        });
        const attestor = attestors[0]?.[0]?.replace(/['"]+/g, '');
        const { timestamp, txhash } = txRes;

        return { timestamp, txhash, attestor };
      }),
    [attestMsgExecuteContractTxsEventData, attestTxsFromAttestMsg],
  );

  const attestorsAccountsResults = useQueries({
    queries:
      attestTxResponses?.map(txRes =>
        getAccountByAddrQuery({
          addr: txRes.attestor,
          client: graphqlClient,
          enabled: !!graphqlClient,
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
      attestTxResponses?.map(txRes =>
        getOrganizationByDaoAddressQuery({
          daoAddress: txRes.attestor,
          client: graphqlClient,
          enabled: !!graphqlClient,
        }),
      ) || [],
  });
  const attestorsOrgs = attestorsOrgsResults?.map(
    res => res.data?.organizationByDaoAddress,
  );
  const attestorsOrgsLoading = attestorsOrgsResults?.some(res => res.isLoading);

  const events: Array<Event> = [];

  // Adding the creation event
  const creatorTx = attestTxResponses?.find(
    txRes => txRes.attestor === creatorAccount?.addr,
  );
  if (creatorAccount && !onlyAttestEvents) {
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
          anchorTx?.timestamp || creatorTx?.timestamp,
          // eslint-disable-next-line lingui/no-unlocalized-strings
          'MMMM D, YYYY | h:mm A',
        ) || createdAt,
      txhash: anchorTx?.txhash || creatorTx?.txhash,
    });
  }

  // Adding attest events
  if (attestTxResponses) {
    for (let i = attestTxResponses.length - 1; i >= 0; i--) {
      const attestorAccount = attestorsAccounts?.find(
        acc => acc?.addr === attestTxResponses?.[i].attestor,
      );
      const attestorOrg = attestorsOrgs?.find(
        org => org?.daoAddress === attestTxResponses?.[i].attestor,
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
      events.unshift({
        icon: postSigned,
        label: _(msg`Signed by`),
        timestamp: formatDate(
          attestTxResponses[i].timestamp,
          // eslint-disable-next-line lingui/no-unlocalized-strings
          'MMMM D, YYYY | h:mm A',
        ),
        txhash: attestTxResponses[i].txhash,
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
    loading:
      isLoadingAnchorV1TxsEventData ||
      isLoadingAnchorV2TxsEventData ||
      isLoadingAttestV1TxsEventData ||
      isLoadingAttestV2TxsEventData ||
      isLoadingMsgExecuteContractTxsEventData ||
      attestorAccountsLoading ||
      attestorsOrgsLoading,
  };
};
