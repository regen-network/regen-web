import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FormikErrors } from 'formik';

import AmountField from '../inputs/AmountField';
import SelectTextField, { Option } from '../inputs/SelectTextField';

import Submit from './Submit';
import { requiredMessage, validateAmount } from '../inputs/validation';

export interface BasketPutProps {
  basketOptions: Option[];
  batchDenom: string;
  availableTradableAmount: number;
  onSubmit: (values: FormValues) => Promise<void>;
}

interface FormProps extends BasketPutProps {
  onClose: () => void;
}

export interface FormValues {
  basketDenom?: string;
  amount?: number;
}

const BasketPutForm: React.FC<FormProps> = ({
  batchDenom,
  basketOptions,
  availableTradableAmount,
  onClose,
  onSubmit,
}) => {
  const [options, setOptions] = useState<Option[]>([]);

  const initialValues = {
    basketDenom: undefined,
    amount: undefined,
  };

  useEffect(() => {
    basketOptions.unshift({ value: '', label: 'choose basket' });
    setOptions(basketOptions);
  }, [basketOptions]);

  const validateHandler = (values: FormValues): FormikErrors<FormValues> => {
    let errors: FormikErrors<FormValues> = {};

    if (!values.basketDenom) {
      errors.basketDenom = requiredMessage;
    }
    const errAmount = validateAmount(availableTradableAmount, values.amount);
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
          <Field
            name="basketDenom"
            label="Choose basket"
            component={SelectTextField}
            options={options}
          />
          <AmountField
            name="amount"
            label="Amount"
            availableAmount={availableTradableAmount}
            batchDenom={batchDenom}
          />

          <Submit
            isSubmitting={isSubmitting}
            onClose={onClose}
            status={status}
            isValid={isValid}
            submitCount={submitCount}
            submitForm={submitForm}
            label="Put in basket"
          />
        </Form>
      )}
    </Formik>
  );
};

export { BasketPutForm };
