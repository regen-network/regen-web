import React, { useEffect } from 'react';
import { useFieldArray, useFormState } from 'react-hook-form';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/system';

import { RetirementReminder } from 'web-components/src/components/form/CreditRetireForm';
import Submit from 'web-components/src/components/form/Submit';
import AmountField from 'web-components/src/components/inputs/new/AmountField/AmountField';
import { RegenModalProps } from 'web-components/src/components/modal';

import { BottomCreditRetireFields } from 'components/molecules/BottomCreditRetireFields/BottomCreditRetireFields';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import {
  creditSendFormInitialValues,
  initialValuesRetire,
} from './CreditRetireForm.constants';
import {
  CreditRetireFormSchema,
  CreditRetireFormSchemaType,
} from './CreditRetireForm.schema';
import { validateCreditRetireForm } from './CreditRetireForm.utils';

export interface CreditRetireFormProps {
  batchDenom: string;
  availableTradableAmount: number;
  onSubmit: (values: CreditRetireFormSchemaType) => Promise<void>;
  onClose: RegenModalProps['onClose'];
  mapboxToken: string;
}

const CreditRetireForm: React.FC<
  React.PropsWithChildren<CreditRetireFormProps>
> = ({
  batchDenom,
  availableTradableAmount,
  mapboxToken,
  onClose,
  onSubmit,
}) => {
  const { _ } = useLingui();
  const form = useZodForm({
    schema: CreditRetireFormSchema(),
    defaultValues: { ...creditSendFormInitialValues },
    mode: 'onBlur',
  });

  const { isSubmitting, submitCount, isValid, errors } = useFormState({
    control: form.control,
  });

  const { fields, append } = useFieldArray({
    name: 'retireFields',
    control: form.control,
  });

  const setAmount = (value: number): void => {
    form.setValue('amount', value);
  };

  useEffect(() => {
    if (fields.length === 0) {
      append(initialValuesRetire);
    }
  }, [append, fields]);

  return (
    <>
      <Form
        form={form}
        onSubmit={data => {
          const hasError = validateCreditRetireForm({
            availableTradableAmount,
            setError: form.setError,
            values: data,
          });
          if (!hasError) {
            onSubmit(data);
          }
        }}
      >
        <RetirementReminder sx={{ textAlign: 'center', mb: 8 }} />
        <AmountField
          label={
            <Box>
              <Trans>Amount retired</Trans>
            </Box>
          }
          helperText={errors.amount?.message}
          error={!!errors.amount}
          availableAmount={availableTradableAmount}
          denom={batchDenom}
          onMaxClick={setAmount}
          customInputProps={{ step: 'any' }}
          {...form.register('amount')}
        />

        {fields.map((field, index) => (
          <BottomCreditRetireFields
            key={field.id}
            mapboxToken={mapboxToken}
            fieldId={field.id}
            fieldIndex={index}
          />
        ))}

        <Submit
          isSubmitting={isSubmitting}
          onClose={onClose}
          isValid={isValid}
          submitCount={submitCount}
          label={_(msg`Retire`)}
        />
      </Form>
    </>
  );
};

export { CreditRetireForm };
