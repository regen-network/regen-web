import { MsgSend } from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/tx';
import { useCallback } from 'react';
import { FormValues as CreditSendFormValues } from 'web-components/lib/components/form/CreditSendForm';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { SignAndBroadcastType } from '../../../hooks/useMsgClient';
import { BatchInfoWithBalance } from '../../../types/ledger/ecocredit';
import { useStateSetter } from '../../../types/react/use-state';

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
        setCardItems([
          {
            label: 'batch denom',
            value: { name: batchDenom, url: `/credit-batches/${batchDenom}` },
          },
          {
            label: 'recipient',
            value: { name: recipient },
          },
        ]);
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
