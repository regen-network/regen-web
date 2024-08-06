import { useCallback } from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { OrderBy } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import {
  MsgAnchor,
  MsgAttest,
} from '@regen-network/api/lib/generated/regen/data/v1/tx';
import { ContentHash_Graph } from '@regen-network/api/lib/generated/regen/data/v1/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { useLedger } from 'ledger';
import { errorCodeAtom } from 'lib/atoms/error.atoms';
import {
  errorModalAtom,
  processingModalAtom,
  txSuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import { messageActionEquals } from 'lib/ecocredit/constants';
import { getGetTxsEventQuery } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery';
import { getTxsEventQueryKey } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

import { useMsgClient } from 'hooks';

import {
  POST_CREATED,
  POST_CREATED_SIGNING_FAILED,
  VIEW_POST,
} from '../PostFlow.constants';
import { getSuccessModalContent } from '../PostFlow.utils';
import {
  FetchMsgAnchorParams,
  UseFetchMsgAnchorParams,
} from './useFetchMsgAnchor';

type UseSignParams = UseFetchMsgAnchorParams;
type SignParams = {
  contentHash: ContentHash_Graph;
} & FetchMsgAnchorParams;

export const useSign = ({
  projectSlug,
  projectId,
  offChainProjectId,
  projectName,
}: UseSignParams) => {
  const { _ } = useLingui();

  const { txClient } = useLedger();
  const { wallet } = useWallet();
  const { refetch } = useQuery(
    getGetTxsEventQuery({
      client: txClient,
      enabled: false,
      request: {
        events: [`${messageActionEquals}'/${MsgAnchor.$type}'`],
        orderBy: OrderBy.ORDER_BY_DESC,
        pagination: { limit: 1 },
      },
    }),
  );

  const setTxSuccessfulModalAtom = useSetAtom(txSuccessfulModalAtom);
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const setErrorCodeAtom = useSetAtom(errorCodeAtom);
  const setErrorModalAtom = useSetAtom(errorModalAtom);

  const { signAndBroadcast } = useMsgClient();
  const reactQueryClient = useQueryClient();

  const sign = useCallback(
    async ({ contentHash, iri, createdPostData }: SignParams) => {
      await signAndBroadcast(
        {
          msgs: [
            MsgAttest.fromPartial({
              attestor: wallet?.address,
              contentHashes: [contentHash],
            }),
          ],
        },
        (): void => {
          setProcessingModalAtom(atom => void (atom.open = true));
        },
        {
          onError: async (error?: Error) => {
            const { data: anchorTxsData } = await refetch();
            const txResponses = anchorTxsData?.txResponses?.filter(
              txRes => iri && txRes.rawLog.includes(iri),
            );
            const anchorTxHash = txResponses?.[0]?.txhash;

            setProcessingModalAtom(atom => void (atom.open = false));
            const { cardItems, buttonLink } = getSuccessModalContent({
              createdPostData,
              projectSlug,
              projectId,
              offChainProjectId,
              projectName,
              anchorTxHash,
              signingFailed: true,
            });
            setTxSuccessfulModalAtom(atom => {
              atom.open = true;
              atom.cardItems = cardItems;
              atom.title = _(msg`${POST_CREATED_SIGNING_FAILED}`);
              atom.cardTitle = _(msg`Attest`);
              atom.buttonTitle = _(msg`${VIEW_POST}`);
              atom.buttonLink = buttonLink;
              atom.txHash = undefined;
            });
          },
          onSuccess: async (deliverTxResponse?: DeliverTxResponse) => {
            const { data: anchorTxsData } = await refetch();
            const txResponses = anchorTxsData?.txResponses?.filter(
              txRes => iri && txRes.rawLog.includes(iri),
            );
            const anchorTxHash = txResponses?.[0]?.txhash;

            await reactQueryClient.invalidateQueries({
              queryKey: getTxsEventQueryKey({
                request: {
                  events: [`${messageActionEquals}'/${MsgAttest.$type}'`],
                  orderBy: OrderBy.ORDER_BY_DESC,
                },
              }),
            });

            setProcessingModalAtom(atom => void (atom.open = false));

            const { cardItems, buttonLink } = getSuccessModalContent({
              createdPostData,
              projectSlug,
              projectId,
              offChainProjectId,
              projectName,
              anchorTxHash: anchorTxHash ?? deliverTxResponse?.transactionHash,
              attestTxHash: deliverTxResponse?.transactionHash,
            });
            setTxSuccessfulModalAtom(atom => {
              atom.open = true;
              atom.cardItems = cardItems;
              atom.title = _(msg`${POST_CREATED}`);
              atom.cardTitle = _(msg`Attest`);
              atom.buttonTitle = _(msg`${VIEW_POST}`);
              atom.buttonLink = buttonLink;
              atom.txHash = undefined;
            });
          },
        },
      );
    },
    [
      _,
      offChainProjectId,
      projectId,
      projectName,
      projectSlug,
      reactQueryClient,
      refetch,
      setErrorCodeAtom,
      setErrorModalAtom,
      setProcessingModalAtom,
      setTxSuccessfulModalAtom,
      signAndBroadcast,
      wallet?.address,
    ],
  );

  return sign;
};
