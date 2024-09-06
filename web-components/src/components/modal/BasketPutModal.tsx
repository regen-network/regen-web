import React from 'react';

import {
  BasketPutForm,
  BasketPutProps,
} from '../form/BasketPutForm/BasketPutForm';
import { RegenModalProps } from '../modal';
import { FormModalTemplate } from './FormModalTemplate';

interface BasketPutModalProps extends RegenModalProps, BasketPutProps {
  title: string;
}

const BasketPutModal: React.FC<React.PropsWithChildren<BasketPutModalProps>> =
  ({
    title,
    basketOptions,
    batchDenoms,
    availableTradableAmount,
    open,
    batchLabel,
    batchDescription,
    basketLabel,
    amountLabel,
    submitLabel,
    submitErrorText,
    onClose,
    onSubmit,
    onBatchDenomChange,
  }) => (
    <FormModalTemplate title={title} open={open} onClose={onClose}>
      <BasketPutForm
        basketOptions={basketOptions}
        batchDenoms={batchDenoms}
        availableTradableAmount={availableTradableAmount}
        onClose={onClose}
        onSubmit={onSubmit}
        onBatchDenomChange={onBatchDenomChange}
        batchLabel={batchLabel}
        batchDescription={batchDescription}
        basketLabel={basketLabel}
        amountLabel={amountLabel}
        submitLabel={submitLabel}
        submitErrorText={submitErrorText}
      />
    </FormModalTemplate>
  );

export { BasketPutModal };
