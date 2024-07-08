import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { OrderBy } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import { EventAttest } from '@regen-network/api/lib/generated/regen/data/v1/events';
import { MsgAttest } from '@regen-network/api/lib/generated/regen/data/v1/tx';
import { useQueries, useQuery } from '@tanstack/react-query';

import { SIGNED_BY } from 'web-components/src/components/cards/PostCard/PostCard.constants';
import { User } from 'web-components/src/components/user/UserInfo';
import { formatDate } from 'web-components/src/utils/format';

import { AccountByIdQuery } from 'generated/graphql';
import { useLedger } from 'ledger';
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
  createdAt: string;
  onlyAttestEvents?: boolean;
};

export const useAttestEvents = ({
  iri,
  creatorAccount,
  creatorIsAdmin,
  registryAddr,
  createdAt,
  onlyAttestEvents,
}: UseAttestEventsParams) => {
  const { txClient } = useLedger();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { data: txsEventData } = useQuery(
    getGetTxsEventQuery({
      client: txClient,
      enabled: !!txClient,
      request: {
        events: [`${messageActionEquals}'/${MsgAttest.$type}'`],
        orderBy: OrderBy.ORDER_BY_DESC,
      },
    }),
  );

  let txResponses:
    | {
        timestamp: string;
        txhash: string;
        attestor: string;
      }[]
    | undefined;
  if (iri) {
    txResponses = txsEventData?.txResponses
      ?.filter(txRes => txRes.rawLog.includes(iri))
      ?.map(txRes => {
        const events = txRes.logs[0].events.filter(event => {
          return event.type.includes(EventAttest.$type);
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
      txResponses?.map(txRes =>
        getAccountByAddrQuery({
          addr: txRes.attestor,
          client: graphqlClient,
          enabled:
            (!creatorAccount?.addr ||
              creatorAccount?.addr !== txRes.attestor) &&
            !!graphqlClient,
        }),
      ) || [],
  });
  const attestorsAccounts = attestorsAccountsResults?.map(
    (res, i) => res.data?.accountByAddr,
  );

  const events: Array<Event> = [];

  // Adding the creation (optionnally signed) event
  const creatorTx = txResponses?.find(
    txRes => txRes.attestor === creatorAccount?.addr,
  );
  if (creatorAccount && !onlyAttestEvents) {
    events.push({
      icon: '/svg/post-created.svg',
      label: `Created ${creatorTx ? 'and signed' : ''} by`,
      user: {
        name: creatorAccount.name || DEFAULT_NAME,
        link: `/profiles/${creatorAccount.id}`,
        type: creatorAccount.type,
        image: creatorAccount.image || getDefaultAvatar(creatorAccount),
        tag: creatorIsAdmin ? ADMIN : undefined,
      },
      timestamp: createdAt,
      txhash: creatorTx?.txhash,
    });
  }

  // Adding attest events
  if (txResponses) {
    for (let i = txResponses.length - 1; i >= 0; i--) {
      if (
        !creatorAccount?.addr ||
        txResponses[i].attestor !== creatorAccount?.addr
      ) {
        const attestorAccount = attestorsAccounts?.find(
          acc => acc?.addr === txResponses?.[i].attestor,
        );
        const attestorIsRegistry =
          !!registryAddr &&
          !!attestorAccount?.addr &&
          attestorAccount?.addr === registryAddr;
        events.unshift({
          icon: '/svg/post-signed.svg',
          label: SIGNED_BY,
          timestamp: formatDate(
            txResponses[i].timestamp,
            'MMMM D, YYYY | h:mm A',
          ),
          txhash: txResponses[i].txhash,
          user: {
            name: attestorAccount?.name || DEFAULT_NAME,
            link: attestorAccount?.id
              ? `/profiles/${attestorAccount?.id}`
              : undefined,
            type: attestorAccount?.type ?? 'USER',
            image: attestorAccount?.image || getDefaultAvatar(attestorAccount),
            tag: attestorIsRegistry ? REGISTRY : undefined,
          },
        });
      }
    }
  }
  return { events };
};
