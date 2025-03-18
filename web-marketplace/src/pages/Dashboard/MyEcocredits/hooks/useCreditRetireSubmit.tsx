import { useCallback } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { MsgRetire } from '@regen-network/api/regen/ecocredit/v1/tx';

import type { Item } from 'web-components/src/components/modal/TxModal';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import type { UseStateSetter } from 'types/react/use-state';
import {
  Retire2Event,
  RetireFailureEvent,
  RetireSuccessEvent,
} from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

import { CreditRetireFormSchemaType } from 'components/organisms/CreditRetireForm/CreditRetireForm.schema';
import type { SignAndBroadcastType } from 'hooks/useMsgClient';

import {
  RETIRE_HEADER,
  RETIRE_SUCCESS_BUTTON,
} from '../MyEcocredits.constants';

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
  setTxButtonTitle: UseStateSetter<string | undefined>;
};

type Params = (values: CreditRetireFormSchemaType) => Promise<void>;

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
  setTxButtonTitle,
}: Props): Params => {
  const { _ } = useLingui();
  const { track } = useTracker();
  const creditRetireSubmit = useCallback(
    async (values: CreditRetireFormSchemaType): Promise<void> => {
      const batchDenom = credits[creditRetireOpen].denom;
      track<Retire2Event>('retire2', {
        batchDenom,
        creditClassId: credits[creditRetireOpen].classId,
        projectId: credits[creditRetireOpen].projectId,
        projectName: credits[creditRetireOpen].projectName,
        quantity: values.amount,
      });

      if (!accountAddress) return Promise.reject();

      const { amount: amountValue, retireFields } = values;
      const { retirementJurisdiction, note } = retireFields?.[0] || {};
      const amount = values.amount.toString();
      const msgRetire = MsgRetire.fromPartial({
        owner: accountAddress,
        jurisdiction: retirementJurisdiction,
        credits: [
          {
            batchDenom,
            amount,
          },
        ],
        reason: note,
      });

      const tx = {
        msgs: [msgRetire],
        fee: undefined,
      };

      const onError = (err?: Error): void => {
        track<RetireFailureEvent>('retireFailure', {
          batchDenom,
          creditClassId: credits[creditRetireOpen].classId,
          projectId: credits[creditRetireOpen].projectId,
          projectName: credits[creditRetireOpen].projectName,
          quantity: amountValue,
          errorMessage: err?.message,
        });
      };
      const onSuccess = (): void => {
        track<RetireSuccessEvent>('retireSuccess', {
          batchDenom,
          creditClassId: credits[creditRetireOpen].classId,
          projectId: credits[creditRetireOpen].projectId,
          projectName: credits[creditRetireOpen].projectName,
          quantity: amountValue,
        });
      };
      await signAndBroadcast(tx, () => setCreditRetireOpen(-1), {
        onError,
        onSuccess,
      });
      if (batchDenom && amount) {
        setCardItems([
          {
            label: _(msg`project`),
            value: {
              name:
                credits[creditRetireOpen].projectName ||
                credits[creditRetireOpen].projectId,
              url: `/project/${credits[creditRetireOpen].projectId}`,
            },
          },
          {
            label: _(msg`credit batch id`),
            value: { name: batchDenom, url: `/credit-batches/${batchDenom}` },
          },
          {
            label: _(msg`amount retired`),
            value: { name: amount },
          },
        ]);
        setTxModalHeader(_(RETIRE_HEADER));
        setTxModalTitle(creditRetireTitle);
        setTxButtonTitle(_(RETIRE_SUCCESS_BUTTON));
      }
    },
    [
      credits,
      creditRetireOpen,
      track,
      accountAddress,
      signAndBroadcast,
      setCreditRetireOpen,
      setCardItems,
      _,
      setTxModalHeader,
      setTxModalTitle,
      creditRetireTitle,
      setTxButtonTitle,
    ],
  );

  return creditRetireSubmit;
};

export default useCreditRetireSubmit;
