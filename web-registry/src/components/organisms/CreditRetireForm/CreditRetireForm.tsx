import React, { useEffect } from 'react';
import { useFieldArray, useFormState } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { Box } from '@mui/system';

import { Flex } from 'web-components/lib/components/box';
import { RetirementReminder } from 'web-components/lib/components/form/CreditRetireForm';
import Submit from 'web-components/lib/components/form/Submit';
import InfoIcon from 'web-components/lib/components/icons/InfoIcon';
import AmountField from 'web-components/lib/components/inputs/new/AmountField/AmountField';
import { RegenModalProps } from 'web-components/lib/components/modal';
import InfoTooltip from 'web-components/lib/components/tooltip/InfoTooltip';

import { IS_DEV } from 'lib/env';

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
    append(initialValuesRetire);
  }, [append]);

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
            <Flex align="center">
              <Box sx={{ mr: 1 }}>{'Amount of credits'}</Box>
              <InfoTooltip
                title="By default these credits are tradable but you may check “retire all credits upon transfer” below to automatically retire them upon sending."
                arrow
                placement="top"
              >
                <Box
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <InfoIcon />
                </Box>
              </InfoTooltip>
            </Flex>
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
          label={'Retire'}
        />
      </Form>
      {IS_DEV && <DevTool control={form.control} />}
    </>
  );
};

export { CreditRetireForm };
