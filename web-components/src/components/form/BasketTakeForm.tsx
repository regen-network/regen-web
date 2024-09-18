import React from 'react';
import { Box, Collapse } from '@mui/material';
import { BasketInfo } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { Field, Form, Formik, FormikErrors } from 'formik';
import { makeStyles } from 'tss-react/mui';

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

const useStyles = makeStyles()((theme: Theme) => ({
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
  retirementReason?: string;
}

interface CreditTakeFormValues extends MetaRetireFormValues {
  amount: number;
  retireOnTake?: boolean;
}

export interface BasketTakeProps extends BottomCreditRetireFieldsProps {
  basket?: BasketInfo;
  basketDisplayDenom: string;
  accountAddress: string;
  balance: number;
  amountErrorText: string;
  stateProvinceErrorText: string;
  amountLabel: string;
  retireOnTakeLabel: string;
  retireOnTakeTooltip: string;
  retirementInfoText: string;
  submitLabel: string;
  submitErrorText: string;
  invalidMemoLength: string;
  onSubmit: (values: MsgTakeValues) => void;
}

// Input (args)
interface FormProps extends BasketTakeProps {
  requiredMessage: string;
  invalidAmount: string;
  insufficientCredits: string;
  invalidDecimalCount: string;
  maxLabel: string;
  availableLabel: string;
  onClose: RegenModalProps['onClose'];
}

const BasketTakeForm: React.FC<React.PropsWithChildren<FormProps>> = ({
  mapboxToken,
  accountAddress,
  basket,
  basketDisplayDenom,
  balance,
  amountLabel,
  retireOnTakeLabel,
  retireOnTakeTooltip,
  stateProvinceErrorText,
  submitLabel,
  submitErrorText,
  retirementInfoText,
  bottomTextMapping,
  maxLabel,
  availableLabel,
  requiredMessage,
  invalidAmount,
  insufficientCredits,
  invalidDecimalCount,
  invalidMemoLength,
  onClose,
  onSubmit,
}) => {
  const { classes: styles } = useStyles();

  const initialValues = {
    amount: 0,
    retireOnTake: !basket?.disableAutoRetire,
    note: '',
    country: 'US',
    stateProvince: '',
    retirementJurisdiction: undefined,
  };

  const validateHandler = (
    values: CreditTakeFormValues,
  ): FormikErrors<CreditTakeFormValues> => {
    let errors: FormikErrors<CreditTakeFormValues> = {};

    const errAmount = validateAmount({
      availableTradableAmount: balance,
      requiredMessage,
      invalidAmount,
      insufficientCredits,
      invalidDecimalCount,
      amount: values.amount,
    });
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
      errors = validateCreditRetire({
        availableTradableAmount: balance,
        values: retirementValues,
        errors,
        stateProvinceError: stateProvinceErrorText,
        requiredMessage,
        invalidAmount,
        insufficientCredits,
        invalidDecimalCount,
        invalidMemoLength,
      });
    }
    return errors;
  };

  const submitHandler = async (values: CreditTakeFormValues): Promise<void> => {
    const msgTake: MsgTakeValues = {
      owner: accountAddress,
      basketDenom: basket?.basketDenom ?? '',
      amount: (values.amount * Math.pow(10, basket?.exponent ?? 0)).toString(),
      retireOnTake: !!values.retireOnTake,
      retirementJurisdiction: values.retirementJurisdiction,
      retirementReason: values?.note,
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
              maxLabel={maxLabel}
              availableLabel={availableLabel}
              name="amount"
              label={amountLabel}
              availableAmount={balance}
              denom={basketDisplayDenom}
            />
            <Field
              component={CheckboxLabel}
              type="checkbox"
              name="retireOnTake"
              disabled={!basket?.disableAutoRetire}
              className={styles.checkboxLabel}
              label={
                <Subtitle display="flex" size="lg" color="primary.contrastText">
                  {retireOnTakeLabel}
                  {values.retireOnTake && !basket?.disableAutoRetire && (
                    <InfoTooltip
                      title={retireOnTakeTooltip}
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
                  <RetirementReminder
                    sx={{ mt: 8 }}
                    retirementInfoText={retirementInfoText}
                  />
                  <BottomCreditRetireFields
                    mapboxToken={mapboxToken}
                    bottomTextMapping={bottomTextMapping}
                  />
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
            label={submitLabel}
            errorText={submitErrorText}
          />
        </Form>
      )}
    </Formik>
  );
};

export { BasketTakeForm };
