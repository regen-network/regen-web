import React from 'react';

import {
  BasketPutForm,
  BasketPutProps,
} from '../form/BasketPutForm/BasketPutForm';
import { RegenModalProps } from '../modal';
import { FormModalTemplate } from './FormModalTemplate';

interface BasketPutModalProps extends RegenModalProps, BasketPutProps {}

export const BASKET_PUT_TITLE = 'Put in basket';

const BasketPutModal: React.FC<React.PropsWithChildren<BasketPutModalProps>> =
  ({
    basketOptions,
    batchDenoms,
    availableTradableAmount,
    open,
    onClose,
    onSubmit,
    onBatchDenomChange,
  }) => (
    <FormModalTemplate title={BASKET_PUT_TITLE} open={open} onClose={onClose}>
      <BasketPutForm
        basketOptions={basketOptions}
        batchDenoms={batchDenoms}
        availableTradableAmount={availableTradableAmount}
        onClose={onClose}
        onSubmit={onSubmit}
        onBatchDenomChange={onBatchDenomChange}
      />
    </FormModalTemplate>
  );

export { BasketPutModal };
