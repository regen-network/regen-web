import React from 'react';

import { BasketPutForm, BasketPutProps } from '../form/BasketPutForm';
import { RegenModalProps } from '../modal';
import { FormModalTemplate } from './FormModalTemplate';

interface BasketPutModalProps extends RegenModalProps, BasketPutProps {}

export const BASKET_PUT_TITLE = 'Put in basket';

const BasketPutModal: React.FC<React.PropsWithChildren<BasketPutModalProps>> =
  ({
    basketOptions,
    batchDenom,
    availableTradableAmount,
    open,
    onClose,
    onSubmit,
  }) => (
    <FormModalTemplate title={BASKET_PUT_TITLE} open={open} onClose={onClose}>
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
