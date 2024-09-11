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
  requiredMessage: string;
  invalidAmount: string;
  insufficientCredits: string;
  invalidDecimalCount: string;
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
    requiredMessage,
    invalidAmount,
    insufficientCredits,
    invalidDecimalCount,
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
        requiredMessage={requiredMessage}
        invalidAmount={invalidAmount}
        insufficientCredits={insufficientCredits}
        invalidDecimalCount={invalidDecimalCount}
      />
    </FormModalTemplate>
  );

export { BasketPutModal };
