import React from 'react';
import { Basket } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/types';
import { RegenModalProps } from './index';
import { FormModalTemplate } from './FormModalTemplate';
import { BasketTakeForm, MsgTakeValues } from '../form/BasketTakeForm';

export interface TakeModalProps extends RegenModalProps {
  basket: Basket;
  basketDenom: string;
  accountAddress: string;
  balance: number;
  open: boolean;
  mapboxToken: string;
  onClose: () => void;
  onSubmit: (values: MsgTakeValues) => void;
}

const BasketTakeModal: React.FC<TakeModalProps> = ({
  basket,
  basketDenom,
  balance,
  accountAddress,
  open,
  mapboxToken,
  onClose,
  onSubmit,
}) => {
  return (
    <FormModalTemplate
      title="Take from basket"
      subtitle="You will receive one ecocredit for every basket token you redeem. Oldest batches will be pulled first."
      open={open}
      onClose={onClose}
    >
      <BasketTakeForm
        mapboxToken={mapboxToken}
        accountAddress={accountAddress}
        availableTradableAmount={balance}
        basket={basket}
        basketDenom={basketDenom}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </FormModalTemplate>
  );
};

export { BasketTakeModal };
