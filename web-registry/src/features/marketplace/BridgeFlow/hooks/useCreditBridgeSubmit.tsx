import { useCallback } from 'react';
import { MsgBridge } from '@regen-network/api/lib/generated/regen/ecocredit/v1/tx';
import { useTrack } from 'use-analytics';

import type { Item } from 'web-components/lib/components/modal/TxModal';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import type { UseStateSetter } from 'types/react/use-state';

import type { BridgeFormValues } from 'components/organisms/BridgeForm/BridgeForm';
import type { SignAndBroadcastType } from 'hooks/useMsgClient';

import {
  BRIDGE_BUTTON_TEXT,
  BRIDGE_HEADER,
  BRIDGE_TITLE,
  BRIDGE_TX_DESCRIPTION,
} from '../BridgeFlow.constants';

type Props = {
  accountAddress?: string;
  creditBridgeBatch?: BatchInfoWithBalance;
  signAndBroadcast: SignAndBroadcastType;
  setCreditBridgeOpen: UseStateSetter<BatchInfoWithBalance | undefined>;
  setCardItems: UseStateSetter<Item[] | undefined>;
  setTxModalHeader: UseStateSetter<string>;
  setTxModalTitle: UseStateSetter<string>;
  setTxButtonTitle: UseStateSetter<string>;
  setTxModalDescription: UseStateSetter<string>;
};

type ReturnType = (values: BridgeFormValues) => Promise<void>;

const useCreditBridgeSubmit = ({
  accountAddress,
  creditBridgeBatch,
  signAndBroadcast,
  setCreditBridgeOpen,
  setCardItems,
  setTxModalHeader,
  setTxModalTitle,
  setTxButtonTitle,
  setTxModalDescription,
}: Props): ReturnType => {
  const track = useTrack();

  const creditBridgeSubmit = useCallback(
    async (values: BridgeFormValues): Promise<void> => {
      track('bridge3');

      if (!accountAddress) return Promise.reject();
      const batchDenom = creditBridgeBatch?.denom;
      const { recipient, amount, target } = values;

      const msg = MsgBridge.fromPartial({
        owner: accountAddress,
        target,
        recipient,
        credits: [
          {
            batchDenom,
            amount: amount?.toString() || '0',
          },
        ],
      });

      const tx = {
        msgs: [msg],
        fee: undefined,
      };

      const onError = (): void => {
        track('bridgeFailure');
      };

      const onSuccess = (): void => {
        if (batchDenom) {
          setCardItems([
            {
              label: 'project',
              value: {
                name:
                  creditBridgeBatch.projectName || creditBridgeBatch.projectId,
                url: `/projects/${creditBridgeBatch.projectId}`,
              },
            },
            {
              label: 'credit batch id',
              value: { name: batchDenom, url: `/credit-batches/${batchDenom}` },
            },
            {
              label: 'amount',
              value: { name: amount?.toString() || '0' },
            },
          ]);
          setTxModalHeader(BRIDGE_HEADER);
          setTxModalTitle(BRIDGE_TITLE);
          setTxButtonTitle(BRIDGE_BUTTON_TEXT);
          setTxModalDescription(BRIDGE_TX_DESCRIPTION);
        }
        track('bridgeSuccess');
      };

      await signAndBroadcast(tx, () => setCreditBridgeOpen(undefined), {
        onError,
        onSuccess,
      });
    },
    [
      accountAddress,
      creditBridgeBatch?.denom,
      creditBridgeBatch?.projectId,
      creditBridgeBatch?.projectName,
      setCardItems,
      setCreditBridgeOpen,
      setTxButtonTitle,
      setTxModalHeader,
      setTxModalTitle,
      setTxModalDescription,
      signAndBroadcast,
      track,
    ],
  );

  return creditBridgeSubmit;
};

export default useCreditBridgeSubmit;
