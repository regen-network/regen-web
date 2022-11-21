import { useCallback } from 'react';
import { MsgRetire } from '@regen-network/api/lib/generated/regen/ecocredit/v1/tx';

import type { RetireFormValues as CreditRetireFormValues } from 'web-components/lib/components/form/CreditRetireForm';
import type { Item } from 'web-components/lib/components/modal/TxModal';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import type { UseStateSetter } from 'types/react/use-state';

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
  const creditRetireSubmit = useCallback(
    async (values: CreditRetireFormValues): Promise<void> => {
      if (!accountAddress) return Promise.reject();
      const batchDenom = credits[creditRetireOpen].denom;
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

      await signAndBroadcast(tx, () => setCreditRetireOpen(-1));
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
    ],
  );

  return creditRetireSubmit;
};

export default useCreditRetireSubmit;
