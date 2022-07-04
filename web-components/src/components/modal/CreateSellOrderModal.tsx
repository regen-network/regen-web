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
