import { useCallback } from 'react';
import type { QueryBasketsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { MsgPut } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/tx';

import type { FormValues as BasketPutFormValues } from 'web-components/lib/components/form/BasketPutForm';
import type { Item } from 'web-components/lib/components/modal/TxModal';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import type { UseStateSetter } from 'types/react/use-state';

import type { BasketTokens } from 'hooks/useBasketTokens';
import type { SignAndBroadcastType } from 'hooks/useMsgClient';

type Props = {
  accountAddress?: string;
  baskets?: QueryBasketsResponse;
  basketPutOpen: number;
  basketPutTitle: string;
  credits: BatchInfoWithBalance[];
  basketTakeTitle: string;
  signAndBroadcast: SignAndBroadcastType;
  setBasketPutOpen: UseStateSetter<number>;
  setBasketTakeTokens: UseStateSetter<BasketTokens | undefined>;
  setCardItems: UseStateSetter<Item[] | undefined>;
  setTxModalTitle: UseStateSetter<string | undefined>;
};

type ReturnType = (values: BasketPutFormValues) => Promise<void>;

const useBasketPutSubmit = ({
  accountAddress,
  baskets,
  basketPutOpen,
  basketPutTitle,
  credits,
  signAndBroadcast,
  setBasketPutOpen,
  setCardItems,
  setTxModalTitle,
}: Props): ReturnType => {
  const basketPutSubmit = useCallback(
    async (values: BasketPutFormValues): Promise<void> => {
      const amount = values.amount?.toString();
      const msg = MsgPut.fromPartial({
        basketDenom: values.basketDenom,
        owner: accountAddress,
        credits: [
          {
            batchDenom: credits[basketPutOpen].batch_denom,
            amount,
          },
        ],
      });
      await signAndBroadcast({ msgs: [msg] }, () => setBasketPutOpen(-1));
      const basket = baskets?.baskets.find(
        b => b.basketDenom === values.basketDenom,
      );
      if (basket && amount) {
        setCardItems([
          {
            label: 'basket',
            value: { name: basket.name },
          },
          {
            label: 'amount',
            value: { name: amount },
          },
        ]);
        setTxModalTitle(basketPutTitle);
      }
    },
    [
      accountAddress,
      basketPutOpen,
      basketPutTitle,
      baskets?.baskets,
      credits,
      setBasketPutOpen,
      setCardItems,
      setTxModalTitle,
      signAndBroadcast,
    ],
  );

  return basketPutSubmit;
};

export default useBasketPutSubmit;
