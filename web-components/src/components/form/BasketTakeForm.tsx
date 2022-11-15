import React from 'react';
import { Box, Collapse } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { BasketInfo } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { Field, Form, Formik, FormikErrors } from 'formik';

import type { Theme } from '../../theme/muiTheme';
import QuestionIconOutlined from '../icons/QuestionIconOutlined';
import AmountField from '../inputs/AmountField';
import CheckboxLabel from '../inputs/CheckboxLabel';
import { validateAmount } from '../inputs/validation';
import type { RegenModalProps } from '../modal';
import InfoTooltip from '../tooltip/InfoTooltip';
import { Subtitle } from '../typography';
import {
  BottomCreditRetireFields,
  BottomCreditRetireFieldsProps,
  MetaRetireFormValues,
  RetireFormValues,
  RetirementReminder,
  validateCreditRetire,
} from './CreditRetireForm';
import Submit from './Submit';

/**
 * Take - takes credits from a basket starting from the oldest credits first.
 * https://buf.build/regen/regen-ledger/docs/main:regen.ecocredit.basket.v1#regen.ecocredit.basket.v1.EventTake
 *
 * Validation:
 *    holder: must be a valid address, and their signature must be present in the transaction
 *    amount: must not be empty
 *    basket_denom: must be a valid batch denomination
 *  if retire_on_take is true:
 *    retirement_jurisdiction: must be a valid location
 */

const RETIRED_UPON_TAKE_TOOLTIP =
  'The creator of this basket has chosen that all credits must be retired upon take.';

const useStyles = makeStyles((theme: Theme) => ({
  checkboxLabel: {
    marginTop: theme.spacing(10.75),
  },
}));

// Output (submit)
export interface MsgTakeValues {
  owner: string;
  basketDenom: string;
  amount: string;
  retireOnTake: boolean;
  retirementJurisdiction?: string;
  retirementNote?: string;
}

interface CreditTakeFormValues extends MetaRetireFormValues {
  amount: number;
  retireOnTake?: boolean;
}

export interface BasketTakeProps extends BottomCreditRetireFieldsProps {
  basket: BasketInfo;
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
    retirementJurisdiction: undefined,
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
      retirementJurisdiction: values.retirementJurisdiction,
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
                <Subtitle display="flex" size="lg" color="primary.contrastText">
                  Retire credits upon transfer
                  {values.retireOnTake && !basket.disableAutoRetire && (
                    <InfoTooltip
                      title={RETIRED_UPON_TAKE_TOOLTIP}
                      arrow
                      placement="top"
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', ml: 2 }}
                      >
                        <QuestionIconOutlined
                          sx={{ color: 'secondary.main' }}
                        />
                      </Box>
                    </InfoTooltip>
                  )}
                </Subtitle>
              }
            />
            <Collapse in={values.retireOnTake} collapsedSize={0}>
              {values.retireOnTake && (
                <>
                  <RetirementReminder sx={{ mt: 8 }} />
                  <BottomCreditRetireFields mapboxToken={mapboxToken} />
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
