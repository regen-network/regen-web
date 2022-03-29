import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FormikErrors } from 'formik';
import { makeStyles } from '@mui/styles';

import { Theme } from '../../theme/muiTheme';
import AmountField from '../inputs/AmountField';
import SelectTextField, { Option } from '../inputs/SelectTextField';

import Submit from './Submit';
import { requiredMessage, validateAmount } from '../inputs/validation';

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10.75),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(8.25),
    },
  },
}));

export interface BasketPutProps {
  basketOptions: Option[];
  batchDenom: string;
  availableTradableAmount: number;
  onSubmit: () => void;
}

interface FormProps extends BasketPutProps {
  onClose: () => void;
}

interface FormValues {
  basketDenom?: string;
  amount?: number;
}

const BasketPutForm: React.FC<FormProps> = ({
  batchDenom,
  basketOptions,
  availableTradableAmount,
  onClose,
  onSubmit,
}) => {
  const styles = useStyles();
  const [options, setOptions] = useState<Option[]>([]);

  const initialValues = {
    basketDenom: undefined,
    amount: undefined,
  };

  useEffect(() => {
    basketOptions.unshift({ value: '', label: 'choose basket' });
    setOptions(basketOptions);
  }, [basketOptions]);

  const validateHandler = (values: FormValues): FormikErrors<FormValues> => {
    let errors: FormikErrors<FormValues> = {};

    if (!values.basketDenom) {
      errors.basketDenom = requiredMessage;
    }
    errors.amount = validateAmount(availableTradableAmount, values.amount);

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
          <Field
            name="basketDenom"
            label="Choose basket"
            component={SelectTextField}
            options={options}
          />
          <AmountField
            name="amount"
            label="Amount"
            availableAmount={availableTradableAmount}
            batchDenom={batchDenom}
            className={styles.textField}
          />

          <Submit
            isSubmitting={isSubmitting}
            onClose={onClose}
            status={status}
            isValid={isValid}
            submitCount={submitCount}
            submitForm={submitForm}
            label="Put in basket"
          />
        </Form>
      )}
    </Formik>
  );
};

export { BasketPutForm };
