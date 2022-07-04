import React from 'react';
import { RegenModalProps } from '.';
import {
  CreateSellOrderForm,
  CreateSellOrderProps,
} from '../form/CreateSellOrderForm';
import { FormModalTemplate } from './FormModalTemplate';

interface CreateSellOrderModalProps
  extends RegenModalProps,
    CreateSellOrderProps {}

export const title = 'Create Sell Order';
export const shortTitle = 'Sell';
export const successTitle = 'Your sell order was created!';
export const buttonTitle = 'VIEW YOUR SELL ORDERS';

const CreateSellOrderModal: React.FC<CreateSellOrderModalProps> = ({
  batchDenoms,
  sellDenom,
  availableTradableAmount,
  open,
  onClose,
  onSubmit,
}) => (
  <FormModalTemplate title={title} open={open} onClose={onClose}>
    <CreateSellOrderForm
      batchDenoms={batchDenoms}
      sellDenom={sellDenom}
      availableTradableAmount={availableTradableAmount}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  </FormModalTemplate>
);

export { CreateSellOrderModal };
