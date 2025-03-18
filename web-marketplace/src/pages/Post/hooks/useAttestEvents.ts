import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { TxResponse } from '@regen-network/api/cosmos/base/abci/v1beta1/abci';
import { OrderBy } from '@regen-network/api/cosmos/tx/v1beta1/service';
import { EventAttest } from '@regen-network/api/regen/data/v2/events';
import { MsgAnchor, MsgAttest } from '@regen-network/api/regen/data/v2/tx';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { User } from 'web-components/src/components/user/UserInfo';
import { formatDate } from 'web-components/src/utils/format';

import { AccountByIdQuery } from 'generated/graphql';
import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { messageActionEquals } from 'lib/ecocredit/constants';
import { getGetTxsEventQuery } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery';
import { getAccountByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';

import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';

import { ADMIN, REGISTRY } from '../Post.constants';

type Event = {
  icon: string;
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

  const { data: anchorTxsEventData } = useQuery(
    getGetTxsEventQuery({
      client: queryClient,
      enabled: !!queryClient && !onlyAttestEvents,
      request: {
        events: [`${messageActionEquals}'${MsgAnchor.typeUrl}'`],
        orderBy: OrderBy.ORDER_BY_DESC,
      },
    }),
  );

  const { data: attestTxsEventData } = useQuery(
    getGetTxsEventQuery({
      client: queryClient,
      enabled: !!queryClient,
      request: {
        events: [`${messageActionEquals}'${MsgAttest.typeUrl}'`],
        orderBy: OrderBy.ORDER_BY_DESC,
      },
    }),
  );

  let anchorTx: TxResponse | undefined;
  let attestTxResponses:
    | {
        timestamp: string;
        txhash: string;
        attestor: string;
      }[]
    | undefined;
  if (iri) {
    anchorTx = anchorTxsEventData?.txResponses?.filter(txRes =>
      txRes.rawLog.includes(iri),
    )?.[0];

    attestTxResponses = attestTxsEventData?.txResponses
      ?.filter(txRes => txRes.rawLog.includes(iri))
      ?.map(txRes => {
        const events = txRes.logs[0].events.filter(event => {
          return event.type.includes(EventAttest.typeUrl);
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
      });
  }

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
    (res, i) => res.data?.accountByAddr,
  );

  const events: Array<Event> = [];

  // Adding the creation event
  const creatorTx = attestTxResponses?.find(
    txRes => txRes.attestor === creatorAccount?.addr,
  );
  if (creatorAccount && !onlyAttestEvents) {
    events.push({
      icon: '/svg/post-created.svg',
      label: _(msg`Created by`),
      user: {
        name: creatorAccount.name || _(DEFAULT_NAME),
        link: `/profiles/${creatorAccount.id}`,
        type: creatorAccount.type,
        image: creatorAccount.image || getDefaultAvatar(creatorAccount),
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
      const attestorIsRegistry =
        !!registryAddr &&
        !!attestorAccount?.addr &&
        attestorAccount?.addr === registryAddr;

      const attestorIsAdmin =
        !!adminAddr &&
        !!attestorAccount?.addr &&
        attestorAccount?.addr === adminAddr;

      events.unshift({
        icon: '/svg/post-signed.svg',
        label: _(msg`Signed by`),
        timestamp: formatDate(
          attestTxResponses[i].timestamp,
          // eslint-disable-next-line lingui/no-unlocalized-strings
          'MMMM D, YYYY | h:mm A',
        ),
        txhash: attestTxResponses[i].txhash,
        user: {
          name: attestorAccount?.name || _(DEFAULT_NAME),
          link: attestorAccount?.id
            ? `/profiles/${attestorAccount?.id}`
            : undefined,
          type: attestorAccount?.type ?? 'USER',
          image: attestorAccount?.image || getDefaultAvatar(attestorAccount),
          tag: attestorIsAdmin
            ? _(ADMIN)
            : attestorIsRegistry
            ? _(REGISTRY)
            : undefined,
        },
      });
    }
  }
  return { events };
};
