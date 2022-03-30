import React from 'react';
import { Formik, Form, Field, FormikErrors } from 'formik';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import { Theme } from '../../theme/muiTheme';
import TextField from '../inputs/TextField';
import AmountField from '../inputs/AmountField';
import LocationCountryField from '../inputs/LocationCountryField';
import LocationStateField from '../inputs/LocationStateField';
import ControlledTextField from '../inputs/ControlledTextField';
import Title from '../title';
import Description from '../description';
import Submit from './Submit';
import { requiredMessage, validateAmount } from '../inputs/validation';

/**
 * This form is closely related to the form for send/transfer ecocredits (<CreditSendForm />).
 * In this retire form, some of its components and interfaces are exported in order to be reused in the
 * send/transfer form, since it optionally includes the retirement of ecocredits.
 *
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
    marginBottom: theme.spacing(3),
  },
  description: {
    marginBottom: 0,
    '& a': {
      cursor: 'pointer',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(16),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  noteTextField: {
    '& label': {
      whiteSpace: 'unset',
    },
  },
  stateCountryGrid: {
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap',
    },
  },
  stateCountryTextField: {
    marginTop: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      '&:first-of-type': {
        marginRight: theme.spacing(2.375),
      },
      '&:last-of-type': {
        marginLeft: theme.spacing(2.375),
      },
    },
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
  // TODO note (aka. memoNote)
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
  note: string;
  country: string;
  stateProvince?: string;
  postalCode?: string;
}

interface CreditRetireFieldsProps {
  country: string;
  batchDenom: string;
  availableTradableAmount: number;
}

interface BottomCreditRetireFieldsProps {
  country: string;
}

export const BottomCreditRetireFields = ({
  country,
}: BottomCreditRetireFieldsProps): JSX.Element => {
  const styles = useStyles();

  return (
    <>
      <Title className={styles.groupTitle} variant="h5">
        Transaction note
      </Title>
      <Field
        name="note"
        type="text"
        label="Add retirement transaction details (stored in the transaction note)"
        component={TextField}
        className={styles.noteTextField}
        optional
        defaultStyle={false}
      />
      <Title className={styles.groupTitle} variant="h5">
        Location of retirement
      </Title>
      <Description className={styles.description}>
        Please enter a location for the retirement of these credits. This
        prevents double counting of credits in different locations.
      </Description>
      <Grid container className={styles.stateCountryGrid}>
        <Grid item xs={12} sm={6} className={styles.stateCountryTextField}>
          <LocationStateField country={country} optional />
        </Grid>
        <Grid item xs={12} sm={6} className={styles.stateCountryTextField}>
          <LocationCountryField />
        </Grid>
      </Grid>
      <Field
        component={ControlledTextField}
        label="Postal Code"
        name="postalCode"
        optional
      />
    </>
  );
};

export const CreditRetireFields = ({
  country,
  batchDenom,
  availableTradableAmount,
}: CreditRetireFieldsProps): JSX.Element => {
  const styles = useStyles();
  return (
    <>
      <AmountField
        name="retiredAmount"
        label="Amount to retire"
        availableAmount={availableTradableAmount}
        batchDenom={batchDenom}
        className={styles.textField}
      />
      <BottomCreditRetireFields country={country} />
    </>
  );
};

export const validateCreditRetire = (
  availableTradableAmount: number,
  values: RetireFormValues,
  errors: FormikErrors<RetireFormValues>,
): FormikErrors<RetireFormValues> => {
  if (!values.country) {
    errors.country = requiredMessage;
  }

  errors.retiredAmount = validateAmount(
    availableTradableAmount,
    values.retiredAmount,
  );

  return errors;
};

export const initialValues = {
  retiredAmount: 0,
  note: '',
  country: '',
  stateProvince: '',
};

const CreditRetireForm: React.FC<FormProps> = ({
  holder,
  batchDenom,
  availableTradableAmount,
  onClose,
}) => {
  const validateHandler = (values: RetireFormValues): FormikErrors<RetireFormValues> => {
    let errors: FormikErrors<RetireFormValues> = {};
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
