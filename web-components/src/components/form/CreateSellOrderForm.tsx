import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FormikErrors } from 'formik';

import AmountField from '../inputs/AmountField';
import SelectTextField, { Option } from '../inputs/SelectTextField';

import Submit from './Submit';
import { requiredMessage, validateAmount } from '../inputs/validation';
import { RegenModalProps } from '../modal';
import NumberTextField from '../inputs/NumberTextField';
import CheckboxLabel from '../inputs/CheckboxLabel';
import { Subtitle } from '../typography';
import { Box, useTheme } from '@mui/material';

export interface CreateSellOrderProps {
  batchDenoms: Option[];
  sellDenom: string;
  availableTradableAmount: number;
  onSubmit: (values: FormValues) => Promise<void>;
}

interface FormProps extends CreateSellOrderProps {
  onClose: RegenModalProps['onClose'];
}

export interface FormValues {
  batchDenom?: string;
  price?: number;
  amount?: number;
  disableAutoRetire?: boolean;
}

const CreateSellOrderForm: React.FC<FormProps> = ({
  sellDenom,
  batchDenoms,
  availableTradableAmount,
  onClose,
  onSubmit,
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const theme = useTheme();

  const initialValues = {
    basketDenom: undefined,
    price: undefined,
    amount: undefined,
    disableAutoRetire: false,
  };

  useEffect(() => {
    batchDenoms.unshift({ value: '', label: 'choose batch' });
    setOptions(batchDenoms);
  }, [batchDenoms]);

  const validateHandler = (values: FormValues): FormikErrors<FormValues> => {
    let errors: FormikErrors<FormValues> = {};

    if (!values.batchDenom) {
      errors.batchDenom = requiredMessage;
    }
    const errAmount = validateAmount(availableTradableAmount, values.amount);
    if (errAmount) errors.amount = errAmount;

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
            name="batchDenom"
            label="Batch denom"
            component={SelectTextField}
            options={options}
            sx={{ mb: theme.spacing(10.5) }}
          />
          <Box
            sx={{ display: 'flex', alignItems: 'end', mb: theme.spacing(0.5) }}
          >
            <Field
              component={NumberTextField}
              name="price"
              label="Price"
              increment={0.1}
              min={0.0}
              arrows={false}
              sx={{ maxWidth: '238px' }}
            />
            <Box
              sx={{
                mb: theme.spacing(5),
                ml: theme.spacing(5),
                fontWeight: '800',
                color: 'info.dark',
                fontSize: theme.typography.textSmall,
              }}
            >
              {sellDenom}
            </Box>
          </Box>
          <AmountField
            name="amount"
            label="Amount to sell"
            availableAmount={availableTradableAmount}
            denom={values.batchDenom ?? ''}
          />
          <Field
            component={CheckboxLabel}
            type="checkbox"
            name="disableAutoRetire"
            label={
              <Subtitle size="lg" color="primary.contrastText">
                Disable auto-retire
              </Subtitle>
            }
            sx={{ mt: theme.spacing(12) }}
          />
          <Submit
            isSubmitting={isSubmitting}
            onClose={onClose}
            status={status}
            isValid={isValid}
            submitCount={submitCount}
            submitForm={submitForm}
            label="Create Sell Order"
          />
        </Form>
      )}
    </Formik>
  );
};

export { CreateSellOrderForm };
