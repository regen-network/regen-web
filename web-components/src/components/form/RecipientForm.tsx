import React from 'react';
import { Formik, Form, Field, FormikErrors } from 'formik';
import { makeStyles } from '@mui/styles';

import { Theme } from '../../theme/muiTheme';
import TextField from '../inputs/TextField';
import AmountField from '../inputs/AmountField';
import Description from '../description';
import CheckboxLabel from '../inputs/CheckboxLabel';
import {
  CreditRetireFields,
  RetireFormValues,
  validateCreditRetire,
  initialValues as initialValuesRetire,
  BottomCreditRetireFieldsProps,
} from './CreditRetireForm';
// import Submit from './Submit';
import {
  requiredMessage,
  insufficientCredits,
  validateAmount,
} from '../inputs/validation';

const useStyles = makeStyles((theme: Theme) => ({
  //   senderField: {
  //     '& label': {
  //       color: `${theme.palette.primary.contrastText} !important`,
  //     },
  //     '& .MuiInputBase-formControl': {
  //       backgroundColor: theme.palette.info.light,
  //     },
  //   },
  description: {
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4),
    },
    '& a': {
      cursor: 'pointer',
    },
  },
  checkboxLabel: {
    marginTop: theme.spacing(10.75),
    alignItems: 'initial',
    '& .MuiCheckbox-root': {
      alignSelf: 'end',
    },
  },
  checkboxDescription: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.spacing(4.5),
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),
  },
}));

export interface FormProps extends BottomCreditRetireFieldsProps {
  sender: string;
  batchDenom: string;
  availableTradableAmount: number;
  onSubmit: (values: FormValues) => Promise<void>;
}

export interface FormValues extends RetireFormValues {
  sender: string;
  recipient: string;
  tradableAmount: number;
  withRetire?: boolean;
}

export const RecipientForm: React.FC<FormProps> = ({
  sender,
  batchDenom,
  availableTradableAmount,
  mapboxToken,
  // onClose,
  onSubmit,
}) => {
  const styles = useStyles();

  const initialValues = {
    sender,
    recipient: '',
    tradableAmount: 0,
    withRetire: false,
    ...initialValuesRetire,
  };

  const validateHandler = (values: FormValues): FormikErrors<FormValues> => {
    let errors: FormikErrors<FormValues> = {};

    if (!values.sender) {
      errors.sender = requiredMessage;
    }

    if (!values.recipient) {
      errors.recipient = requiredMessage;
    }

    const errAmount = validateAmount(
      availableTradableAmount,
      values.tradableAmount,
    );
    if (errAmount) errors.tradableAmount = errAmount;

    // Retire form validation (optional subform)
    if (values.withRetire) {
      errors = validateCreditRetire(availableTradableAmount, values, errors);

      // combo validation: issuance + retire
      if (
        Number(values.tradableAmount) + Number(values.retiredAmount) >
        availableTradableAmount
      ) {
        errors.tradableAmount = insufficientCredits;
        errors.retiredAmount = insufficientCredits;
      }
    }

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
          {/* <Field
            name="sender"
            type="text"
            label="Sender"
            component={TextField}
            className={styles.senderField}
            disabled
          /> */}
          <Field
            name="recipient"
            type="text"
            label="Recipient address"
            component={TextField}
          />
          <AmountField
            name={'tradableAmount'}
            label={'Amount'}
            availableAmount={availableTradableAmount}
            denom={batchDenom}
          />

          <Field
            component={CheckboxLabel}
            type="checkbox"
            name="withRetire"
            className={styles.checkboxLabel}
            label={
              <Description className={styles.checkboxDescription}>
                Retire credits upon issuance
              </Description>
            }
          />

          {values.withRetire && (
            <CreditRetireFields
              availableTradableAmount={availableTradableAmount}
              batchDenom={batchDenom}
              mapboxToken={mapboxToken}
            />
          )}

          {/* <Submit
            isSubmitting={isSubmitting}
            onClose={onClose}
            status={status}
            isValid={isValid}
            submitCount={submitCount}
            submitForm={submitForm}
            label={'Send'}
          /> */}
        </Form>
      )}
    </Formik>
  );
};
