import { useCallback } from 'react';
import { MsgRetire } from '@regen-network/api/lib/generated/regen/ecocredit/v1/tx';

import type { RetireFormValues as CreditRetireFormValues } from 'web-components/lib/components/form/CreditRetireForm';
import type { Item } from 'web-components/lib/components/modal/TxModal';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import type { UseStateSetter } from 'types/react/use-state';
import {
  Retire2Event,
  RetireFailureEvent,
  RetireSuccessEvent,
} from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

import type { SignAndBroadcastType } from 'hooks/useMsgClient';

import { RETIRE_HEADER } from '../MyEcocredits.constants';

type Props = {
  accountAddress?: string;
  credits: BatchInfoWithBalance[];
  creditRetireOpen: number;
  creditRetireTitle: string;
  signAndBroadcast: SignAndBroadcastType;
  setCreditRetireOpen: UseStateSetter<number>;
  setCardItems: UseStateSetter<Item[] | undefined>;
  setTxModalHeader: UseStateSetter<string | undefined>;
  setTxModalTitle: UseStateSetter<string | undefined>;
};

type ReturnType = (values: CreditRetireFormValues) => Promise<void>;

const useCreditRetireSubmit = ({
  accountAddress,
  credits,
  creditRetireOpen,
  creditRetireTitle,
  signAndBroadcast,
  setCreditRetireOpen,
  setCardItems,
  setTxModalHeader,
  setTxModalTitle,
}: Props): ReturnType => {
  const { track } = useTracker();
  const creditRetireSubmit = useCallback(
    async (values: CreditRetireFormValues): Promise<void> => {
      const batchDenom = credits[creditRetireOpen].denom;
      track<'retire2', Retire2Event>('retire2', {
        batchDenom,
        creditClassId: credits[creditRetireOpen].classId,
        projectId: credits[creditRetireOpen].projectId,
        projectName: credits[creditRetireOpen].projectName,
        quantity: values.retiredAmount,
      });

      if (!accountAddress) return Promise.reject();
      const amount = values.retiredAmount.toString();
      const msg = MsgRetire.fromPartial({
        owner: accountAddress,
        jurisdiction: values.retirementJurisdiction,
        credits: [
          {
            batchDenom,
            amount,
          },
        ],
      });

      const tx = {
        msgs: [msg],
        fee: undefined,
        memo: values?.note,
      };

      const onError = (err?: Error): void => {
        track<'retireFailure', RetireFailureEvent>('retireFailure', {
          batchDenom,
          creditClassId: credits[creditRetireOpen].classId,
          projectId: credits[creditRetireOpen].projectId,
          projectName: credits[creditRetireOpen].projectName,
          quantity: values.retiredAmount,
          errorMessage: err?.message,
        });
      };
      const onSuccess = (): void => {
        track<'retireSuccess', RetireSuccessEvent>('retireSuccess', {
          batchDenom,
          creditClassId: credits[creditRetireOpen].classId,
          projectId: credits[creditRetireOpen].projectId,
          projectName: credits[creditRetireOpen].projectName,
          quantity: values.retiredAmount,
        });
      };
      await signAndBroadcast(tx, () => setCreditRetireOpen(-1), {
        onError,
        onSuccess,
      });
      if (batchDenom && amount) {
        setCardItems([
          {
            label: 'project',
            value: {
              name:
                credits[creditRetireOpen].projectName ||
                credits[creditRetireOpen].projectId,
              url: `/projects/${credits[creditRetireOpen].projectId}`,
            },
          },
          {
            label: 'credit batch id',
            value: { name: batchDenom, url: `/credit-batches/${batchDenom}` },
          },
          {
            label: 'amount retired',
            value: { name: amount },
          },
        ]);
        setTxModalHeader(RETIRE_HEADER);
        setTxModalTitle(creditRetireTitle);
      }
    },
    [
      accountAddress,
      creditRetireOpen,
      creditRetireTitle,
      credits,
      setCardItems,
      setCreditRetireOpen,
      setTxModalHeader,
      setTxModalTitle,
      signAndBroadcast,
      track,
    ],
  );

  return creditRetireSubmit;
};

export default useCreditRetireSubmit;
