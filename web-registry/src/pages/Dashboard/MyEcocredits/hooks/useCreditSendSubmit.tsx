import { useCallback } from 'react';
import { MsgSend } from '@regen-network/api/lib/generated/regen/ecocredit/v1/tx';

import type { Item } from 'web-components/lib/components/modal/TxModal';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import type { UseStateSetter } from 'types/react/use-state';
import { getAccountUrl } from 'lib/block-explorer';
import {
  Send2Event,
  SendFailureEvent,
  SendSuccessEvent,
} from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

import type { CreditSendFormSchemaType } from 'components/organisms/CreditSendForm/CreditSendForm.schema';
import type { SignAndBroadcastType } from 'hooks/useMsgClient';

import { SEND_HEADER } from '../MyEcocredits.constants';

type Props = {
  accountAddress?: string;
  credits: BatchInfoWithBalance[];
  creditSendOpen: number;
  creditSendTitle: string;
  signAndBroadcast: SignAndBroadcastType;
  setCreditSendOpen: UseStateSetter<number>;
  setCardItems: UseStateSetter<Item[] | undefined>;
  setTxModalHeader: UseStateSetter<string | undefined>;
  setTxModalTitle: UseStateSetter<string | undefined>;
};

type Return = (values: CreditSendFormSchemaType) => Promise<void>;

const useCreditSendSubmit = ({
  accountAddress,
  credits,
  creditSendOpen,
  creditSendTitle,
  signAndBroadcast,
  setCreditSendOpen,
  setCardItems,
  setTxModalHeader,
  setTxModalTitle,
}: Props): Return => {
  const { track } = useTracker();
  const creditSendSubmit = useCallback(
    async (values: CreditSendFormSchemaType): Promise<void> => {
      const batchDenom = credits[creditSendOpen].denom;
      track<'send2', Send2Event>('send2', {
        batchDenom,
        quantity: values.amount,
        enableAutoRetire: values.withRetire,
        creditClassId: credits[creditSendOpen].classId,
        projectId: credits[creditSendOpen].projectId,
        projectName: credits[creditSendOpen].projectName,
      });
      if (!accountAddress) return Promise.reject();

      const { withRetire, recipient, amount, retireFields } = values;
      const { retirementJurisdiction, note } = retireFields?.[0] || {};
      const msg = MsgSend.fromPartial({
        sender: accountAddress,
        recipient,
        credits: [
          {
            batchDenom,
            tradableAmount: withRetire ? '' : amount.toString(),
            retiredAmount: withRetire ? amount.toString() : '',
            retirementJurisdiction: retirementJurisdiction,
            retirementReason: note,
          },
        ],
      });

      const tx = {
        msgs: [msg],
        fee: undefined,
      };

      const batchInfo = credits[creditSendOpen];
      const onError = (err?: Error): void => {
        track<'sendFailure', SendFailureEvent>('sendFailure', {
          batchDenom,
          projectId: batchInfo?.projectId,
          projectName: !!batchInfo?.projectName
            ? batchInfo.projectName
            : undefined,
          creditClassId: batchInfo?.projectId.split('-')[0],
          enableAutoRetire: withRetire,
          quantity: amount,
          errorMessage: err?.message,
        });
      };
      const onSuccess = (): void => {
        track<'sendSuccess', SendSuccessEvent>('sendSuccess', {
          batchDenom,
          projectId: batchInfo?.projectId,
          projectName: !!batchInfo?.projectName
            ? batchInfo.projectName
            : undefined,
          creditClassId: batchInfo?.projectId.split('-')[0],
          enableAutoRetire: withRetire,
          quantity: amount,
        });
      };
      await signAndBroadcast(tx, () => setCreditSendOpen(-1), {
        onError,
        onSuccess,
      });
      if (batchDenom && recipient) {
        setCardItems(
          [
            {
              label: 'project',
              value: {
                name:
                  credits[creditSendOpen].projectName ||
                  credits[creditSendOpen].projectId,
                url: `/project/${credits[creditSendOpen].projectId}`,
              },
            },
            {
              label: 'credit batch id',
              value: { name: batchDenom, url: `/credit-batches/${batchDenom}` },
            },
            {
              label: 'amount sent',
              value: { name: amount.toString() },
            },
            {
              label: 'recipient',
              value: { name: recipient, url: getAccountUrl(recipient) },
            },
          ].filter(item => Number(item.value.name) !== 0),
        );
        setTxModalHeader(SEND_HEADER);
        setTxModalTitle(creditSendTitle);
      }
    },
    [
      accountAddress,
      creditSendOpen,
      creditSendTitle,
      credits,
      setCardItems,
      setCreditSendOpen,
      setTxModalHeader,
      setTxModalTitle,
      signAndBroadcast,
      track,
    ],
  );

  return creditSendSubmit;
};

export default useCreditSendSubmit;
