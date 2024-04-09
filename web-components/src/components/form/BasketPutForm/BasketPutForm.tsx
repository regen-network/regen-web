import React from 'react';
import { Link } from '@mui/material';
import { Field, Form, Formik, FormikErrors } from 'formik';

import { Body } from '../../../components/typography';
import AmountField from '../../inputs/AmountField';
import SelectTextField, { Option } from '../../inputs/SelectTextField';
import { requiredMessage, validateAmount } from '../../inputs/validation';
import { RegenModalProps } from '../../modal';
import Submit from '../Submit';
import { BasketPutFormOnChange } from './BasketPutForm.OnChange';

export interface BasketPutProps {
  basketOptions: Option[];
  batchDenoms: string[];
  availableTradableAmount: number;
  onSubmit: (values: FormValues) => Promise<void>;
  onBatchDenomChange?: (batchDenom: string | undefined) => void;
}

interface FormProps extends BasketPutProps {
  onClose: RegenModalProps['onClose'];
}

export interface FormValues {
  batchDenom?: string;
  basketDenom?: string;
  amount?: number;
}

const BasketPutForm: React.FC<React.PropsWithChildren<FormProps>> = ({
  batchDenoms,
  basketOptions,
  availableTradableAmount,
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
    : [{ value: '', label: 'choose basket' }, ...basketOptions];

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
        <Form
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {hasManyBatchDenoms && (
            <Field
              name="batchDenom"
              label="Choose ecocredits batch"
              description={
                <Body>
                  {'Choose any ecocredits that are eligible for this basket. '}
                  <Link
                    href="https://guides.regen.network/guides/regen-marketplace/baskets/put-in-basket"
                    target="_blank"
                  >
                    Learn more»
                  </Link>
                </Body>
              }
              component={SelectTextField}
              options={batchDenomsOptions}
              native={false}
            />
          )}
          <Field
            name="basketDenom"
            label="Choose basket"
            component={SelectTextField}
            options={finalBasketOptions}
            disabled={hasOneBasketDenom}
            native={false}
          />
          <AmountField
            name="amount"
            label="Amount"
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
            label="Put in basket"
          />
          <BasketPutFormOnChange onBatchDenomChange={onBatchDenomChange} />
        </Form>
      )}
    </Formik>
  );
};

export { BasketPutForm };
