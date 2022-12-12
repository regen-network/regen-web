import React from 'react';
import { Box } from '@mui/system';
import { Field, Form, Formik, FormikErrors } from 'formik';
import { makeStyles } from 'tss-react/mui';

import { Flex } from 'web-components/lib/components/box';
import {
  BottomCreditRetireFields,
  BottomCreditRetireFieldsProps,
  initialValues as initialValuesRetire,
  RetireFormValues,
} from 'web-components/lib/components/form/CreditRetireForm';
import Submit from 'web-components/lib/components/form/Submit';
import InfoIcon from 'web-components/lib/components/icons/InfoIcon';
import AmountField from 'web-components/lib/components/inputs/AmountField';
import CheckboxLabel from 'web-components/lib/components/inputs/CheckboxLabel';
import TextField from 'web-components/lib/components/inputs/TextField';
import {
  invalidMemoLength,
  invalidRegenAddress,
  isValidAddress,
  requiredMessage,
  requirementAgreement,
  validateAmount,
  validateMemoLength,
} from 'web-components/lib/components/inputs/validation';
import { RegenModalProps } from 'web-components/lib/components/modal';
import InfoTooltip from 'web-components/lib/components/tooltip/InfoTooltip';
import { Subtitle } from 'web-components/lib/components/typography';
import { Theme } from 'web-components/lib/theme/muiTheme';

import AgreeErpaCheckbox from 'components/atoms/AgreeErpaCheckbox';

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
  availableTradableAmount,
  mapboxToken,
  addressPrefix,
  onClose,
  onSubmit,
}) => {
  const { classes: styles } = useStyles();

  const initialValues = {
    sender,
    recipient: '',
    totalAmount: 0,
    withRetire: false,
    ...initialValuesRetire,
    agreeErpa: false,
  };

  const validateHandler = (values: FormValues): FormikErrors<FormValues> => {
    let errors: FormikErrors<FormValues> = {};

    if (!values.sender) {
      errors.sender = requiredMessage;
    }

    if (!values.recipient) {
      errors.recipient = requiredMessage;
    }

    if (values.recipient && !isValidAddress(values.recipient, addressPrefix)) {
      errors.recipient = invalidRegenAddress;
    }

    // TODO: temporarily disable sending credits to the same account
    if (
      values.sender &&
      values.recipient &&
      values.sender === values.recipient
    ) {
      errors.recipient =
        'The recipient address cannot be the same as the sender address';
    }

    const errAmount = validateAmount(
      availableTradableAmount,
      values.totalAmount,
    );
    if (errAmount) errors.totalAmount = errAmount;

    if (!values.agreeErpa) errors.agreeErpa = requirementAgreement;

    if (values.note && !validateMemoLength(values.note)) {
      errors.note = invalidMemoLength;
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validateHandler}
      onSubmit={async values => {
        onSubmit(values);
      }}
    >
      {({ values, submitForm, isSubmitting, isValid, submitCount, status }) => (
        <Form>
          <Field
            name="sender"
            type="text"
            label="Sender"
            component={TextField}
            disabled
          />
          <Field
            name="recipient"
            type="text"
            label="Recipient"
            component={TextField}
          />

          <AmountField
            name={'totalAmount'}
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
            availableAmount={availableTradableAmount}
            denom={batchDenom}
          />

          <Field
            component={CheckboxLabel}
            type="checkbox"
            name="withRetire"
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
          />

          {values.withRetire && (
            <>
              <BottomCreditRetireFields
                mapboxToken={mapboxToken}
                arrayPrefix=""
              />
            </>
          )}

          <AgreeErpaCheckbox sx={{ mt: values.withRetire ? 10 : 6 }} />

          <Submit
            isSubmitting={isSubmitting}
            onClose={onClose}
            status={status}
            isValid={isValid}
            submitCount={submitCount}
            submitForm={submitForm}
            label={'Send'}
          />
        </Form>
      )}
    </Formik>
  );
};

export { CreditSendForm };
