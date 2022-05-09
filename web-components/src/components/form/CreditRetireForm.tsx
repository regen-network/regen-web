import React, { useEffect } from 'react';
import { Formik, Form, Field, FormikErrors, useFormikContext } from 'formik';
import { makeStyles } from '@mui/styles';
import { SxProps, Grid } from '@mui/material';

import { Theme } from '../../theme/muiTheme';
import TextField from '../inputs/TextField';
import AmountField from '../inputs/AmountField';
import LocationCountryField from '../inputs/LocationCountryField';
import LocationStateField from '../inputs/LocationStateField';
import ControlledTextField from '../inputs/ControlledTextField';
import { Body, Title } from '../typography';
import Submit from './Submit';
import { requiredMessage, validateAmount } from '../inputs/validation';
import { RegenModalProps } from '../modal';
import { getISOString } from '../../utils/locationStandard';

/**
 * This form is closely related to the form for send/transfer ecocredits (<CreditSendForm />).
 * In this retire form, some of its components and interfaces are exported in order to be reused in the
 * send/transfer form, since it optionally includes the retirement of ecocredits.
 *
 * Retire retires a specified number of credits in the holder's account.
 * https://buf.build/regen/regen-ledger/docs/main:regen.ecocredit.v1#regen.ecocredit.v1.Msg.Retire
 *
 * Validation:
 *    holder: must be a valid address, and their signature must be present in the transaction
 *    credits: must not be empty (MsgRetire.RetireCredits)
 *      - batch_denom: must be a valid batch denomination
 *      - amount: must be positive (aka retiredAmount)
 *    location: must be a valid location
 */

const useStyles = makeStyles((theme: Theme) => ({
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

export interface CreditRetireProps extends CreditRetireFieldsProps {
  onSubmit: (values: RetireFormValues) => void;
}

// Input (args)
interface FormProps extends CreditRetireProps {
  onClose: RegenModalProps['onClose'];
}

export interface MetaRetireFormValues {
  note?: string;
  country: string;
  stateProvince?: string;
  postalCode?: string;
  retirementLocation?: string;
}

export interface RetireFormValues extends MetaRetireFormValues {
  retiredAmount: number;
}

interface CreditRetireFieldsProps extends BottomCreditRetireFieldsProps {
  batchDenom: string;
  availableTradableAmount: number;
}

const sxs = {
  title: {
    mt: 10.75,
    mb: 3,
  } as SxProps,
};

export interface BottomCreditRetireFieldsProps {
  mapboxToken: string;
}

export const BottomCreditRetireFields: React.FC<BottomCreditRetireFieldsProps> =
  ({ mapboxToken }) => {
    const styles = useStyles();
    const {
      values: { country, stateProvince, postalCode },
      setFieldValue,
    } = useFormikContext<RetireFormValues>();

    useEffect(() => {
      const setRetirementLocation = async (): Promise<void> => {
        const isoString = await getISOString(mapboxToken, {
          countryKey: country,
          stateProvince,
          postalCode,
        });
        setFieldValue('retirementLocation', isoString);
      };

      if (stateProvince || country || postalCode) {
        setRetirementLocation();
      }
      if (!country) {
        setFieldValue('retirementLocation', null);
      }
    }, [country, stateProvince, postalCode, setFieldValue, mapboxToken]);

    return (
      <>
        <Title variant="h5" sx={sxs.title}>
          Transaction note
        </Title>
        <Field
          name="note"
          type="text"
          label="Add retirement transaction details (stored in the tx memo)"
          component={TextField}
          className={styles.noteTextField}
          optional
          defaultStyle={false}
        />
        <Title variant="h5" sx={sxs.title}>
          Location of retirement
        </Title>

        <Body>
          Please enter a location for the retirement of these credits. This
          prevents double counting of credits in different locations.
        </Body>
        <Grid container className={styles.stateCountryGrid}>
          <Grid item xs={12} sm={6} className={styles.stateCountryTextField}>
            <LocationStateField country={country} optional={!postalCode} />
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
  batchDenom,
  availableTradableAmount,
  mapboxToken,
}: CreditRetireFieldsProps): JSX.Element => {
  return (
    <>
      <AmountField
        name="retiredAmount"
        label="Amount to retire"
        availableAmount={availableTradableAmount}
        denom={batchDenom}
      />
      <BottomCreditRetireFields mapboxToken={mapboxToken} />
    </>
  );
};

export const RetirementReminder = ({
  sx,
}: {
  sx?: SxProps<Theme>;
}): JSX.Element => {
  // const msg = 'Retirement is permanent and non-reversible.';
  return (
    <Body size="lg" color="black" sx={sx}>
      Retirement is permanent and non-reversible.
    </Body>
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
  if (values.postalCode && !values.stateProvince) {
    errors.stateProvince = 'Required with postal code';
  }
  const errAmount = validateAmount(
    availableTradableAmount,
    values.retiredAmount,
  );
  if (errAmount) errors.retiredAmount = errAmount;

  return errors;
};

export const initialValues = {
  retiredAmount: 0,
  note: '',
  country: 'US',
  stateProvince: '',
};

const CreditRetireForm: React.FC<FormProps> = ({
  batchDenom,
  availableTradableAmount,
  mapboxToken,
  onClose,
  onSubmit,
}) => {
  const validateHandler = (
    values: RetireFormValues,
  ): FormikErrors<RetireFormValues> => {
    let errors: FormikErrors<RetireFormValues> = {};
    errors = validateCreditRetire(availableTradableAmount, values, errors);
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
          <RetirementReminder sx={{ textAlign: 'center' }} />
          <CreditRetireFields
            availableTradableAmount={availableTradableAmount}
            batchDenom={batchDenom}
            mapboxToken={mapboxToken}
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
