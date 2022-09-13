import React from 'react';

import {
  CreateSellOrderForm,
  CreateSellOrderProps,
} from '../form/CreateSellOrderForm';
import { RegenModalProps } from '.';
import { FormModalTemplate } from './FormModalTemplate';

interface CreateSellOrderModalProps
  extends RegenModalProps,
    CreateSellOrderProps {
  title: string;
}

const CreateSellOrderModal: React.FC<CreateSellOrderModalProps> = ({
  batchDenoms,
  allowedDenoms,
  sellDenom,
  availableAmountByBatch,
  open,
  title,
  onClose,
  onSubmit,
}) => (
  <FormModalTemplate title={title} open={open} onClose={onClose}>
    <CreateSellOrderForm
      batchDenoms={batchDenoms}
      allowedDenoms={allowedDenoms}
      sellDenom={sellDenom}
      availableAmountByBatch={availableAmountByBatch}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  </FormModalTemplate>
);

export { CreateSellOrderModal };
