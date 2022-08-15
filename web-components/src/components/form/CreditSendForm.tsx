import React from 'react';
import { makeStyles } from '@mui/styles';
import { Field, Form, Formik, FormikErrors } from 'formik';

import { Theme } from '../../theme/muiTheme';
import AmountField from '../inputs/AmountField';
import CheckboxLabel from '../inputs/CheckboxLabel';
import TextField from '../inputs/TextField';
import {
  insufficientCredits,
  requiredMessage,
  validateAmount,
} from '../inputs/validation';
import { RegenModalProps } from '../modal';
import { Subtitle } from '../typography';
import {
  BottomCreditRetireFieldsProps,
  CreditRetireFields,
  initialValues as initialValuesRetire,
  RetireFormValues,
  RetirementReminder,
  validateCreditRetire,
} from './CreditRetireForm';
import Submit from './Submit';

/**
 * Send sends tradable credits from one account to another account.
 * Sent credits can either be tradable or retired on receipt.
 * https://buf.build/regen/regen-ledger/docs/main:regen.ecocredit.v1#regen.ecocredit.v1.Msg.Send
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
 */

const useStyles = makeStyles((theme: Theme) => ({
  checkboxLabel: {
    marginTop: theme.spacing(10.75),
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

    if (!values.withRetire) {
      const errAmount = validateAmount(
        availableTradableAmount,
        values.tradableAmount,
      );
      if (errAmount) errors.tradableAmount = errAmount;
    }

    // Retire form validation (optional subform)
    if (values.withRetire) {
      // also check tradable amount because with retirement is allowed to be zero
      const errAmount = validateAmount(
        availableTradableAmount,
        values.tradableAmount,
        undefined,
        true, //zero allowed
      );
      if (errAmount) errors.tradableAmount = errAmount;

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
              <Subtitle size="lg" color="primary.contrastText">
                Send additional retired credits
              </Subtitle>
            }
          />

          {values.withRetire && (
            <>
              <RetirementReminder sx={{ mt: 8 }} />
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
