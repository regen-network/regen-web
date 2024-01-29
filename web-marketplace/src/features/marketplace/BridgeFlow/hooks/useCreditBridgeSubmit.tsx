import { useCallback } from 'react';
import { MsgBridge } from '@regen-network/api/lib/generated/regen/ecocredit/v1/tx';

import type { Item } from 'web-components/src/components/modal/TxModal';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import type { UseStateSetter } from 'types/react/use-state';
import {
  Bridge2Event,
  BridgeFailureEvent,
  BridgeSuccessEvent,
} from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

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
  setTxModalHeader: UseStateSetter<string | undefined>;
  setTxModalTitle: UseStateSetter<string | undefined>;
  setTxButtonTitle: UseStateSetter<string>;
  setTxModalDescription: UseStateSetter<string>;
};

type Params = (values: BridgeFormValues) => Promise<void>;

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
}: Props): Params => {
  const { track } = useTracker();

  const creditBridgeSubmit = useCallback(
    async (values: BridgeFormValues): Promise<void> => {
      const batchDenom = creditBridgeBatch?.denom;
      track<'bridge2', Bridge2Event>('bridge2', {
        batchDenom,
        quantity: values.amount,
        creditClassId: creditBridgeBatch?.classId,
        projectId: creditBridgeBatch?.projectId,
        recipient: values.recipient,
      });

      if (!accountAddress) return Promise.reject();
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

      const onError = (err?: Error): void => {
        track<'bridgeFailure', BridgeFailureEvent>('bridgeFailure', {
          batchDenom,
          quantity: values.amount,
          creditClassId: creditBridgeBatch?.classId,
          projectId: creditBridgeBatch?.projectId,
          errorMessage: err?.message,
          recipient: values.recipient,
        });
      };

      const onSuccess = (): void => {
        if (batchDenom) {
          setCardItems([
            {
              label: 'project',
              value: {
                name:
                  creditBridgeBatch.projectName || creditBridgeBatch.projectId,
                url: `/project/${creditBridgeBatch.projectId}`,
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
        track<'bridgeSuccess', BridgeSuccessEvent>('bridgeSuccess', {
          batchDenom,
          quantity: values.amount,
          creditClassId: creditBridgeBatch?.classId,
          projectId: creditBridgeBatch?.projectId,
          recipient: values.recipient,
        });
      };

      await signAndBroadcast(tx, () => setCreditBridgeOpen(undefined), {
        onError,
        onSuccess,
      });
    },
    [
      accountAddress,
      creditBridgeBatch?.classId,
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
