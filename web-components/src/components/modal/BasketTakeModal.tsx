import React from 'react';

import { BasketTakeForm, BasketTakeProps } from '../form/BasketTakeForm';
import { FormModalTemplate } from './FormModalTemplate';
import { RegenModalProps } from './index';

export interface TakeModalProps extends RegenModalProps, BasketTakeProps {}

export const title = 'Take from basket';

const BasketTakeModal: React.FC<TakeModalProps> = ({
  basket,
  basketDisplayDenom,
  balance,
  accountAddress,
  open,
  mapboxToken,
  onClose,
  onSubmit,
}) => {
  return (
    <FormModalTemplate
      title={title}
      subtitle="You will receive one ecocredit for every basket token you redeem. Oldest batches will be pulled first."
      open={open}
      onClose={onClose}
    >
      <BasketTakeForm
        mapboxToken={mapboxToken}
        accountAddress={accountAddress}
        balance={balance}
        basket={basket}
        basketDisplayDenom={basketDisplayDenom}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </FormModalTemplate>
  );
};

export { BasketTakeModal };
