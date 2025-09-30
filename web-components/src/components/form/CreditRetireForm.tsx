import React, { lazy, Suspense, useEffect } from 'react';
import { Grid, SxProps } from '@mui/material';
import { Field, Form, Formik, FormikErrors, useFormikContext } from 'formik';
import { makeStyles } from 'tss-react/mui';

import { Theme } from '../../theme/muiTheme';
import { RegenModalPropsWithOnClose } from '../../types/shared/modalPropsWithOnClose';
import { getJurisdictionIsoCode } from '../../utils/locationStandard';
import { Flex } from '../box';
import AmountField from '../inputs/AmountField';
import ControlledTextField from '../inputs/ControlledTextField';
import SelectFieldFallback from '../inputs/SelectFieldFallback';
import TextField from '../inputs/TextField';
import { validateAmount, validateMemoLength } from '../inputs/validation';
import InfoTooltipWithIcon from '../tooltip/InfoTooltipWithIcon';
import { Body, Title } from '../typography';
import Submit from './Submit';

const LocationCountryField = lazy(
  () => import('../inputs/LocationCountryField'),
);
const LocationStateField = lazy(() => import('../inputs/LocationStateField'));

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
 *    jurisdiction: valid iso-3166 code, 3 options:
 *      | country code: iso-3166-1
 *      | subdivision code: iso-3166-2
 *      | subdivision code with postal code: `${iso-3166-2} ${postalCode}`
 */

const useStyles = makeStyles()((theme: Theme) => ({
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
  maxLabel: string;
  availableLabel: string;
}

// Input (args)
interface FormProps extends CreditRetireProps {
  submitLabel: string;
  submitErrorText: string;
  retirementInfoText: string;
  stateProvinceError: string;
  maxLabel: string;
  availableLabel: string;
  requiredMessage: string;
  invalidMemoLength: string;
  invalidAmount: string;
  insufficientCredits: string;
  invalidDecimalCount: string;
  onSubmit: (values: RetireFormValues) => void;
  onClose: RegenModalPropsWithOnClose['onClose'];
}

export interface MetaRetireFormValues {
  note?: string;
  country: string;
  stateProvince?: string;
  postalCode?: string;
  retirementJurisdiction?: string;
}

export interface RetireFormValues extends MetaRetireFormValues {
  retiredAmount: number;
}

interface RetireFormValuesArray {
  recipients: RetireFormValues[];
}

interface CreditRetireFieldsProps extends BottomCreditRetireFieldsProps {
  batchDenom: string;
  availableTradableAmount: number;
  amountRetiredLabel: string;
}

const sxs = {
  title: {
    mt: 10.75,
    mb: 3,
  } as SxProps,
};

export type BottomTextMapping = {
  title: string;
  tooltip: string;
  reasonLabel: string;
  locationTitle: string;
  locationTooltip: string;
  locationDescription: string;
  countryLabel: string;
  stateLabel: string;
  postalCodeLabel: string;
  locationStatePlaceholderLabel: string;
  countryLabelPlaceholder: string;
};
export interface BottomCreditRetireFieldsProps {
  mapboxToken: string;
  arrayPrefix?: string;
  arrayIndex?: number;
  bottomTextMapping: BottomTextMapping;
}

export const BottomCreditRetireFields: React.FC<
  React.PropsWithChildren<BottomCreditRetireFieldsProps>
> = ({ mapboxToken, arrayPrefix = '', arrayIndex, bottomTextMapping }) => {
  const { classes: styles } = useStyles();
  const { values, setFieldValue } = useFormikContext<
    RetireFormValues | RetireFormValuesArray
  >();
  const item =
    typeof arrayIndex === 'number'
      ? (values as RetireFormValuesArray).recipients[arrayIndex]
      : (values as RetireFormValues);

  const { country, stateProvince, postalCode } = item;

  const {
    countryLabel,
    stateLabel,
    postalCodeLabel,
    locationDescription,
    locationTitle,
    locationTooltip,
    reasonLabel,
    title,
    tooltip,
    locationStatePlaceholderLabel,
    countryLabelPlaceholder,
  } = bottomTextMapping;

  useEffect(() => {
    const retirementJurisdictionName = `${arrayPrefix}retirementJurisdiction`;

    if (!country) {
      setFieldValue(retirementJurisdictionName, null);
      return;
    }

    const jurisdiction = getJurisdictionIsoCode({
      country,
      stateProvince,
      postalCode,
    });

    setFieldValue(retirementJurisdictionName, jurisdiction);
  }, [
    country,
    stateProvince,
    postalCode,
    setFieldValue,
    mapboxToken,
    arrayPrefix,
  ]);

  // showNotesField
  // When in the same form we have a set of credit retirement (for example,
  // because there are several recipients when we issue a batch of credits),
  // we only show the retirement note fields for the first occurrence (first recipient)
  const noArray = arrayPrefix === '' && typeof arrayIndex === 'undefined';
  const isFirstItem = !noArray && arrayIndex === 0;
  const showNotesField = noArray || isFirstItem;

  return (
    <>
      {showNotesField && (
        <>
          <Flex sx={sxs.title}>
            <Title variant="h5" sx={{ mr: 2 }}>
              {title}
            </Title>
            <InfoTooltipWithIcon title={tooltip} />
          </Flex>
          <Field
            name={`${arrayPrefix}note`}
            type="text"
            label={reasonLabel}
            component={TextField}
            className={styles.noteTextField}
            optional
            defaultStyle={false}
          />
        </>
      )}
      <Flex sx={sxs.title}>
        <Title variant="h5" sx={{ mr: 2 }}>
          {locationTitle}
        </Title>
        <InfoTooltipWithIcon title={locationTooltip} />
      </Flex>

      <Body>{locationDescription}</Body>
      <Grid container className={styles.stateCountryGrid}>
        <Grid item xs={12} sm={6} className={styles.stateCountryTextField}>
          <Suspense
            fallback={
              <SelectFieldFallback
                label={countryLabel}
                name={`${arrayPrefix}country`}
              />
            }
          >
            <LocationCountryField
              exclude
              name={`${arrayPrefix}country`}
              label={countryLabel}
              countryLabelPlaceholder={countryLabelPlaceholder}
            />
          </Suspense>
        </Grid>
        <Grid item xs={12} sm={6} className={styles.stateCountryTextField}>
          <Suspense
            fallback={
              <SelectFieldFallback
                label={stateLabel}
                name={`${arrayPrefix}stateProvince`}
                optional={!postalCode}
              />
            }
          >
            <LocationStateField
              label={stateLabel}
              country={country}
              placeholderLabel={locationStatePlaceholderLabel}
              optional={!postalCode}
              name={`${arrayPrefix}stateProvince`}
              initialSelection={stateProvince}
            />
          </Suspense>
        </Grid>
      </Grid>
      <Field
        component={ControlledTextField}
        label={postalCodeLabel}
        name={`${arrayPrefix}postalCode`}
        optional
      />
    </>
  );
};

export const CreditRetireFields = ({
  batchDenom,
  availableTradableAmount,
  mapboxToken,
  arrayPrefix = '',
  arrayIndex,
  amountRetiredLabel,
  bottomTextMapping,
  maxLabel,
  availableLabel,
}: CreditRetireProps): JSX.Element => {
  return (
    <>
      <AmountField
        name={`${arrayPrefix}retiredAmount`}
        label={amountRetiredLabel}
        availableAmount={availableTradableAmount}
        denom={batchDenom}
        maxLabel={maxLabel}
        availableLabel={availableLabel}
      />
      <BottomCreditRetireFields
        mapboxToken={mapboxToken}
        arrayPrefix={arrayPrefix}
        arrayIndex={arrayIndex}
        bottomTextMapping={bottomTextMapping}
      />
    </>
  );
};

export const RetirementReminder = ({
  sx,
  retirementInfoText,
}: {
  retirementInfoText: string;
  sx?: SxProps<Theme>;
}): JSX.Element => {
  return (
    <Body size="lg" color="black" sx={sx}>
      {retirementInfoText}
    </Body>
  );
};

type ValidateCreditRetireProps = {
  availableTradableAmount: number;
  requiredMessage: string;
  stateProvinceError: string;
  invalidMemoLength: string;
  invalidAmount: string;
  insufficientCredits: string;
  invalidDecimalCount: string;
  values: RetireFormValues;
  errors: FormikErrors<RetireFormValues>;
};

export const validateCreditRetire = ({
  availableTradableAmount,
  requiredMessage,
  stateProvinceError,
  invalidMemoLength,
  invalidAmount,
  insufficientCredits,
  invalidDecimalCount,
  values,
  errors,
}: ValidateCreditRetireProps): FormikErrors<RetireFormValues> => {
  if (!values.country) {
    errors.country = requiredMessage;
  }
  if (values.postalCode && !values.stateProvince) {
    errors.stateProvince = stateProvinceError;
  }
  const errAmount = validateAmount({
    availableTradableAmount,
    amount: values.retiredAmount,
    requiredMessage,
    invalidAmount,
    insufficientCredits,
    invalidDecimalCount,
  });
  if (errAmount) errors.retiredAmount = errAmount;

  if (values.note && !validateMemoLength(values.note)) {
    errors.note = invalidMemoLength;
  }

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
  amountRetiredLabel,
  availableTradableAmount,
  mapboxToken,
  submitLabel,
  submitErrorText,
  bottomTextMapping,
  retirementInfoText,
  stateProvinceError,
  maxLabel,
  availableLabel,
  requiredMessage,
  invalidMemoLength,
  invalidAmount,
  insufficientCredits,
  invalidDecimalCount,
  onClose,
  onSubmit,
}) => {
  const validateHandler = (
    values: RetireFormValues,
  ): FormikErrors<RetireFormValues> => {
    let errors: FormikErrors<RetireFormValues> = {};
    errors = validateCreditRetire({
      availableTradableAmount,
      requiredMessage,
      invalidMemoLength,
      invalidAmount,
      insufficientCredits,
      invalidDecimalCount,
      values,
      errors,
      stateProvinceError,
    });
    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validateHandler}
      onSubmit={onSubmit}
    >
      {({ submitForm, isSubmitting, isValid, submitCount, status }) => (
        <Form>
          <RetirementReminder
            sx={{ textAlign: 'center', mb: 8 }}
            retirementInfoText={retirementInfoText}
          />
          <CreditRetireFields
            maxLabel={maxLabel}
            availableLabel={availableLabel}
            amountRetiredLabel={amountRetiredLabel}
            availableTradableAmount={availableTradableAmount}
            batchDenom={batchDenom}
            mapboxToken={mapboxToken}
            bottomTextMapping={bottomTextMapping}
          />
          <Submit
            isSubmitting={isSubmitting}
            onClose={onClose}
            status={status}
            isValid={isValid}
            submitCount={submitCount}
            submitForm={submitForm}
            label={submitLabel}
            errorText={submitErrorText}
          />
        </Form>
      )}
    </Formik>
  );
};

export { CreditRetireForm };
