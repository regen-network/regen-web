import { useCallback } from 'react';
import { MsgSend } from '@regen-network/api/lib/generated/regen/ecocredit/v1/tx';
import { useTrack } from 'use-analytics';

import type { FormValues as CreditSendFormValues } from 'web-components/lib/components/form/CreditSendForm';
import type { Item } from 'web-components/lib/components/modal/TxModal';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import type { UseStateSetter } from 'types/react/use-state';
import { getAccountUrl } from 'lib/block-explorer';

import type { SignAndBroadcastType } from 'hooks/useMsgClient';

import { SEND_HEADER } from '../MyEcocredits.contants';

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

type ReturnType = (values: CreditSendFormValues) => Promise<void>;

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
}: Props): ReturnType => {
  const track = useTrack();
  const creditSendSubmit = useCallback(
    async (values: CreditSendFormValues): Promise<void> => {
      if (!accountAddress) return Promise.reject();
      const batchDenom = credits[creditSendOpen].denom;
      const {
        withRetire,
        recipient,
        totalAmount,
        retirementJurisdiction,
        note,
      } = values;
      const msg = MsgSend.fromPartial({
        sender: accountAddress,
        recipient,
        credits: [
          {
            batchDenom,
            tradableAmount: withRetire ? '' : totalAmount.toString(),
            retiredAmount: withRetire ? totalAmount.toString() : '',
            retirementJurisdiction: retirementJurisdiction,
          },
        ],
      });

      const tx = {
        msgs: [msg],
        fee: undefined,
        memo: note,
      };

      const onError = (): void => {
        track('sendFailure');
      };
      const onSuccess = (): void => {
        track('sendSuccess');
      };
      await signAndBroadcast(tx, () => setCreditSendOpen(-1), {
        onError,
        onSuccess,
      });
      if (batchDenom && recipient) {
        setCardItems(
          [
            {
              label: 'batch denom',
              value: { name: batchDenom, url: `/credit-batches/${batchDenom}` },
            },
            {
              label: 'amount sent',
              value: { name: totalAmount.toString() },
            },
            {
              label: 'recipient',
              value: { name: recipient, url: getAccountUrl(recipient) },
            },
          ].filter(item => item.value.name !== '0'),
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
