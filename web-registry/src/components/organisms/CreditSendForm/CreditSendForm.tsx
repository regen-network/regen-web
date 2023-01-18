import React from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { Box } from '@mui/system';
import { makeStyles } from 'tss-react/mui';

import { Flex } from 'web-components/lib/components/box';
import { RetireFormValues } from 'web-components/lib/components/form/CreditRetireForm';
import Submit from 'web-components/lib/components/form/Submit';
import InfoIcon from 'web-components/lib/components/icons/InfoIcon';
import AmountField from 'web-components/lib/components/inputs/new/AmountField/AmountField';
import CheckboxLabel from 'web-components/lib/components/inputs/new/CheckboxLabel/CheckboxLabel';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';
import { RegenModalProps } from 'web-components/lib/components/modal';
import InfoTooltip from 'web-components/lib/components/tooltip/InfoTooltip';
import { Subtitle } from 'web-components/lib/components/typography';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { IS_DEV } from 'lib/env';

import AgreeErpaCheckbox from 'components/atoms/AgreeErpaCheckboxNew';
import {
  BottomCreditRetireFields,
  BottomCreditRetireFieldsProps,
} from 'components/molecules/BottomCreditRetireFields/BottomCreditRetireFields';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { creditSendFormInitialValues } from './CreditSendForm.constants';
import { CreditSendFormSchema } from './CreditSendForm.schema';
import { validateCreditSendForm } from './CreditSendForm.utils';

/**
 * Send sends tradable credits from one account to another account.
 * Sent credits can either be tradable or retired on receipt.
 * https://buf.build/regen/regen-ledger/docs/main:regen.ecocredit.v1#regen.ecocredit.v1.Msg.Send
 *
 * Validation:
 *    sender: must be a valid address, and their signature must be present in the transaction
 *    recipient: must be a valid address
 *    credits: must not be empty
 *    batch_denom: must be a valid batch denomination
 *    tradable_amount: must not be negative
 *    retired_amount: must not be negative
 *  if retired_amount is positive:
 *    retirement_location: must be a valid location
 */

const useStyles = makeStyles()((theme: Theme) => ({
  checkboxLabel: {
    marginTop: theme.spacing(10.75),
  },
}));

export interface CreditSendProps extends BottomCreditRetireFieldsProps {
  sender: string;
  batchDenom: string;
  availableTradableAmount: number;
  onSubmit: (values: FormValues) => Promise<void>;
  addressPrefix?: string;
}

interface FormProps extends CreditSendProps {
  onClose: RegenModalProps['onClose'];
}

export interface FormValues extends RetireFormValues {
  sender: string;
  recipient: string;
  totalAmount: number;
  withRetire?: boolean;
  agreeErpa: boolean;
}

const CreditSendForm: React.FC<React.PropsWithChildren<FormProps>> = ({
  sender,
  batchDenom,
  addressPrefix,
  availableTradableAmount,
  mapboxToken,
  onClose,
}) => {
  const { classes: styles } = useStyles();
  const form = useZodForm({
    schema: CreditSendFormSchema,
    defaultValues: { ...creditSendFormInitialValues, sender },
  });
  const withRetire = useWatch({ control: form.control, name: 'withRetire' });
  const { isSubmitting, submitCount, isValid } = useFormState({
    control: form.control,
  });
  const setTotalAmount = (value: number): void => {
    form.setValue('totalAmount', value);
  };

  return (
    <>
      <Form
        form={form}
        onSubmit={data =>
          validateCreditSendForm({
            availableTradableAmount,
            setError: form.setError,
            values: data,
            addressPrefix,
          })
        }
      >
        <TextField
          type="text"
          label="Sender"
          formErrors={Object.keys(form.formState.errors)}
          disabled
          {...form.register('sender')}
        />
        <TextField
          type="text"
          label="Recipient"
          formErrors={Object.keys(form.formState.errors)}
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
          formErrors={Object.keys(form.formState.errors)}
          availableAmount={availableTradableAmount}
          denom={batchDenom}
          onMaxClick={setTotalAmount}
          {...form.register('totalAmount')}
        />

        <CheckboxLabel
          className={styles.checkboxLabel}
          label={
            <Subtitle size="lg" color="primary.contrastText">
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

        {withRetire && (
          <>
            <BottomCreditRetireFields mapboxToken={mapboxToken} />
          </>
        )}

        <AgreeErpaCheckbox
          sx={{ mt: withRetire ? 10 : 6 }}
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
      {IS_DEV && <DevTool control={form.control} />}
    </>
  );
};

export { CreditSendForm };
