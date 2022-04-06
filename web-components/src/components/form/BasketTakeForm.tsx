import React from 'react';
import { Formik, Form, Field, FormikErrors } from 'formik';
import { makeStyles } from '@mui/styles';
import { Collapse } from '@mui/material';
import { Basket } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/types';
import mbxGeocoder, {
  GeocodeQueryType,
  GeocodeRequest,
} from '@mapbox/mapbox-sdk/services/geocoding';
import MapboxClient from '@mapbox/mapbox-sdk';

import { Theme } from '../../theme/muiTheme';
import AmountField from '../inputs/AmountField';
import Description from '../description';
import CheckboxLabel from '../inputs/CheckboxLabel';
import {
  BottomCreditRetireFields,
  RetireFormValues,
  validateCreditRetire,
} from './CreditRetireForm';
import Submit from './Submit';
import {
  requiredMessage,
  invalidAmount,
  insufficientCredits,
} from '../inputs/validation';

/**
 * Take - takes credits from a basket starting from the oldest credits first.
 * https://docs.regen.network/commands/regen_tx_ecocredit_take-from-basket.html
 *
 * Validation:
 *    holder: must ba a valid address, and their signature must be present in the transaction
 *    amount: must not be empty
 *    basket_denom: must be a valid batch denomination
 *  if retire_on_take is true:
 *    retirement_location: must be a valid location
 *
 * Also:
 * https://buf.build/regen/regen-ledger/docs/main:regen.ecocredit.basket.v1#regen.ecocredit.basket.v1.EventTake
 */

const useStyles = makeStyles((theme: Theme) => ({
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

// Output (submit)
export interface MsgTakeValues {
  owner: string;
  basketDenom: string;
  amount: string;
  retireOnTake: boolean;
  retirementLocation?: string;
  retirementNote?: string;
}

interface CreditTakeFormValues {
  amount: number;
  retireOnTake?: boolean;
  note?: string;
  country: string;
  stateProvince: string;
  postalCode?: string;
}

// Input (args)
interface FormProps {
  accountAddress: string;
  basket: Basket;
  availableTradableAmount: number;
  onClose: () => void;
  onSubmit: (values: MsgTakeValues) => void;
}

const BasketTakeForm: React.FC<FormProps> = ({
  accountAddress,
  basket,
  availableTradableAmount,
  onClose,
  onSubmit,
}) => {
  const styles = useStyles();
  const accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
  const baseClient = MapboxClient({ accessToken });
  const geocoderService = mbxGeocoder(baseClient);

  const initialValues = {
    amount: 0,
    retireOnTake: false,
    note: '',
    country: '',
    stateProvince: '',
  };

  const validateHandler = (
    values: CreditTakeFormValues,
  ): FormikErrors<CreditTakeFormValues> => {
    let errors: FormikErrors<CreditTakeFormValues> = {};

    if (!values.amount) {
      errors.amount = requiredMessage;
    } else if (Math.sign(values.amount) !== 1) {
      errors.amount = invalidAmount;
    } else if (values.amount > availableTradableAmount) {
      errors.amount = insufficientCredits;
    }

    // Retire form validation (optional subform)
    if (values.retireOnTake) {
      const retirementValues: RetireFormValues = {
        retiredAmount: values.amount,
        note: values.note || '',
        country: values.country,
        stateProvince: values.stateProvince,
        postalCode: values.postalCode,
      };
      //TODO: is this using correct amount value?
      errors = validateCreditRetire(
        availableTradableAmount,
        retirementValues,
        errors,
      );

      // combo validation: send + retire
      if (
        Number(values.amount) + Number(values.amount) >
        availableTradableAmount
      ) {
        errors.amount = insufficientCredits;
      }
    }
    console.log('errors ', errors);
    return errors;
  };

  // fetches from mapbox to compose a proper ISO 3166-2 standard location string
  const getISOstring = async (
    country?: string,
    stateProvice?: string,
    postalCode?: string,
  ): Promise<string | undefined> => {
    let placeCode: string | undefined;
    if (!country) return Promise.reject();
    await geocoderService
      .forwardGeocode({
        mode: 'mapbox.places',
        query: `${country}+${stateProvice}`,
        types: ['country', 'region'],
      })
      .send()
      .then(res => {
        const placeCodes = res?.body?.features
          ?.filter((f: any) => !!f?.properties?.short_code)
          .sort((p: any) => p.relevance); // TODO: set minimum relevance threshold?

        const result = placeCodes?.[0]?.properties?.short_code || '';
        if (!!result) placeCode = result;
        if (!!postalCode) placeCode += ` ${postalCode}`;
        console.log('placecode', placeCode);
      });

    // If country-only, mapbox returns lowercase ("us"), so need toUppercase here for ledger
    return Promise.resolve(placeCode?.toUpperCase());
  };

  const submitHandler = async (values: CreditTakeFormValues): Promise<void> => {
    let retirementLocation;
    if (values.retireOnTake) {
      retirementLocation = await getISOstring(
        values.country,
        values.stateProvince,
        values.postalCode,
      );
    }

    const msgTake: MsgTakeValues = {
      owner: accountAddress,
      basketDenom: basket.basketDenom,
      amount: (values.amount * Math.pow(10, basket.exponent)).toString(),
      retireOnTake: !!values.retireOnTake,
      retirementLocation,
      retirementNote: values?.note,
    };

    onSubmit(msgTake);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validateHandler}
      onSubmit={submitHandler}
    >
      {({ values, submitForm, isSubmitting, isValid, submitCount, status }) => (
        <Form>
          <>
            <AmountField
              name="amount"
              label="Amount"
              availableAmount={availableTradableAmount}
              batchDenom={basket.basketDenom}
            />
            <Field
              component={CheckboxLabel}
              type="checkbox"
              name="retireOnTake"
              className={styles.checkboxLabel}
              label={
                <Description className={styles.checkboxDescription}>
                  Retire credits upon transfer
                </Description>
              }
            />
            {/* <Collapse in={values.retireOnTake} collapsedSize={0}> */}
            {values.retireOnTake && (
              <BottomCreditRetireFields country={values.country} />
            )}
            {/* </Collapse> */}
          </>
          <Submit
            isSubmitting={isSubmitting}
            onClose={onClose}
            status={status}
            isValid={isValid}
            submitCount={submitCount}
            submitForm={submitForm}
            label="take from basket"
          />
        </Form>
      )}
    </Formik>
  );
};

export { BasketTakeForm };
