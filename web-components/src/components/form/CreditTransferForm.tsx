import React from 'react';
import { Formik, Form, Field } from 'formik';
import Grid from '@mui/material/Grid';
import ContainedButton from '../buttons/ContainedButton';
import TextField from '../inputs/TextField';
import AmountField from '../inputs/AmountField';
import { requiredMessage, invalidAmount } from '../inputs/validation';

// TODO: sender and recipient types,
// with specific restrictions => valid Regen/Cosmos address
// type regenAddress | CosmosAddress = string;
// "regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4"

interface FormProps {
  sender: string;
  children?: JSX.Element;
}

interface FormValues {
  sender: string;
  recipient: string;
  amount: number | undefined;
}

interface FormErrors {
  sender?: string;
  recipient?: string;
  amount?: string;
}

const CreditTransferForm: React.FC<FormProps> = ({ sender, children }) => {
  const initialValues = {
    sender,
    recipient: '',
    amount: undefined,
  };

  const validateHandler = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};
    if (!values.sender) {
      errors.sender = requiredMessage;
    }
    if (!values.recipient) {
      errors.recipient = requiredMessage;
    }
    // amount validation... order matters.
    // something weird with "===" strict comparision
    // TODO only positive number
    if (values.amount == 0) {
      errors.amount = invalidAmount;
    }
    if (!values.amount) {
      errors.amount = requiredMessage;
    }
    return errors;
  };

  const submitHandler = async (values: any): Promise<any> => {
    console.log('*** Submit', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validateHandler}
      onSubmit={submitHandler}
    >
      {({
        // values,
        // errors,
        submitForm,
        isSubmitting,
        isValid,
        submitCount,
        // setFieldValue,
        // status,
      }) => (
        <Form>
          <Field
            disabled
            component={TextField}
            type="text"
            label="Sender"
            name="sender"
          />
          <Field
            component={TextField}
            type="text"
            label="Recipient"
            name="recipient"
          />
          <AmountField
            label={'Amount to send'}
            available={{ amount: 1000, type: 'C01-20190101-20201010-02' }}
          />
          {children}
          <Grid container justifyContent="flex-end">
            <ContainedButton
              onClick={submitForm}
              // className={classes.button}
              disabled={(submitCount > 0 && !isValid) || isSubmitting}
            >
              {'Transfer'}
            </ContainedButton>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export { CreditTransferForm };
