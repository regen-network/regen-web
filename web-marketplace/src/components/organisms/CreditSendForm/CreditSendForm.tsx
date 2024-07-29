import React, { useEffect } from 'react';
import { useFieldArray, useFormState, useWatch } from 'react-hook-form';
import { Box } from '@mui/system';
import { makeStyles } from 'tss-react/mui';

import { Flex } from 'web-components/src/components/box';
import Submit from 'web-components/src/components/form/Submit';
import InfoIcon from 'web-components/src/components/icons/InfoIcon';
import AmountField from 'web-components/src/components/inputs/new/AmountField/AmountField';
import CheckboxLabel from 'web-components/src/components/inputs/new/CheckboxLabel/CheckboxLabel';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { RegenModalProps } from 'web-components/src/components/modal';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import { Subtitle } from 'web-components/src/components/typography';
import { Theme } from 'web-components/src/theme/muiTheme';

import AgreeErpaCheckbox from 'components/atoms/AgreeErpaCheckboxNew';
import { BottomCreditRetireFields } from 'components/molecules/BottomCreditRetireFields/BottomCreditRetireFields';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { initialValuesRetire } from '../CreditRetireForm/CreditRetireForm.constants';
import { creditSendFormInitialValues } from './CreditSendForm.constants';
import {
  CreditSendFormSchema,
  CreditSendFormSchemaType,
} from './CreditSendForm.schema';
import { validateCreditSendForm } from './CreditSendForm.utils';

/**
 * Send sends tradable credits from one account to another account.
 * Sent credits can either be tradable or retired on receipt.
 * https://buf.build/regen/regen-ledger/docs/main:regen.ecocredit.v1#regen.ecocredit.v1.Msg.Send
 *
 */

const useStyles = makeStyles()((theme: Theme) => ({
  checkboxLabel: {
    marginTop: theme.spacing(10.75),
  },
}));

export interface CreditSendFormProps {
  sender: string;
  batchDenom: string;
  availableTradableAmount: number;
  onSubmit: (values: CreditSendFormSchemaType) => Promise<void>;
  addressPrefix?: string;
  onClose: RegenModalProps['onClose'];
  mapboxToken: string;
}

const CreditSendForm: React.FC<React.PropsWithChildren<CreditSendFormProps>> =
  ({
    sender,
    batchDenom,
    addressPrefix,
    availableTradableAmount,
    mapboxToken,
    onClose,
    onSubmit,
  }) => {
    const { classes: styles } = useStyles();
    const form = useZodForm({
      schema: CreditSendFormSchema({ addressPrefix }),
      defaultValues: { ...creditSendFormInitialValues, sender },
      mode: 'onBlur',
    });

    const withRetire = useWatch({ control: form.control, name: 'withRetire' });
    const { isSubmitting, submitCount, isValid, errors } = useFormState({
      control: form.control,
    });

    const { fields, append, remove } = useFieldArray({
      name: 'retireFields',
      control: form.control,
    });

    const setAmount = (value: number): void => {
      form.setValue('amount', value);
    };

    useEffect(() => {
      if (withRetire && fields.length === 0) {
        append(initialValuesRetire);
      }
      if (!withRetire && fields.length > 0) {
        remove(0);
      }
    }, [withRetire, fields, append, remove]);

    return (
      <>
        <Form
          form={form}
          onSubmit={data => {
            const hasError = validateCreditSendForm({
              availableTradableAmount,
              setError: form.setError,
              values: data,
              addressPrefix,
            });
            if (!hasError) {
              onSubmit(data);
            }
          }}
        >
          <TextField
            type="text"
            label="Sender"
            disabled
            {...form.register('sender')}
          />
          <TextField
            type="text"
            label="Recipient"
            helperText={errors.recipient?.message}
            error={!!errors.recipient}
            {...form.register('recipient')}
          />

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

          <CheckboxLabel
            checked={withRetire}
            className={styles.checkboxLabel}
            label={
              <Subtitle size="lg" color="primary.contrastText" as="span">
                <Box sx={{ display: 'inline' }}>
                  Retire all credits upon transfer
                </Box>{' '}
                <Box sx={{ display: 'inline', fontWeight: 400 }}>
                  {'(retirement is permanent and non-reversible)'}
                </Box>
              </Subtitle>
            }
            {...form.register('withRetire')}
          />

          {fields.map((field, index) => (
            <BottomCreditRetireFields
              key={field.id}
              mapboxToken={mapboxToken}
              fieldId={field.id}
              fieldIndex={index}
            />
          ))}

          <AgreeErpaCheckbox
            sx={{ mt: withRetire ? 10 : 6 }}
            error={!!errors.agreeErpa}
            helperText={errors.agreeErpa?.message}
            {...form.register('agreeErpa')}
          />

          <Submit
            isSubmitting={isSubmitting}
            onClose={onClose}
            isValid={isValid}
            submitCount={submitCount}
            label={'Send'}
          />
        </Form>
      </>
    );
  };

export { CreditSendForm };
