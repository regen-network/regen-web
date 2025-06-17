import React, { useEffect, useMemo, useState } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Box } from '@mui/material';
import { USD_DENOM, USDC_DENOM } from 'config/allowedBaseDenoms';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import Submit from 'web-components/src/components/form/Submit';
import AmountField from 'web-components/src/components/inputs/new/AmountField/AmountField';
import CheckboxLabel from 'web-components/src/components/inputs/new/CheckboxLabel/CheckboxLabel';
import SelectTextField, {
  Option,
} from 'web-components/src/components/inputs/new/SelectTextField/SelectTextField';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { MAX_FRACTION_DIGITS } from 'web-components/src/components/inputs/validation';
import InfoTooltipWithIcon from 'web-components/src/components/tooltip/InfoTooltipWithIcon';
import { Subtitle } from 'web-components/src/components/typography';
import { RegenModalPropsWithOnClose } from 'web-components/src/types/shared/modalPropsWithOnClose';

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
  onClose: RegenModalPropsWithOnClose['onClose'];
  canCreateFiatOrder?: boolean;
}

const CreateSellOrderForm: React.FC<Props> = ({
  initialValues,
  allowedDenoms,
  batchDenoms,
  availableAmountByBatch,
  onSubmit,
  onClose,
  canCreateFiatOrder,
}) => {
  const { _ } = useLingui();
  const [options, setOptions] = useState<Option[]>([]);
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const { track } = useTracker();

  const defaultBatchDenom =
    batchDenoms.length === 1 ? batchDenoms[0]?.value : undefined;
  const defaultAskDenom = canCreateFiatOrder
    ? USD_DENOM
    : allowedDenoms.find(denom => denom.value === USDC_DENOM)
    ? USDC_DENOM
    : undefined;

  const defaultInitialValues = {
    batchDenom: defaultBatchDenom,
    price: undefined,
    askDenom: defaultAskDenom,
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
  const askDenom = useWatch({ control: form.control, name: 'askDenom' });
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

  const usdDenom = askDenom === USD_DENOM;

  useEffect(() => {
    if (usdDenom) {
      setValue('enableAutoRetire', true);
    }
  }, [usdDenom, setValue]);

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
        placeholderText={_(msg`Choose batch`)}
        defaultValue={defaultBatchDenom}
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
            placeholderText={_(msg`Choose denom`)}
            native={false}
            defaultValue={defaultAskDenom}
            {...form.register('askDenom')}
          />
          {canCreateFiatOrder && (
            <div className="absolute pt-5">
              <InfoTooltipWithIcon
                // eslint-disable-next-line lingui/no-unlocalized-strings
                containerClassName="items-center gap-5"
                title={_(
                  msg`Please note: US dollar sell orders will be created in USDC on the ledger, so crypto buyers may purchase in USDC.`,
                )}
                outlined
              >
                <Subtitle className="text-sc-text-paragraph" size="sm">
                  <Trans>Learn more</Trans>
                </Subtitle>
              </InfoTooltipWithIcon>
            </div>
          )}
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
        disabled={usdDenom}
        checked={enableAutoRetire}
        label={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Subtitle
              size="lg"
              className={
                usdDenom ? 'text-sc-text-disabled' : 'text-sc-text-header'
              }
              sx={{ mr: 2 }}
            >
              <Trans>Require that credits are retired upon purchase</Trans>
            </Subtitle>
            <InfoTooltipWithIcon
              title={
                !usdDenom
                  ? _(
                      msg`If you uncheck this option, buyers will be able to choose to keep the credits tradable`,
                    )
                  : _(
                      msg`Credits sold in USD cannot be sold in a tradable form.`,
                    )
              }
              outlined
            />
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
