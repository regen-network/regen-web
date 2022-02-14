import React from 'react';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@mui/styles';
import { Theme } from '../../theme/muiTheme';
import Grid from '@mui/material/Grid';

import Submit from './Submit';
import TextField from '../inputs/TextField';
import AmountLabel from '../inputs/AmountLabel';
import Description from '../description';
import CheckboxLabel from '../inputs/CheckboxLabel';
import LocationCountryField from '../inputs/LocationCountryField';
import LocationStateCountryField from '../inputs/LocationStateCountryField';
import ControlledTextField from '../inputs/ControlledTextField';
import Title from '../title';

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
    },
  },
  textField: {
    marginTop: theme.spacing(10.75),
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
    paddingTop: theme.spacing(10.75),
  },
  submit: {
    marginTop: theme.spacing(12.5),
    marginBottom: theme.spacing(12.5),
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
    marginTop: theme.spacing(6),
  },
}));

interface FormProps {
  sender: string;
  batchDenom: string;
  tradableAmount: number;
  onClose: () => void;
}

interface FormValues {
  sender: string;
  recipient: string;
  amount: number;
  // retire
  retire?: boolean;
  amountRetire?: number;
  country: string;
  stateCountry?: string;
  postalCode?: string;
}

interface FormErrors {
  sender?: string;
  recipient?: string;
  amount?: string;
  // retire
  amountRetire?: string;
  country?: string;
  stateCountry?: string;
  postalCode?: string;
}

const CreditTransferForm: React.FC<FormProps> = ({
  sender,
  batchDenom,
  tradableAmount,
  onClose,
}) => {
  const styles = useStyles();

  const initialValues = {
    sender,
    recipient: '',
    amount: 0,
    // retire
    amountRetire: 0,
    country: 'US',
    stateCountry: '',
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
    } else if (values.amount > tradableAmount) {
      errors.amount = insufficientCredits;
    }

    if (values.retire) {
      // retire form validation
      if (!values.country) {
        errors.country = requiredMessage;
      }

      if (!values.amountRetire) {
        errors.amountRetire = requiredMessage;
      } else if (Math.sign(values.amountRetire) !== 1) {
        errors.amountRetire = invalidAmount;
      } else if (values.amountRetire > tradableAmount) {
        errors.amountRetire = insufficientCredits;
      }
    }

    return errors;
  };

  const submitHandler = async (values: FormValues): Promise<any> => {
    console.log('*** submitHandler', values);
    // TODO holder, amount string
  };

  const countryHandler = (countryCode: string): any => {
    console.log('*** countryHandler', countryCode);
  };

  const stateCountryHandler = (stateCountry: string): any => {
    console.log('*** stateCountryHandler', stateCountry);
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
            name="amount"
            type="number"
            component={TextField}
            className={styles.textField}
            label={
              <AmountLabel
                label={'Amount to retire'}
                tradableAmount={tradableAmount}
                batchDenom={batchDenom}
              />
            }
          />

          <Field
            component={CheckboxLabel}
            type="checkbox"
            name="retire"
            className={styles.checkboxLabel}
            label={<Description>Retire credits upon transfer</Description>}
          />

          {values.retire && (
            <>
              <Field
                name="amountRetire"
                type="number"
                component={TextField}
                className={styles.textField}
                label={
                  <AmountLabel
                    label={'Amount to retire'}
                    tradableAmount={tradableAmount}
                    batchDenom={batchDenom}
                  />
                }
              />
              <Title className={styles.groupTitle} variant="h5">
                Location of retirement
              </Title>
              <Description className={styles.description}>
                Please enter a location for the retirement of these credits.
                This prevents double counting of credits in different locations.
              </Description>
              <Grid
                container
                alignItems="center"
                className={styles.stateCountryGrid}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={styles.stateCountryTextField}
                >
                  <LocationStateCountryField
                    country={values.country}
                    triggerOnChange={stateCountryHandler}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={styles.stateCountryTextField}
                >
                  <LocationCountryField triggerOnChange={countryHandler} />
                </Grid>
              </Grid>
              <Field
                className={styles.postalCodeField}
                component={ControlledTextField}
                label="Postal Code"
                name="postalCode"
                optional
              />
            </>
          )}

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
