import React from 'react';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@mui/styles';
import { Theme } from '../../theme/muiTheme';
import Submit from './Submit';
import TextField from '../inputs/TextField';
import LabelWithHelperText from '../inputs/LabelWithHelperText';
import {
  requiredMessage,
  invalidAmount,
  insufficientCredits,
} from '../inputs/validation';

const useStyles = makeStyles((theme: Theme) => ({
  senderField: {
    '& label': {
      color: `${theme.palette.primary.contrastText} !important`,
    },
    '& .MuiInputBase-formControl': {
      backgroundColor: theme.palette.info.light,
    },
  },
  textField: {
    marginTop: theme.spacing(10.75),
  },
  submit: {
    marginTop: theme.spacing(12.5),
    marginBottom: theme.spacing(12.5),
  },
}));

// TODO: sender and recipient types,
// with specific restrictions => valid Regen/Cosmos address
// type regenAddress | CosmosAddress = string;
// "regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4"

interface FormProps {
  sender: string;
  available: {
    amount: number;
    type: string;
  };
  onClose: () => void;
  children?: JSX.Element;
}

interface FormValues {
  sender: string;
  recipient: string;
  amount: number;
}

interface FormErrors {
  sender?: string;
  recipient?: string;
  amount?: string;
}

const CreditTransferForm: React.FC<FormProps> = ({
  sender,
  available,
  onClose,
  children,
}) => {
  const styles = useStyles();

  const initialValues = {
    sender,
    recipient: '',
    amount: 0,
  };

  const validateHandler = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};

    if (!values.sender) {
      errors.sender = requiredMessage;
    }

    if (!values.recipient) {
      errors.recipient = requiredMessage;
    }

    if (!values.amount) {
      errors.amount = requiredMessage;
    } else if (Math.sign(values.amount) !== 1) {
      errors.amount = invalidAmount;
    } else if (values.amount > available.amount) {
      errors.amount = insufficientCredits;
    }

    return errors;
  };

  const submitHandler = async (values: FormValues): Promise<any> => {
    console.log('*** submitHandler', values);
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
        status,
      }) => (
        <Form>
          <Field
            name="sender"
            type="text"
            label="Sender"
            component={TextField}
            className={styles.senderField}
            disabled
          />
          <Field
            name="recipient"
            type="text"
            label="Recipient"
            component={TextField}
            className={styles.textField}
          />
          <Field
            name="amount"
            type="number"
            component={TextField}
            className={styles.textField}
            label={
              <LabelWithHelperText
                label={'Amount to send'}
                available={available}
              />
            }
          />
          {children}
          <Submit
            className={styles.submit}
            isSubmitting={isSubmitting}
            onClose={onClose}
            status={status}
            isValid={isValid}
            submitCount={submitCount}
            submitForm={submitForm}
            label={'Transfer'}
          />
        </Form>
      )}
    </Formik>
  );
};

export { CreditTransferForm };
