import React from 'react';
import { Formik, Form, Field, FormikErrors } from 'formik';
import { makeStyles } from '@mui/styles';
import { Theme } from '../../theme/muiTheme';

import TextField from '../inputs/TextField';
import AmountLabel from '../inputs/AmountLabel';
import Description from '../description';
import CheckboxLabel from '../inputs/CheckboxLabel';
import {
  CreditRetireFields,
  FormValues as RetireFormValues,
  validateCreditRetire,
  initialValues as initialValuesRetire,
} from './CreditRetireForm';
import Submit from './Submit';
import {
  requiredMessage,
  invalidAmount,
  insufficientCredits,
} from '../inputs/validation';

/**
 * Send sends tradable credits from one account to another account.
 * Sent credits can either be tradable or retired on receipt.
 * https://docs.regen.network/modules/ecocredit/03_messages.html#msgsend
 *
 * Validation:
 *    sender: must ba a valid address, and their signature must be present in the transaction
 *    recipient: must ba a valid address
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
      marginTop: theme.spacing(2.25),
    },
  },
  textField: {
    marginTop: theme.spacing(10.75),
    '& .MuiInputBase-formControl': {
      marginTop: theme.spacing(2.25),
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
    marginBottom: theme.spacing(10.75),
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
  groupTitle: {
    marginTop: theme.spacing(10.75),
    marginBottom: theme.spacing(2),
  },
  stateCountryGrid: {
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap',
    },
  },
  stateCountryTextField: {
    marginTop: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      '&:first-of-type': {
        marginRight: theme.spacing(2.375),
      },
      '&:last-of-type': {
        marginLeft: theme.spacing(2.375),
      },
    },
  },
  postalCodeField: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(12.5),
  },
}));

// Output (submit)
interface SendCredits {
  batchDenom: string;
  tradableAmount: string;
  retiredAmount?: string;
  retirementLocation?: string;
}

interface MsgSend {
  sender: string;
  recipient: string;
  credits: SendCredits;
}

// Input (args)
interface FormProps {
  sender: string;
  batchDenom: string;
  availableTradableAmount: number;
  onClose: () => void;
}

interface FormValues extends RetireFormValues {
  sender: string;
  recipient: string;
  tradableAmount: number;
  withRetire?: boolean;
}

const CreditTransferForm: React.FC<FormProps> = ({
  sender,
  batchDenom,
  availableTradableAmount,
  onClose,
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

    if (!values.tradableAmount) {
      errors.tradableAmount = requiredMessage;
    } else if (Math.sign(values.tradableAmount) !== 1) {
      errors.tradableAmount = invalidAmount;
    } else if (values.tradableAmount > availableTradableAmount) {
      errors.tradableAmount = insufficientCredits;
    }

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

  const submitHandler = async (values: FormValues): Promise<MsgSend | void> => {
    // TODO holder, amount string, check withRetire
    console.log('*** submitHandler', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validateHandler}
      onSubmit={submitHandler}
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
            className={styles.textField}
          />
          <Field
            name="tradableAmount"
            type="number"
            component={TextField}
            className={styles.textField}
            label={
              <AmountLabel
                label={'Amount to send'}
                availableAmount={availableTradableAmount}
                batchDenom={batchDenom}
              />
            }
          />

          <Field
            component={CheckboxLabel}
            type="checkbox"
            name="withRetire"
            className={styles.checkboxLabel}
            label={
              <Description className={styles.checkboxDescription}>
                Retire credits upon transfer
              </Description>
            }
          />

          {values.withRetire && (
            <CreditRetireFields
              country={values.country}
              availableTradableAmount={availableTradableAmount}
              batchDenom={batchDenom}
            />
          )}

          <Submit
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
