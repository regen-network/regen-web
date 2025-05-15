import { useCallback } from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { regen } from '@regen-network/api';
import { OrderBy } from '@regen-network/api/cosmos/tx/v1beta1/service';
import { ContentHash_Graph } from '@regen-network/api/regen/data/v2/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { useLedger } from 'ledger';
import {
  processingModalAtom,
  txSuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import { messageActionEquals } from 'lib/ecocredit/constants';
import { getGetTxsEventQuery } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery';
import { getTxsEventQueryKey } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

import { useMsgClient } from 'hooks';

import {
  CREATE_DATA_POST,
  POST_CREATED,
  POST_CREATED_SIGNING_FAILED,
  VIEW_POST,
} from '../PostFlow.constants';
import {
  FetchMsgAnchorParams,
  UseFetchMsgAnchorParams,
} from './useFetchMsgAnchor';
import { useGetSuccessModalContent } from './useGetSuccessModalContent';

type UseSignParams = UseFetchMsgAnchorParams;
type SignParams = {
  contentHash: ContentHash_Graph;
} & FetchMsgAnchorParams;

export const useSign = ({
  projectSlug,
  projectId,
  offChainProjectId,
  projectName,
  onModalClose,
}: UseSignParams) => {
  const { _ } = useLingui();
  const getSuccessModalContent = useGetSuccessModalContent();

  const { queryClient } = useLedger();
  const { wallet } = useWallet();
  const { refetch } = useQuery(
    getGetTxsEventQuery({
      client: queryClient,
      enabled: false,
      request: {
        events: [`${messageActionEquals}'/regen.data.v1.MsgAnchor'`],
        orderBy: OrderBy.ORDER_BY_DESC,
        page: 1n,
        limit: 1n,
      },
    }),
  );

  const setTxSuccessfulModalAtom = useSetAtom(txSuccessfulModalAtom);
  const setProcessingModalAtom = useSetAtom(processingModalAtom);

  const { signAndBroadcast } = useMsgClient();
  const reactQueryClient = useQueryClient();

  const sign = useCallback(
    async ({ contentHash, iri, createdPostData }: SignParams) => {
      await signAndBroadcast(
        {
          msgs: [
            regen.data.v1.MessageComposer.withTypeUrl.attest({
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
              signingError: String(error),
            });
            setTxSuccessfulModalAtom(atom => {
              atom.open = true;
              atom.cardItems = cardItems;
              atom.title = _(POST_CREATED_SIGNING_FAILED);
              atom.cardTitle = _(msg`Attest`);
              atom.buttonTitle = _(VIEW_POST);
              atom.buttonLink = buttonLink;
              atom.txHash = undefined;
            });
            onModalClose();
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
                  events: [`${messageActionEquals}'/regen.data.v1.MsgAttest'`],
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
              atom.title = _(POST_CREATED);
              atom.cardTitle = _(CREATE_DATA_POST);
              atom.buttonTitle = _(VIEW_POST);
              atom.buttonLink = buttonLink;
              atom.txHash = undefined;
            });
            onModalClose();
          },
        },
      );
    },
    [
      _,
      getSuccessModalContent,
      offChainProjectId,
      onModalClose,
      projectId,
      projectName,
      projectSlug,
      reactQueryClient,
      refetch,
      setProcessingModalAtom,
      setTxSuccessfulModalAtom,
      signAndBroadcast,
      wallet?.address,
    ],
  );

  return sign;
};
