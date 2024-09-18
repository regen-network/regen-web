import React, { useEffect, useMemo, useState } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import Submit from 'web-components/src/components/form/Submit';
import InfoIcon from 'web-components/src/components/icons/InfoIcon';
import AmountField from 'web-components/src/components/inputs/new/AmountField/AmountField';
import CheckboxLabel from 'web-components/src/components/inputs/new/CheckboxLabel/CheckboxLabel';
import SelectTextField, {
  Option,
} from 'web-components/src/components/inputs/new/SelectTextField/SelectTextField';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { MAX_FRACTION_DIGITS } from 'web-components/src/components/inputs/validation';
import { RegenModalProps } from 'web-components/src/components/modal';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import { Subtitle } from 'web-components/src/components/typography';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import {
  AMOUNT_SELL_LABEL,
  AVAILABLE_LABEL,
  EMPTY_OPTION_TEXT,
  getMaximumDecimalMessage,
  INSUFFICIENT_CREDITS,
  INVALID_AMOUNT,
  INVALID_DECIMAL_COUNT,
  MAX_LABEL,
  POSITIVE_NUMBER,
  REQUIRED_MESSAGE,
  SUBMIT_ERRORS,
} from 'lib/constants/shared.constants';
import { Sell2Event } from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import {
  createSellOrderFormSchema,
  CreateSellOrderFormSchemaType,
} from './CreateSellOrderForm.schema';

export interface Props {
  batchDenoms: Option[];
  allowedDenoms: Option[];
  sellDenom: string;
  availableAmountByBatch: { [batchDenom: string]: number };
  onSubmit: (values: CreateSellOrderFormSchemaType) => Promise<void>;
  initialValues?: CreateSellOrderFormSchemaType;
  onClose: RegenModalProps['onClose'];
}

const CreateSellOrderForm: React.FC<Props> = ({
  initialValues,
  allowedDenoms,
  batchDenoms,
  availableAmountByBatch,
  onSubmit,
  onClose,
}) => {
  const { _ } = useLingui();
  const [options, setOptions] = useState<Option[]>([]);
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const { track } = useTracker();

  const defaultInitialValues = {
    batchDenom: batchDenoms[0]?.value ?? '',
    price: undefined,
    askDenom: undefined,
    amount: undefined,
    enableAutoRetire: true,
  };

  const maximumDecimalMessage = useMemo(
    () =>
      getMaximumDecimalMessage({
        _,
        maximumFractionDigits: MAX_FRACTION_DIGITS,
      }),
    [_],
  );

  const form = useZodForm({
    schema: createSellOrderFormSchema({
      availableAmountByBatch,
      requiredMessage: _(REQUIRED_MESSAGE),
      positiveNumber: _(POSITIVE_NUMBER),
      invalidAmount: _(INVALID_AMOUNT),
      maximumDecimalMessage: maximumDecimalMessage,
      insufficientCredits: _(INSUFFICIENT_CREDITS),
      invalidDecimalCount: _(INVALID_DECIMAL_COUNT),
    }),
    defaultValues: {
      ...(initialValues ?? defaultInitialValues),
    },
    mode: 'onBlur',
  });
  const { isValid, isSubmitting, submitCount, errors } = useFormState({
    control: form.control,
  });
  const batchDenom = useWatch({ control: form.control, name: 'batchDenom' });
  const enableAutoRetire = useWatch({
    control: form.control,
    name: 'enableAutoRetire',
  });
  const availableAmount = availableAmountByBatch[batchDenom ?? ''];
  const { setValue } = form;
  const onMaxClick = () =>
    setValue('amount', availableAmount, {
      shouldDirty: true,
    });

  useEffect(() => {
    setOptions(batchDenoms);
  }, [batchDenoms]);

  return (
    <Form
      form={form}
      onSubmit={async values => {
        try {
          track<Sell2Event>('sell2', {
            batchDenom: values.batchDenom,
            price: values.price,
            quantity: values.amount,
            currencyDenom: values.askDenom,
            enableAutoRetire: values.enableAutoRetire,
          });

          await onSubmit(values);
        } catch (e) {
          setErrorBannerTextAtom(_(errorsMapping[ERRORS.DEFAULT].title));
        }
      }}
    >
      <SelectTextField
        label={_(msg`Batch denom`)}
        options={options}
        emptyOptionText={_(EMPTY_OPTION_TEXT)}
        disabled={options.length === 1}
        sx={{ mb: 10.5 }}
        native={false}
        {...form.register('batchDenom')}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'end',
          mb: 0.5,
        }}
      >
        <Box
          sx={{
            width: '100%',
            mr: { xs: 0, sm: 2.4 },
            mb: { xs: 10, sm: 0 },
          }}
        >
          <TextField
            label={_(msg`Price`)}
            type="number"
            error={!!errors['price']}
            helperText={errors['price']?.message}
            customInputProps={{ step: 'any' }}
            {...form.register('price', {
              valueAsNumber: true,
            })}
          />
        </Box>
        <Box sx={{ width: '100%', ml: { xs: 0, sm: 2.4 } }}>
          <SelectTextField
            options={allowedDenoms}
            error={!!errors['askDenom']}
            helperText={errors['askDenom']?.message}
            emptyOptionText={_(EMPTY_OPTION_TEXT)}
            {...form.register('askDenom')}
          />
        </Box>
      </Box>
      <AmountField
        label={_(AMOUNT_SELL_LABEL)}
        availableAmount={availableAmount}
        availableLabel={_(AVAILABLE_LABEL)}
        maxLabel={_(MAX_LABEL)}
        error={!!errors['amount']}
        helperText={errors['amount']?.message}
        denom={batchDenom ?? ''}
        onMaxClick={onMaxClick}
        {...form.register('amount')}
      />
      <CheckboxLabel
        checked={enableAutoRetire}
        label={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Subtitle size="lg" color="primary.contrastText" sx={{ mr: 2 }}>
              <Trans>Require that credits are retired upon purchase</Trans>
            </Subtitle>
            <InfoTooltip
              title={_(
                msg`If you uncheck this option, buyers will be able to choose to keep the credits tradable`,
              )}
              arrow
              placement="top"
            >
              <span>
                <InfoIcon />
              </span>
            </InfoTooltip>
          </Box>
        }
        sx={{ mt: 12, mr: 2 }}
        error={!!errors['enableAutoRetire']}
        helperText={errors['enableAutoRetire']?.message}
        {...form.register('enableAutoRetire')}
      />
      <Submit
        isSubmitting={isSubmitting}
        onClose={onClose}
        isValid={isValid}
        submitCount={submitCount}
        label={_(msg`Create Sell Order`)}
        errorText={_(SUBMIT_ERRORS)}
      />
    </Form>
  );
};

export { CreateSellOrderForm };
