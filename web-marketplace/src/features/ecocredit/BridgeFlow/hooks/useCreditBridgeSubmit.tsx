import { useCallback } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
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

/**
 * Creates a callback that processes bridging ecocredits to other blockchains.
 *
 * @param accountAddress - The user's wallet address
 * @param creditBridgeBatch - The credit batch information being bridged
 * @param signAndBroadcast - Function to sign and broadcast the transaction
 * @param setCreditBridgeOpen - State setter to control the bridge modal
 * @param setCardItems - State setter for the transaction details card
 * @param setTxModalHeader - State setter for the transaction modal header
 * @param setTxModalTitle - State setter for the transaction modal title
 * @param setTxButtonTitle - State setter for the transaction button text
 * @param setTxModalDescription - State setter for the transaction description
 * @returns A callback function that processes bridge form submissions
 *
 * @example
 * const bridgeSubmit = useCreditBridgeSubmit({
 *   accountAddress,
 *   creditBridgeBatch,
 *   signAndBroadcast,
 *   setCreditBridgeOpen,
 *   setCardItems,
 *   setTxModalHeader,
 *   setTxModalTitle,
 *   setTxButtonTitle,
 *   setTxModalDescription,
 * });
 *
 * // Later in the component:
 * <BridgeForm onSubmit={bridgeSubmit} />
 */
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
  const { _ } = useLingui();
  const { track } = useTracker();

  const creditBridgeSubmit = useCallback(
    async (values: BridgeFormValues): Promise<void> => {
      const batchDenom = creditBridgeBatch?.denom;
      track<Bridge2Event>('bridge2', {
        batchDenom,
        quantity: values.amount,
        creditClassId: creditBridgeBatch?.classId,
        projectId: creditBridgeBatch?.projectId,
        recipient: values.recipient,
      });

      if (!accountAddress) return Promise.reject();
      const { recipient, amount, target } = values;

      const msgBridge = MsgBridge.fromPartial({
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
        msgs: [msgBridge],
        fee: undefined,
      };

      const onError = (err?: Error): void => {
        track<BridgeFailureEvent>('bridgeFailure', {
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
              label: _(msg`credit batch id`),
              value: { name: batchDenom, url: `/credit-batches/${batchDenom}` },
            },
            {
              label: _(msg`amount`),
              value: { name: amount?.toString() || '0' },
            },
          ]);
          setTxModalHeader(_(BRIDGE_HEADER));
          setTxModalTitle(_(BRIDGE_TITLE));
          setTxButtonTitle(_(BRIDGE_BUTTON_TEXT));
          setTxModalDescription(_(BRIDGE_TX_DESCRIPTION));
        }
        track<BridgeSuccessEvent>('bridgeSuccess', {
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
      creditBridgeBatch?.denom,
      creditBridgeBatch?.classId,
      creditBridgeBatch?.projectId,
      creditBridgeBatch?.projectName,
      track,
      accountAddress,
      signAndBroadcast,
      setCardItems,
      _,
      setTxModalHeader,
      setTxModalTitle,
      setTxButtonTitle,
      setTxModalDescription,
      setCreditBridgeOpen,
    ],
  );

  return creditBridgeSubmit;
};

export default useCreditBridgeSubmit;
