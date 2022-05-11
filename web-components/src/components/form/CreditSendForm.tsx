import React from 'react';
import { Formik, Form, Field, FormikErrors } from 'formik';
import { makeStyles } from '@mui/styles';
import cx from 'clsx';

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
  RetirementReminder,
} from './CreditRetireForm';
import Submit from './Submit';
import {
  requiredMessage,
  insufficientCredits,
  validateAmount,
} from '../inputs/validation';
import { RegenModalProps } from '../modal';

/**
 * Send sends tradable credits from one account to another account.
 * Sent credits can either be tradable or retired on receipt.
 * https://docs.regen.network/modules/ecocredit/03_messages.html#msgsend
 *
 * Validation:
 *    sender: must be a valid address, and their signature must be present in the transaction
 *    recipient: must be a valid address
 *    credits: must not be empty
 *    batch_denom: must be a valid batch denomination
 *    tradable_amount: must not be negative
 *    retired_amount: must not be negative
 *  if retired_amount is positive:
 *    retirement_location: must be a valid location
 *
 * Also:
 * https://docs.regen.network/modules/ecocredit/protobuf.html#msgsend
 * https://docs.regen.network/modules/ecocredit/protobuf.html#msgsend-sendcredits
 */

const useStyles = makeStyles((theme: Theme) => ({
  senderField: {
    '& label': {
      color: `${theme.palette.primary.contrastText} !important`,
    },
    '& .MuiInputBase-formControl': {
      backgroundColor: theme.palette.info.light,
    },
  },
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

export interface CreditSendProps extends BottomCreditRetireFieldsProps {
  sender: string;
  batchDenom: string;
  availableTradableAmount: number;
  onSubmit: (values: FormValues) => Promise<void>;
}

interface FormProps extends CreditSendProps {
  onClose: RegenModalProps['onClose'];
}

export interface FormValues extends RetireFormValues {
  sender: string;
  recipient: string;
  tradableAmount: number;
  withRetire?: boolean;
}

const CreditSendForm: React.FC<FormProps> = ({
  sender,
  batchDenom,
  availableTradableAmount,
  mapboxToken,
  onClose,
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

      // combo validation: send + retire
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
          />
          <AmountField
            name={'tradableAmount'}
            label={'Amount tradable'}
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
                Send additional retired credits
              </Description>
            }
          />

          {values.withRetire && (
            <>
              <RetirementReminder />
              <CreditRetireFields
                availableTradableAmount={availableTradableAmount}
                batchDenom={batchDenom}
                mapboxToken={mapboxToken}
              />
            </>
          )}

          <Submit
            isSubmitting={isSubmitting}
            onClose={onClose}
            status={status}
            isValid={isValid}
            submitCount={submitCount}
            submitForm={submitForm}
            label={'Send'}
          />
        </Form>
      )}
    </Formik>
  );
};

export { CreditSendForm };
