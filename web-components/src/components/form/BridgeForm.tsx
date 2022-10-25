import React from 'react';
import { Field, Form, Formik, FormikErrors } from 'formik';

import AgreeErpaCheckbox from '../inputs/AgreeErpaCheckbox';
import AmountField from '../inputs/AmountField';
import FormLabel from '../inputs/FormLabel';
import SelectTextField from '../inputs/SelectTextField';
import TextField from '../inputs/TextField';
import {
  requirementAgreement,
  validateAmount,
  validatePolygonAddress,
} from '../inputs/validation';
import { RegenModalProps } from '../modal';
import Submit from './Submit';

export interface BridgeProps {
  batchDenom: string;
  availableBridgeableAmount: number;
  onSubmit: (values: FormValues) => Promise<void>;
}

interface FormProps extends BridgeProps {
  onClose: RegenModalProps['onClose'];
}

export interface FormValues {
  recipient: string;
  amount?: number;
  agreeErpa: boolean;
}

const BridgeForm = ({
  onClose,
  onSubmit,
  availableBridgeableAmount,
  batchDenom,
}: FormProps): JSX.Element => {
  const initialValues = {
    amount: undefined,
    recipient: '',
    agreeErpa: false,
    batchDenom,
  };

  const validateHandler = (values: FormValues): FormikErrors<FormValues> => {
    let errors: FormikErrors<FormValues> = {};

    const errRecipient = validatePolygonAddress(values.recipient);
    if (errRecipient) errors.recipient = errRecipient;

    const errAmount = validateAmount(availableBridgeableAmount, values.amount);
    if (errAmount) errors.amount = errAmount;

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
            availableAmount={availableBridgeableAmount}
            denom={batchDenom}
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
