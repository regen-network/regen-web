import { useCallback } from 'react';
<<<<<<< HEAD:web-registry/src/pages/MyEcocredits/hooks/useCreditSendSubmit.tsx
import { FormValues as CreditSendFormValues } from 'web-components/lib/components/form/CreditSendForm';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { SignAndBroadcastType } from '../../../hooks/useMsgClient';
import { BatchInfoWithBalance } from '../../../types/ledger/ecocredit';
import { useStateSetter } from '../../../types/react/use-state';
=======
import { MsgSend } from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/tx';

import type { FormValues as CreditSendFormValues } from 'web-components/lib/components/form/CreditSendForm';
import type { Item } from 'web-components/lib/components/modal/TxModal';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import type { UseStateSetter } from 'types/react/use-state';
>>>>>>> 92528156 (David/eslint simple import sort (#1075)):web-registry/src/pages/Dashboard/MyEcocredits/hooks/useCreditSendSubmit.tsx

import type { SignAndBroadcastType } from 'hooks/useMsgClient';

type Props = {
  accountAddress?: string;
  credits: BatchInfoWithBalance[];
  creditSendOpen: number;
  creditSendTitle: string;
  signAndBroadcast: SignAndBroadcastType;
  setCreditSendOpen: useStateSetter<number>;
  setCardItems: useStateSetter<Item[] | undefined>;
  setTxModalTitle: useStateSetter<string | undefined>;
};

type ReturnType = (values: CreditSendFormValues) => Promise<void>;

const useCreditSendSubmit = ({
  accountAddress,
  credits,
  creditSendOpen,
  creditSendTitle,
  signAndBroadcast,
  setCreditSendOpen,
  setCardItems,
  setTxModalTitle,
}: Props): ReturnType => {
  const creditSendSubmit = useCallback(
    async (values: CreditSendFormValues): Promise<void> => {
      if (!accountAddress) return Promise.reject();
      const batchDenom = credits[creditSendOpen].batch_denom;
      const recipient = values.recipient;
      const msg = MsgSend.fromPartial({
        sender: accountAddress,
        recipient,
        credits: [
          {
            batchDenom,
            tradableAmount: values.tradableAmount.toString(),
            retiredAmount: values.retiredAmount.toString(),
            retirementLocation: values.retirementLocation,
          },
        ],
      });

      const tx = {
        msgs: [msg],
        fee: undefined,
        memo: values?.note,
      };

      await signAndBroadcast(tx, () => setCreditSendOpen(-1));
      if (batchDenom && recipient) {
        setCardItems(
          [
            {
              label: 'batch denom',
              value: { name: batchDenom, url: `/credit-batches/${batchDenom}` },
            },
            {
              label: 'amount tradable',
              value: { name: values.tradableAmount.toString() },
            },
            {
              label: 'amount retired',
              value: { name: values.retiredAmount.toString() },
            },
            {
              label: 'recipient',
              value: { name: recipient },
            },
          ].filter(item => item.value.name !== '0'),
        );
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
      setTxModalTitle,
      signAndBroadcast,
    ],
  );

  return creditSendSubmit;
};

export default useCreditSendSubmit;
