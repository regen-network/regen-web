import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Field, Form, Formik, FormikErrors } from 'formik';

import Submit from 'web-components/src/components/form/Submit';
import AmountField from 'web-components/src/components/inputs/AmountField';
import FormLabel from 'web-components/src/components/inputs/FormLabel';
import SelectTextField from 'web-components/src/components/inputs/SelectTextField';
import TextField from 'web-components/src/components/inputs/TextField';
import {
  validateAmount,
  validatePolygonAddress,
} from 'web-components/src/components/inputs/validation';
import { RegenModalPropsWithOnClose } from 'web-components/src/types/shared/modalPropsWithOnClose';

import {
  INSUFFICIENT_CREDITS,
  INVALID_AMOUNT,
  INVALID_DECIMAL_COUNT,
  INVALID_POLYGON_ADDRESS,
  REQUIRED_MESSAGE,
  REQUIREMENT_AGREEMENT,
  SUBMIT_ERRORS,
} from 'lib/constants/shared.constants';

import AgreeErpaCheckbox from 'components/atoms/AgreeErpaCheckbox';

// eslint-disable-next-line lingui/no-unlocalized-strings
const BRIDGE_ALLOWED_CHAINS = [{ label: 'Polygon', value: 'polygon' }];

export interface BridgeProps {
  batchDenom: string;
  availableBridgeableAmount: number;
  onSubmit: (values: BridgeFormValues) => Promise<void>;
}

interface FormProps extends BridgeProps {
  maxLabel: string;
  availableLabel: string;
  onClose: RegenModalPropsWithOnClose['onClose'];
}

export interface BridgeFormValues {
  recipient: string;
  amount?: number;
  agreeErpa: boolean;
  target: string;
}

const BridgeForm = ({
  maxLabel,
  availableLabel,
  availableBridgeableAmount,
  batchDenom,
  onClose,
  onSubmit,
}: FormProps): JSX.Element => {
  const { _ } = useLingui();

  const initialValues = {
    amount: undefined,
    recipient: '',
    agreeErpa: false,
    batchDenom,
    target: BRIDGE_ALLOWED_CHAINS[0].value, // polygon
  };

  const validateHandler = (
    values: BridgeFormValues,
  ): FormikErrors<BridgeFormValues> => {
    let errors: FormikErrors<BridgeFormValues> = {};

    const errRecipient = validatePolygonAddress({
      address: values.recipient,
      requiredMessage: _(REQUIRED_MESSAGE),
      invalidPolygonAddress: _(INVALID_POLYGON_ADDRESS),
    });
    if (errRecipient) errors.recipient = errRecipient;

    const errAmount = validateAmount({
      availableTradableAmount: availableBridgeableAmount,
      amount: values.amount,
      invalidDecimalCount: _(INVALID_DECIMAL_COUNT),
      requiredMessage: _(REQUIRED_MESSAGE),
      invalidAmount: _(INVALID_AMOUNT),
      insufficientCredits: _(INSUFFICIENT_CREDITS),
    });
    if (errAmount) errors.amount = errAmount;

    if (!values.agreeErpa) errors.agreeErpa = _(REQUIREMENT_AGREEMENT);

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
            name="target"
            label={_(msg`Chain`)}
            component={SelectTextField}
            options={BRIDGE_ALLOWED_CHAINS}
            disabled
          />
          <Field
            name="recipient"
            type="text"
            label={
              <FormLabel
                label={_(msg`Recipient`)}
                description={_(
                  msg`This is the Polygon address of the recipient.`,
                )}
              />
            }
            component={TextField}
          />
          <AmountField
            maxLabel={maxLabel}
            availableLabel={availableLabel}
            name="amount"
            label={_(msg`Amount`)}
            availableAmount={availableBridgeableAmount}
            denom={batchDenom}
          />
          <AgreeErpaCheckbox sx={{ mt: 10 }} />
          <Submit
            isSubmitting={isSubmitting}
            onClose={onClose}
            status={status}
            isValid={isValid}
            submitCount={submitCount}
            submitForm={submitForm}
            label="bridge"
            errorText={_(SUBMIT_ERRORS)}
          />
        </Form>
      )}
    </Formik>
  );
};

export { BridgeForm };
