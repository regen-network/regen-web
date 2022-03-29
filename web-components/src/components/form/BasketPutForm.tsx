import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FormikErrors } from 'formik';
import { makeStyles } from '@mui/styles';

import { Theme } from '../../theme/muiTheme';
import AmountField from '../inputs/AmountField';
import SelectTextField, { Option } from '../inputs/SelectTextField';

import Submit from './Submit';
import { requiredMessage, validateAmount } from '../inputs/validation';

const useStyles = makeStyles((theme: Theme) => ({
  senderField: {
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
    marginBottom: theme.spacing(10.75),
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

interface FormProps {
  basketOptions: Option[];
  batchDenom: string;
  availableTradableAmount: number;
  onClose: () => void;
  onSubmit: () => void;
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
