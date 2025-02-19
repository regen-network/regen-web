import React, { ReactNode } from 'react';
import { Field, Form, Formik, FormikErrors } from 'formik';

import { Body } from '../../../components/typography';
import { RegenModalPropsWithOnClose } from '../../../types/shared/modalPropsWithOnClose';
import AmountField from '../../inputs/AmountField';
import SelectTextField, { Option } from '../../inputs/SelectTextField';
import { validateAmount } from '../../inputs/validation';
import Submit from '../Submit';
import { BasketPutFormOnChange } from './BasketPutForm.OnChange';

export interface BasketPutProps {
  basketOptions: Option[];
  batchDenoms: string[];
  availableTradableAmount: number;
  batchLabel: string;
  batchDescription: ReactNode;
  basketLabel: string;
  amountLabel: string;
  submitLabel: string;
  submitErrorText: string;
  requiredMessage: string;
  invalidAmount: string;
  insufficientCredits: string;
  invalidDecimalCount: string;
  onSubmit: (values: FormValues) => Promise<void>;
  onBatchDenomChange?: (batchDenom: string | undefined) => void;
}

interface FormProps extends BasketPutProps {
  maxLabel: string;
  availableLabel: string;
  onClose: RegenModalPropsWithOnClose['onClose'];
}

export interface FormValues {
  batchDenom?: string;
  basketDenom?: string;
  amount?: number;
}

const BasketPutForm: React.FC<React.PropsWithChildren<FormProps>> = ({
  maxLabel,
  availableLabel,
  batchDenoms,
  basketOptions,
  availableTradableAmount,
  amountLabel,
  batchLabel,
  batchDescription,
  basketLabel,
  submitLabel,
  submitErrorText,
  requiredMessage,
  invalidAmount,
  insufficientCredits,
  invalidDecimalCount,
  onClose,
  onSubmit,
  onBatchDenomChange,
}) => {
  const hasManyBatchDenoms = batchDenoms.length > 1;
  const hasOneBasketDenom = basketOptions.length === 1;
  const batchDenomsOptions: Option[] = batchDenoms.map(batchDenom => ({
    label: batchDenom,
    value: batchDenom,
  }));

  const initialValues = {
    batchDenom: batchDenoms[0],
    basketDenom: hasOneBasketDenom ? basketOptions[0].value : undefined,
    amount: undefined,
  };

  const finalBasketOptions = hasOneBasketDenom
    ? basketOptions
    : [{ value: '', label: basketLabel }, ...basketOptions];

  const validateHandler = (values: FormValues): FormikErrors<FormValues> => {
    let errors: FormikErrors<FormValues> = {};

    if (!values.basketDenom) {
      errors.basketDenom = requiredMessage;
    }
    const errAmount = validateAmount({
      availableTradableAmount,
      requiredMessage,
      invalidAmount,
      insufficientCredits,
      invalidDecimalCount,
      amount: values.amount,
    });
    if (errAmount) errors.amount = errAmount;

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validateHandler}
      onSubmit={onSubmit}
    >
      {({ values, submitForm, isSubmitting, isValid, submitCount, status }) => (
        <Form>
          {hasManyBatchDenoms && (
            <Field
              name="batchDenom"
              label={batchLabel}
              description={<Body>{batchDescription}</Body>}
              component={SelectTextField}
              options={batchDenomsOptions}
              native={false}
            />
          )}
          <Field
            name="basketDenom"
            label={basketLabel}
            component={SelectTextField}
            options={finalBasketOptions}
            disabled={hasOneBasketDenom}
            native={false}
          />
          <AmountField
            maxLabel={maxLabel}
            availableLabel={availableLabel}
            name="amount"
            label={amountLabel}
            availableAmount={availableTradableAmount}
            denom={values.batchDenom ?? batchDenoms[0]}
          />

          <Submit
            isSubmitting={isSubmitting}
            onClose={onClose}
            status={status}
            isValid={isValid}
            submitCount={submitCount}
            submitForm={submitForm}
            label={submitLabel}
            errorText={submitErrorText}
          />
          <BasketPutFormOnChange onBatchDenomChange={onBatchDenomChange} />
        </Form>
      )}
    </Formik>
  );
};

export { BasketPutForm };
