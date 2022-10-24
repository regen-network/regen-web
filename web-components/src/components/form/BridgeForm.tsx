import React, { useEffect, useState } from 'react';
import { Field, Form, Formik, FormikErrors } from 'formik';

import AmountField from '../inputs/AmountField';
import SelectTextField, { Option } from '../inputs/SelectTextField';
import TextField from '../inputs/TextField';
import { requiredMessage, validateAmount } from '../inputs/validation';
import { RegenModalProps } from '../modal';
import Submit from './Submit';

export interface BridgeProps {
  onSubmit: (values: FormValues) => Promise<void>;
}

interface FormProps extends BridgeProps {
  onClose: RegenModalProps['onClose'];
}

export interface FormValues {}

const BridgeForm: React.FC<FormProps> = ({ onClose, onSubmit }) => {
  const [options, setOptions] = useState<Option[]>([]);

  const initialValues = {
    basketDenom: undefined,
    amount: undefined,
  };

  // useEffect(() => {
  //   basketOptions.unshift({ value: '', label: 'choose basket' });
  //   setOptions(basketOptions);
  // }, [basketOptions]);

  const validateHandler = (values: FormValues): FormikErrors<FormValues> => {
    let errors: FormikErrors<FormValues> = {};

    // if (!values.basketDenom) {
    //   errors.basketDenom = requiredMessage;
    // }
    // const errAmount = validateAmount(availableTradableAmount, values.amount);
    // if (errAmount) errors.amount = errAmount;

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
            name="chain"
            label="Chain"
            component={SelectTextField}
            options={options}
          />
          <Field
            name="recipient"
            type="text"
            label="Recipient"
            component={TextField}
          />
          <AmountField
            name="amount"
            label="Amount"
            availableAmount={11}
            denom={'c03-xyz'}
          />

          <Submit
            isSubmitting={isSubmitting}
            onClose={onClose}
            status={status}
            isValid={isValid}
            submitCount={submitCount}
            submitForm={submitForm}
            label="bridge"
          />
        </Form>
      )}
    </Formik>
  );
};

export { BridgeForm };
