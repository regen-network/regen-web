import React from 'react';
import { QueryBasketsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { RegenModalProps } from 'web-components/lib/components/modal';
import { FormModalTemplate } from 'web-components/lib/components/modal/FormModalTemplate';
import {
  BasketTakeForm,
  MsgTakeValues,
} from 'web-components/lib/components/form/BasketTakeForm';
import useBasketTokens from '../../hooks/useBasketTokens';

export interface TakeModalProps extends RegenModalProps {
  baskets: QueryBasketsResponse;
  accountAddress: string;
  basketDenom: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: MsgTakeValues) => void;
}

const BasketTakeModal: React.FC<TakeModalProps> = ({
  baskets,
  accountAddress,
  basketDenom,
  open,
  onClose,
  onSubmit,
}) => {
  const { basketTokens } = useBasketTokens(accountAddress, baskets);
  const basket = basketTokens.find(bt => bt.basket.basketDenom === basketDenom);

  if (!accountAddress || !basket) return null;

  const balance =
    parseInt(basket?.balance?.balance?.amount || '0') /
    Math.pow(10, basket?.basket?.exponent);

  return (
    <FormModalTemplate title="Take from basket" open={open} onClose={onClose}>
      <BasketTakeForm
        accountAddress={accountAddress}
        availableTradableAmount={balance}
        basket={basket?.basket}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </FormModalTemplate>
  );
};

export { BasketTakeModal };
