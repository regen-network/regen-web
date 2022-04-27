import React from 'react';
import { Formik, Form, Field, FormikErrors } from 'formik';
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
  MetaRetireFormValues,
  validateCreditRetire,
  BottomCreditRetireFieldsProps,
} from './CreditRetireForm';
import Submit from './Submit';
import { validateAmount } from '../inputs/validation';
import { RegenModalProps } from '../modal';

/**
 * Take - takes credits from a basket starting from the oldest credits first.
 * https://docs.regen.network/commands/regen_tx_ecocredit_take-from-basket.html
 *
 * Validation:
 *    holder: must be a valid address, and their signature must be present in the transaction
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

interface CreditTakeFormValues extends MetaRetireFormValues {
  amount: number;
  retireOnTake?: boolean;
}

export interface BasketTakeProps extends BottomCreditRetireFieldsProps {
  basket: Basket;
  basketDisplayDenom: string;
  accountAddress: string;
  balance: number;
  onSubmit: (values: MsgTakeValues) => void;
}

// Input (args)
interface FormProps extends BasketTakeProps {
  onClose: RegenModalProps['onClose'];
}

const BasketTakeForm: React.FC<FormProps> = ({
  mapboxToken,
  accountAddress,
  basket,
  basketDisplayDenom,
  balance,
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
      balance,
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
      errors = validateCreditRetire(balance, retirementValues, errors);
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
              availableAmount={balance}
              denom={basketDisplayDenom}
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
                <BottomCreditRetireFields mapboxToken={mapboxToken} />
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
