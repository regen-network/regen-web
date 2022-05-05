import React, { useEffect } from 'react';
import { Formik, Form, Field, FormikErrors, useFormikContext } from 'formik';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material';

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
import { RegenModalProps } from '../modal';
import { getISOString } from '../../utils/locationStandard';

/**
 * This form is closely related to the form for send/transfer ecocredits (<CreditSendForm />).
 * In this retire form, some of its components and interfaces are exported in order to be reused in the
 * send/transfer form, since it optionally includes the retirement of ecocredits.
 *
 * Retire retires a specified number of credits in the holder's account.
 * https://docs.regen.network/modules/ecocredit/03_messages.html#msgretire
 *
 * Validation:
 *    holder: must be a valid address, and their signature must be present in the transaction
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

export interface CreditRetireProps extends CreditRetireFieldsProps {
  holder: string;
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

interface RetireFormValuesArray {
  recipients: RetireFormValues[];
  // [key: string]: RetireFormValues[];
}

// type RetireFormValuesArray = Record<string, RetireFormValues[]>;

interface CreditRetireFieldsProps extends BottomCreditRetireFieldsProps {
  batchDenom: string;
  availableTradableAmount: number;
}

export interface BottomCreditRetireFieldsProps {
  mapboxToken: string;
  arrayPrefix?: string;
  arrayIndex?: number;
}

type LocationType = {
  country?: string;
  stateProvince?: string;
  postalCode?: string;
};

export const BottomCreditRetireFields: React.FC<BottomCreditRetireFieldsProps> =
  ({ mapboxToken, arrayPrefix, arrayIndex }) => {
    const styles = useStyles();
    const { values, setFieldValue } = useFormikContext<
      RetireFormValues | RetireFormValuesArray
    >();

    const item =
      typeof arrayIndex === 'number'
        ? (values as RetireFormValuesArray).recipients[arrayIndex]
        : (values as RetireFormValues);

    const { country, stateProvince, postalCode } = item;

    useEffect(() => {
      const retirementLocationName = arrayPrefix
        ? `${arrayPrefix}retirementLocation`
        : 'retirementLocation';

      const setRetirementLocation = async ({
        country,
        stateProvince,
        postalCode,
      }: LocationType): Promise<void> => {
        const isoString = await getISOString(mapboxToken, {
          countryKey: country,
          stateProvince,
          postalCode,
        });
        setFieldValue(retirementLocationName, isoString);
      };

      if (stateProvince || country || postalCode) {
        setRetirementLocation({ country, stateProvince, postalCode });
      }
      if (!country) {
        setFieldValue(retirementLocationName, null);
      }
    }, [
      country,
      stateProvince,
      postalCode,
      setFieldValue,
      mapboxToken,
      arrayPrefix,
      arrayIndex,
    ]);

    return (
      <>
        <Title className={styles.groupTitle} variant="h5">
          Transaction note
        </Title>
        <Field
          name={arrayPrefix ? `${arrayPrefix}note` : 'note'}
          type="text"
          label="Add retirement transaction details (stored in the tx memo)"
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
            <LocationStateField
              country={country}
              optional={!postalCode}
              arrayPrefix={arrayPrefix}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={styles.stateCountryTextField}>
            <LocationCountryField arrayPrefix={arrayPrefix} />
          </Grid>
        </Grid>
        <Field
          component={ControlledTextField}
          label="Postal Code"
          name={arrayPrefix ? `${arrayPrefix}postalCode` : 'postalCode'}
          optional
        />
      </>
    );
  };

export const CreditRetireFields = ({
  batchDenom,
  availableTradableAmount,
  mapboxToken,
  arrayPrefix,
  arrayIndex,
}: CreditRetireFieldsProps): JSX.Element => {
  return (
    <>
      <AmountField
        name={arrayPrefix ? `${arrayPrefix}retiredAmount` : 'retiredAmount'}
        label="Amount to retire"
        availableAmount={availableTradableAmount}
        denom={batchDenom}
      />
      <BottomCreditRetireFields
        mapboxToken={mapboxToken}
        arrayPrefix={arrayPrefix}
        arrayIndex={arrayIndex}
      />
    </>
  );
};

const Label = styled('div')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: theme.typography.pxToRem(16),
  marginTop: theme.spacing(8),
  [theme.breakpoints.up('sm')]: {
    fontSize: theme.typography.pxToRem(18),
  },
}));

const LabelCenter = styled('div')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: theme.typography.pxToRem(16),
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    fontSize: theme.typography.pxToRem(18),
  },
}));

export const RetirementReminder = ({
  centered,
}: {
  centered?: boolean;
}): JSX.Element => {
  const msg = 'Retirement is permanent and non-reversible.';
  if (centered) return <LabelCenter>{msg}</LabelCenter>;
  return <Label>{msg}</Label>;
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
  holder,
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
          <RetirementReminder centered />
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
