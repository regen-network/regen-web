import { QueryBasketsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { MsgTake } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/tx';
import { useCallback } from 'react';
import { MsgTakeValues } from 'web-components/lib/components/form/BasketTakeForm';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { BasketTokens } from '../../../hooks/useBasketTokens';
import { SignAndBroadcastType } from '../../../hooks/useMsgClient';
import { useStateSetter } from '../../../types/react/use-state';

type Props = {
  accountAddress?: string;
  baskets?: QueryBasketsResponse;
  basketTakeTitle: string;
  signAndBroadcast: SignAndBroadcastType;
  setBasketTakeTokens: useStateSetter<BasketTokens | undefined>;
  setCardItems: useStateSetter<Item[] | undefined>;
  setTxModalTitle: useStateSetter<string | undefined>;
};

type ReturnType = (values: MsgTakeValues) => Promise<void>;

const useBasketTakeSubmit = ({
  accountAddress,
  baskets,
  basketTakeTitle,
  signAndBroadcast,
  setBasketTakeTokens,
  setCardItems,
  setTxModalTitle,
}: Props): ReturnType => {
  const basketTakeSubmit = useCallback(
    async (values: MsgTakeValues): Promise<void> => {
      if (!accountAddress) return Promise.reject();

      const amount = values?.amount;
      const basket = baskets?.baskets.find(
        b => b.basketDenom === values.basketDenom,
      );

      const msg = MsgTake.fromPartial({
        owner: accountAddress,
        basketDenom: values.basketDenom,
        amount,
        retirementLocation: values.retirementLocation || '',
        retireOnTake: values.retireOnTake || false,
      });

      const tx = {
        msgs: [msg],
        fee: undefined,
        memo: values?.retirementNote,
      };

      await signAndBroadcast(tx, () => setBasketTakeTokens(undefined));

      if (basket && amount) {
        setCardItems([
          {
            label: 'basket',
            value: { name: basket.name },
          },
          {
            label: 'amount',
            value: { name: parseInt(amount) / Math.pow(10, basket.exponent) },
          },
        ]);
        setTxModalTitle(basketTakeTitle);
      }
    },
    [
      accountAddress,
      basketTakeTitle,
      baskets?.baskets,
      setBasketTakeTokens,
      setCardItems,
      setTxModalTitle,
      signAndBroadcast,
    ],
  );

  return basketTakeSubmit;
};

export default useBasketTakeSubmit;
