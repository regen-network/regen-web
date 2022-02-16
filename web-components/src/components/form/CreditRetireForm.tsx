import React from 'react';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import { Theme } from '../../theme/muiTheme';
import TextField from '../inputs/TextField';
import AmountLabel from '../inputs/AmountLabel';
import LocationCountryField from '../inputs/LocationCountryField';
import LocationStateField from '../inputs/LocationStateField';
import ControlledTextField from '../inputs/ControlledTextField';
import Title from '../title';
import Description from '../description';
import Submit from './Submit';
import {
  requiredMessage,
  invalidAmount,
  insufficientCredits,
} from '../inputs/validation';

/**
 * Retire retires a specified number of credits in the holder's account.
 * https://docs.regen.network/modules/ecocredit/03_messages.html#msgretire
 *
 * Validation:
 *    holder: must ba a valid address, and their signature must be present in the transaction
 *    credits: must not be empty (MsgRetire.RetireCredits)
 *      - batch_denom: must be a valid batch denomination
 *      - amount: must be positive (aka retiredAmount)
 *    location: must be a valid location
 *
 * Also:
 * https://docs.regen.network/modules/ecocredit/protobuf.html#msgretire
 * https://docs.regen.network/modules/ecocredit/protobuf.html#msgretire-retirecredits
 */

const useStyles = makeStyles((theme: Theme) => ({
  groupTitle: {
    marginTop: theme.spacing(10.75),
    marginBottom: theme.spacing(2),
  },
  description: {
    '& a': {
      cursor: 'pointer',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(16),
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
      fontSize: theme.typography.pxToRem(14),
    },
  },
  textField: {
    marginTop: theme.spacing(10.75),
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
  submit: {
    marginTop: theme.spacing(12.5),
    marginBottom: theme.spacing(12.5),
  },
}));

// Output (submit)
interface RetireCredits {
  batchDenom: string;
  amount: string; // aka. retiredAmount
}

interface MsgRetire {
  holder: string;
  credits: RetireCredits;
  location: string;
}

// Input (args)
interface FormProps {
  holder: string;
  batchDenom: string;
  availableTradableAmount: number;
  onClose: () => void;
}

export interface RetireFormValues {
  retiredAmount: number;
  country: string;
  stateCountry?: string;
  postalCode?: string;
}

interface FormErrors {
  retiredAmount?: string;
  country?: string;
  stateCountry?: string;
  postalCode?: string;
}

interface CreditRetireFieldsProps {
  country: string;
  batchDenom: string;
  availableTradableAmount: number;
}

export const CreditRetireFields = ({
  country,
  batchDenom,
  availableTradableAmount,
}: CreditRetireFieldsProps): JSX.Element => {
  const styles = useStyles();

  const countryHandler = (countryCode: string): any => {
    console.log('*** countryHandler', countryCode);
  };

  const stateCountryHandler = (stateCountry: string): any => {
    console.log('*** stateCountryHandler', stateCountry);
  };

  return (
    <>
      <Field
        name="retiredAmount"
        type="number"
        component={TextField}
        className={styles.textField}
        label={
          <AmountLabel
            label={'Amount to retire'}
            availableAmount={availableTradableAmount}
            batchDenom={batchDenom}
          />
        }
      />
      <Title className={styles.groupTitle} variant="h5">
        Location of retirement
      </Title>
      <Description className={styles.description}>
        Please enter a location for the retirement of these credits. This
        prevents double counting of credits in different locations.
      </Description>
      <Grid container alignItems="center" className={styles.stateCountryGrid}>
        <Grid item xs={12} sm={6} className={styles.stateCountryTextField}>
          <LocationStateField
            country={country}
            triggerOnChange={stateCountryHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={styles.stateCountryTextField}>
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
  );
};

export const validateCreditRetire = (
  availableTradableAmount: number,
  values: RetireFormValues,
  errors: FormErrors,
): FormErrors => {
  if (!values.country) {
    errors.country = requiredMessage;
  }

  if (!values.retiredAmount) {
    errors.retiredAmount = requiredMessage;
  } else if (Math.sign(values.retiredAmount) !== 1) {
    errors.retiredAmount = invalidAmount;
  } else if (values.retiredAmount > availableTradableAmount) {
    errors.retiredAmount = insufficientCredits;
  }

  return errors;
};

const CreditRetireForm: React.FC<FormProps> = ({
  holder,
  batchDenom,
  availableTradableAmount,
  onClose,
}) => {
  const styles = useStyles();

  const initialValues = {
    retiredAmount: 0,
    country: 'US',
    stateCountry: '',
  };

  const validateHandler = (values: RetireFormValues): FormErrors => {
    let errors: FormErrors = {};
    errors = validateCreditRetire(availableTradableAmount, values, errors);
    return errors;
  };

  const submitHandler = async (
    values: RetireFormValues,
  ): Promise<MsgRetire | void> => {
    // TODO
    // add holder,
    // retiredAmount to string,
    // location codification (country + state)
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
          <CreditRetireFields
            country={values.country}
            availableTradableAmount={availableTradableAmount}
            batchDenom={batchDenom}
          />
          <Submit
            className={styles.submit}
            isSubmitting={isSubmitting}
            onClose={onClose}
            status={status}
            isValid={isValid}
            submitCount={submitCount}
            submitForm={submitForm}
            label={'Retire'}
          />
        </Form>
      )}
    </Formik>
  );
};

export { CreditRetireForm };
