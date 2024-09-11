import React from 'react';

import {
  BasketPutForm,
  BasketPutProps,
} from '../form/BasketPutForm/BasketPutForm';
import { RegenModalProps } from '../modal';
import { FormModalTemplate } from './FormModalTemplate';

interface BasketPutModalProps extends RegenModalProps, BasketPutProps {
  title: string;
  maxLabel: string;
  availableLabel: string;
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
    maxLabel,
    availableLabel,
    onClose,
    onSubmit,
    onBatchDenomChange,
  }) => (
    <FormModalTemplate title={title} open={open} onClose={onClose}>
      <BasketPutForm
        maxLabel={maxLabel}
        availableLabel={availableLabel}
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
