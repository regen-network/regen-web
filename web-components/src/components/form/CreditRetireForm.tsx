import React from 'react';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { Theme } from '../../theme/muiTheme';
import TextField from '../inputs/TextField';
import LabelWithHelperText from '../inputs/LabelWithHelperText';
import LocationCountryField from '../inputs/LocationCountryField';
import LocationStateCountryField from '../inputs/LocationStateCountryField';
import ControlledTextField from '../inputs/ControlledTextField';
import Title from '../title';
import Description from '../description';
import {
  requiredMessage,
  invalidAmount,
  insufficientCredits,
} from '../inputs/validation';

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
}

interface FormValues {
  // sender: string;
  amount: number;
  country: string;
  stateCountry?: string;
  postalCode?: string;
}

interface FormErrors {
  // sender?: string;
  amount?: string;
  country?: string;
  stateCountry?: string;
  postalCode?: string;
}

const CreditRetireForm: React.FC<FormProps> = ({
  sender,
  available,
  onClose,
}) => {
  const styles = useStyles();

  const initialValues = {
    // sender,
    amount: 0,
    country: 'US',
    stateCountry: '',
  };

  const validateHandler = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};

    // if (!values.sender) {
    //   errors.sender = requiredMessage;
    // }

    if (!values.country) {
      errors.country = requiredMessage;
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

  const submitHandler = async (values: any): Promise<any> => {
    console.log('*** submitHandler', values);
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
      {({
        values,
        // errors,
        // submitForm,
        // isSubmitting,
        // isValid,
        // submitCount,
        // setFieldValue,
        // status,
      }) => (
        <Form>
          {/* <Field
            disabled
            component={TextField}
            type="text"
            label="Sender"
            name="sender"
          /> */}

          <Field
            name="amount"
            type="number"
            component={TextField}
            className={styles.textField}
            label={
              <LabelWithHelperText
                label={'Amount to retire'}
                available={available}
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
          <Grid
            container
            alignItems="center"
            className={styles.stateCountryGrid}
          >
            <Grid item xs={12} sm={6} className={styles.stateCountryTextField}>
              <LocationStateCountryField
                country={values.country}
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
        </Form>
      )}
    </Formik>
  );
};

export { CreditRetireForm };
