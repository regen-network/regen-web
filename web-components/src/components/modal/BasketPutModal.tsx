import React from 'react';

import { BasketPutForm, BasketPutProps } from '../form/BasketPutForm';
import { RegenModalProps } from '../modal';
import { FormModalTemplate } from './FormModalTemplate';

interface BasketPutModalProps extends RegenModalProps, BasketPutProps {}

export const title = 'Put in basket';

const BasketPutModal: React.FC<BasketPutModalProps> = ({
  basketOptions,
  batchDenom,
  availableTradableAmount,
  open,
  onClose,
  onSubmit,
}) => (
  <FormModalTemplate title={title} open={open} onClose={onClose}>
    <BasketPutForm
      basketOptions={basketOptions}
      batchDenom={batchDenom}
      availableTradableAmount={availableTradableAmount}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  </FormModalTemplate>
);

export { BasketPutModal };
