import React, { useEffect } from 'react';
import { Formik, Form, Field, FormikErrors, useFormikContext } from 'formik';
import { makeStyles } from '@mui/styles';
import { Collapse } from '@mui/material';
import { Basket } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/types';

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
import { validateAmount } from '../inputs/validation';
import { getISOString } from '../../utils/locationStandard';

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
  retirementLocation?: string;
}

// Input (args)
interface FormProps {
  mapboxToken: string;
  accountAddress: string;
  basket: Basket;
  basketDenom: string;
  availableTradableAmount: number;
  onClose: () => void;
  onSubmit: (values: MsgTakeValues) => void;
}

const BasketTakeForm: React.FC<FormProps> = ({
  mapboxToken,
  accountAddress,
  basket,
  basketDenom,
  availableTradableAmount,
  onClose,
  onSubmit,
}) => {
  const styles = useStyles();

  const initialValues = {
    amount: 0,
    retireOnTake: !basket.disableAutoRetire,
    note: '',
    country: 'US',
    stateProvince: '',
    retirementLocation: undefined,
  };

  const validateHandler = (
    values: CreditTakeFormValues,
  ): FormikErrors<CreditTakeFormValues> => {
    let errors: FormikErrors<CreditTakeFormValues> = {};

    const errAmount = validateAmount(
      availableTradableAmount,
      values.amount,
      `You don't have enough basket tokens`,
    );
    if (errAmount) errors.amount = errAmount;

    // Retire form validation (optional subform)
    if (values.retireOnTake) {
      const retirementValues: RetireFormValues = {
        retiredAmount: values.amount,
        note: values.note || '',
        country: values.country,
        stateProvince: values.stateProvince,
        postalCode: values.postalCode,
      };
      errors = validateCreditRetire(
        availableTradableAmount,
        retirementValues,
        errors,
      );
    }
    return errors;
  };

  const submitHandler = async (values: CreditTakeFormValues): Promise<void> => {
    const msgTake: MsgTakeValues = {
      owner: accountAddress,
      basketDenom: basket.basketDenom,
      amount: (values.amount * Math.pow(10, basket.exponent)).toString(),
      retireOnTake: !!values.retireOnTake,
      retirementLocation: values.retirementLocation,
      retirementNote: values?.note,
    };

    return onSubmit(msgTake);
  };

  const AutoSetRetirementLocation = (): JSX.Element => {
    const {
      values: { country, stateProvince, postalCode },
      setFieldValue,
    } = useFormikContext<CreditTakeFormValues>();

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
    }, [country, stateProvince, postalCode, setFieldValue]);

    return <></>;
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
              batchDenom={basketDenom}
            />
            <Field
              component={CheckboxLabel}
              type="checkbox"
              name="retireOnTake"
              disabled={!basket.disableAutoRetire}
              className={styles.checkboxLabel}
              label={
                <Description className={styles.checkboxDescription}>
                  Retire credits upon transfer
                </Description>
              }
            />
            <Collapse in={values.retireOnTake} collapsedSize={0}>
              {values.retireOnTake && (
                <>
                  <BottomCreditRetireFields country={values.country} />
                  <AutoSetRetirementLocation />
                </>
              )}
            </Collapse>
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
