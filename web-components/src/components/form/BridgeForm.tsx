import React, { useEffect, useState } from 'react';
import { Field, Form, Formik, FormikErrors } from 'formik';

import { Box } from '../box';
import AgreeErpaCheckbox from '../inputs/AgreeErpaCheckbox';
import AmountField from '../inputs/AmountField';
import FormLabel from '../inputs/FormLabel';
import SelectTextField from '../inputs/SelectTextField';
import TextField from '../inputs/TextField';
import { requirementAgreement } from '../inputs/validation';
import { RegenModalProps } from '../modal';
import Submit from './Submit';

export interface BridgeProps {
  onSubmit: (values: FormValues) => Promise<void>;
}

interface FormProps extends BridgeProps {
  onClose: RegenModalProps['onClose'];
}

export interface FormValues {
  agreeErpa: boolean;
}

const BridgeForm: React.FC<FormProps> = ({ onClose, onSubmit }) => {
  const initialValues = {
    batchDenom: undefined,
    amount: undefined,
    agreeErpa: false,
  };

  const validateHandler = (values: FormValues): FormikErrors<FormValues> => {
    let errors: FormikErrors<FormValues> = {};

    // if (!values.basketDenom) {
    //   errors.basketDenom = requiredMessage;
    // }
    // const errAmount = validateAmount(availableTradableAmount, values.amount);
    // if (errAmount) errors.amount = errAmount;
    if (!values.agreeErpa) errors.agreeErpa = requirementAgreement;

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
            options={[{ label: 'Polygon', value: 'polygon' }]}
            disabled
          />
          <Field
            name="recipient"
            type="text"
            label={
              <FormLabel
                label="Recipient"
                description="This is the polygon address of the recipient."
              />
            }
            component={TextField}
          />
          <AmountField
            name="amount"
            label="Amount"
            availableAmount={11}
            denom={'c03-xyz'}
          />
          <AgreeErpaCheckbox sx={{ mt: 10 }} />
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
