import React from 'react';
import { QueryBasketsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { RegenModalProps } from 'web-components/lib/components/modal';
import { FormModalTemplate } from 'web-components/lib/components/modal/FormModalTemplate';
import {
  CreditTakeForm,
  CreditTakeFormValues,
} from 'web-components/lib/components/form/CreditTakeForm';
import useBasketTokens from '../../hooks/useBasketTokens';

export interface TakeModalProps extends RegenModalProps {
  baskets: QueryBasketsResponse;
  accountAddress: string;
  basketDenom: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreditTakeFormValues) => void;
}

const TakeFromBasketModal: React.FC<TakeModalProps> = ({
  baskets,
  accountAddress,
  basketDenom,
  open,
  onClose,
  onSubmit,
}) => {
  const basketTokens = useBasketTokens(accountAddress, baskets);
  const basket = basketTokens.find(bt => bt.basket.basketDenom === basketDenom);

  if (!accountAddress || !basket) return null; //TODO

  console.log('basket', basket);

  const balance =
    parseInt(basket?.balance?.balance?.amount || '0') /
    Math.pow(10, basket?.basket?.exponent);

  return (
    <FormModalTemplate title="Take from basket" open={open} onClose={onClose}>
      <CreditTakeForm
        accountAddress={accountAddress}
        availableTradableAmount={balance}
        batchDenom={basketDenom}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </FormModalTemplate>
  );
};

export { TakeFromBasketModal };
