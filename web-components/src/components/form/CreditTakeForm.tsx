import React from 'react';
import { Formik, Form, Field, FormikErrors } from 'formik';
import { makeStyles } from '@mui/styles';
import { Collapse } from '@mui/material';

import { Theme } from '../../theme/muiTheme';
import AmountField from '../inputs/AmountField';
import Description from '../description';
import CheckboxLabel from '../inputs/CheckboxLabel';
import { BottomCreditRetireFields } from './CreditRetireForm';
import Submit from './Submit';
import {
  requiredMessage,
  invalidAmount,
  insufficientCredits,
} from '../inputs/validation';

/**
 * Send sends tradable credits from one account to another account.
 * Sent credits can either be tradable or retired on receipt.
 * https://docs.regen.network/modules/ecocredit/03_messages.html#msgsend
 *
 * Validation:
 *    holder: must ba a valid address, and their signature must be present in the transaction
 *    recipient: must ba a valid address
 *    credits: must not be empty
 *    batch_denom: must be a valid batch denomination
 *    tradable_amount: must not be negative
 *    retired_amount: must not be negative
 *  if retired_amount is positive:
 *    retirement_location: must be a valid location
 *
 * Also:
 * https://docs.regen.network/modules/ecocredit/protobuf.html#msgsend
 * https://docs.regen.network/modules/ecocredit/protobuf.html#msgsend-sendcredits
 */

const useStyles = makeStyles((theme: Theme) => ({
  holderField: {
    '& label': {
      color: `${theme.palette.primary.contrastText} !important`,
    },
    '& .MuiInputBase-formControl': {
      backgroundColor: theme.palette.info.light,
      marginTop: theme.spacing(2.25),
    },
  },
  textField: {
    marginTop: theme.spacing(10.75),
    '& .MuiInputBase-formControl': {
      marginTop: theme.spacing(2.25),
    },
  },
  description: {
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4),
    },
    '& a': {
      cursor: 'pointer',
    },
  },
  checkboxLabel: {
    marginTop: theme.spacing(10.75),
    // marginBottom: theme.spacing(10.75),
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
export interface MsgTake {
  owner: string;
  basketDenom: string;
  amount: number;
  retireOnTake: boolean;
  retirementLocation?: string;
}

interface CreditTakeFormValues {
  amount: number;
  retireOnTake?: boolean;
  note?: string;
  country: string;
  stateProvince: string;
}

// Input (args)
interface FormProps {
  accountAddress: string;
  basketDenom: string;
  availableTradableAmount: number;
  onClose: () => void;
  onSubmit: (values: MsgTake) => void;
}

const CreditTakeForm: React.FC<FormProps> = ({
  accountAddress,
  basketDenom,
  availableTradableAmount,
  onClose,
  onSubmit,
}) => {
  const styles = useStyles();

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
      // errors = validateCreditRetire(availableTradableAmount, values, errors); TODO

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

  const submitHandler = async (values: CreditTakeFormValues): Promise<void> => {
    // console.log('*** submitHandler', values);
    // const retirementLocation = getLocationString(); todo

    const msgTake: MsgTake = {
      owner: accountAddress,
      basketDenom,
      // amount: values.amount,
      amount: values.amount * 1000000,
      retireOnTake: !!values.retireOnTake,
      retirementLocation: 'US', //todo
    };

    await onSubmit(msgTake);
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
              className={styles.textField}
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

export { CreditTakeForm };
