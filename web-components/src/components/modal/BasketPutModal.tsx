import React from 'react';
import { RegenModalProps } from '../modal';
import { FormModalTemplate } from './FormModalTemplate';
import { BasketPutForm, BasketPutProps } from '../form/BasketPutForm';

interface BasketPutModalProps extends RegenModalProps, BasketPutProps {}

const BasketPutModal: React.FC<BasketPutModalProps> = ({
  basketOptions,
  batchDenom,
  availableTradableAmount,
  open,
  onClose,
  onSubmit,
}) => (
  <FormModalTemplate title="Put in basket" open={open} onClose={onClose}>
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
