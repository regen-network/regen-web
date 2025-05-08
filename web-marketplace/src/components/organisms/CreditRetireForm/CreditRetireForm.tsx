import React, { useEffect } from 'react';
import { useFieldArray, useFormState } from 'react-hook-form';
import { msg, Trans, useLingui } from '@lingui/react';
import { Box } from '@mui/system';

import { RetirementReminder } from 'web-components/src/components/form/CreditRetireForm';
import Submit from 'web-components/src/components/form/Submit';
import AmountField from 'web-components/src/components/inputs/new/AmountField/AmountField';
import { RegenModalPropsWithOnClose } from 'web-components/src/types/shared/modalPropsWithOnClose';

import {
  AVAILABLE_LABEL,
  INSUFFICIENT_CREDITS,
  INVALID_AMOUNT,
  INVALID_DECIMAL_COUNT,
  MAX_LABEL,
  REQUIRED_MESSAGE,
  SUBMIT_ERRORS,
} from 'lib/constants/shared.constants';

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
  onClose: RegenModalPropsWithOnClose['onClose'];
  mapboxToken: string;
  retirementInfoText: string;
}

const CreditRetireForm: React.FC<
  React.PropsWithChildren<CreditRetireFormProps>
> = ({
  batchDenom,
  availableTradableAmount,
  retirementInfoText,
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
            values: data,
            insufficientCredits: _(INSUFFICIENT_CREDITS),
            invalidDecimalCount: _(INVALID_DECIMAL_COUNT),
            requiredMessage: _(REQUIRED_MESSAGE),
            invalidAmount: _(INVALID_AMOUNT),
            _,
            setError: form.setError,
          });
          if (!hasError) {
            onSubmit(data);
          }
        }}
      >
        <RetirementReminder
          sx={{ textAlign: 'center', mb: 8 }}
          retirementInfoText={retirementInfoText}
        />
        <AmountField
          label={
            <Box>
              <Trans>Amount retired</Trans>
            </Box>
          }
          availableLabel={_(AVAILABLE_LABEL)}
          maxLabel={_(MAX_LABEL)}
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
          errorText={_(SUBMIT_ERRORS)}
        />
      </Form>
    </>
  );
};

export { CreditRetireForm };
