import { useCallback } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { TxResponse } from '@regen-network/api/lib/generated/cosmos/base/abci/v1beta1/abci';
import { OrderBy } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import { MsgAnchor } from '@regen-network/api/lib/generated/regen/data/v1/tx';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { useLedger } from 'ledger';
import {
  processingModalAtom,
  txSuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import { messageActionEquals } from 'lib/ecocredit/constants';
import { getGetTxsEventQuery } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery';
import { Post } from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery.types';

import { POST_CREATED, VIEW_POST } from '../PostFlow.constants';
import { getSuccessModalContent } from '../PostFlow.utils';

export type FetchMsgAnchorParams = {
  iri: string;
  createdPostData?: Post | null;
};
export type UseFetchMsgAnchorParams = {
  projectId: string;
  projectName?: string;
  projectSlug?: string | null;
  offChainProjectId?: string;
};

export const useFetchMsgAnchor = ({
  projectSlug,
  projectId,
  offChainProjectId,
  projectName,
}: UseFetchMsgAnchorParams) => {
  const { txClient } = useLedger();
  const { _ } = useLingui();

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

  const fetchMsgAnchor = useCallback(
    async ({ iri, createdPostData }: FetchMsgAnchorParams) => {
      setProcessingModalAtom(atom => void (atom.open = true));

      const timer = (ms: number) => new Promise(res => setTimeout(res, ms));

      let txResponses: TxResponse[] | undefined = [];
      let i = 1;
      let anchorTxHash: string | undefined;

      while (i < 10 && txResponses && txResponses.length === 0) {
        const { data } = await refetch();
        txResponses = data?.txResponses?.filter(txRes =>
          txRes.rawLog.includes(iri),
        );
        i++;
        if (txResponses && txResponses.length === 1) {
          break;
        }
        await timer(1000);
      }
      if (txResponses && txResponses.length === 1) {
        anchorTxHash = txResponses[0].txhash;
      }
      setProcessingModalAtom(atom => void (atom.open = false));
      const { cardItems, buttonLink } = getSuccessModalContent({
        createdPostData,
        projectSlug,
        projectId,
        offChainProjectId,
        projectName,
        anchorTxHash,
      });
      setTxSuccessfulModalAtom(atom => {
        atom.open = true;
        atom.cardItems = cardItems;
        atom.title = _(msg`${POST_CREATED}`);
        atom.buttonTitle = _(msg`${VIEW_POST}`);
        atom.buttonLink = buttonLink;
      });
    },
    [
      _,
      offChainProjectId,
      projectId,
      projectName,
      projectSlug,
      refetch,
      setProcessingModalAtom,
      setTxSuccessfulModalAtom,
    ],
  );

  return fetchMsgAnchor;
};
