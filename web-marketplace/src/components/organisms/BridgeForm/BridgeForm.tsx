import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Field, Form, Formik, FormikErrors } from 'formik';

import Submit from 'web-components/src/components/form/Submit';
import AmountField from 'web-components/src/components/inputs/AmountField';
import FormLabel from 'web-components/src/components/inputs/FormLabel';
import SelectTextField from 'web-components/src/components/inputs/SelectTextField';
import TextField from 'web-components/src/components/inputs/TextField';
import {
  requirementAgreement,
  validateAmount,
  validatePolygonAddress,
} from 'web-components/src/components/inputs/validation';
import { RegenModalProps } from 'web-components/src/components/modal';

import { SUBMIT_ERRORS } from 'lib/constants/shared.constants';

import AgreeErpaCheckbox from 'components/atoms/AgreeErpaCheckbox';

// eslint-disable-next-line lingui/no-unlocalized-strings
const BRIDGE_ALLOWED_CHAINS = [{ label: 'Polygon', value: 'polygon' }];

export interface BridgeProps {
  batchDenom: string;
  availableBridgeableAmount: number;
  onSubmit: (values: BridgeFormValues) => Promise<void>;
}

interface FormProps extends BridgeProps {
  onClose: RegenModalProps['onClose'];
}

export interface BridgeFormValues {
  recipient: string;
  amount?: number;
  agreeErpa: boolean;
  target: string;
}

const BridgeForm = ({
  onClose,
  onSubmit,
  availableBridgeableAmount,
  batchDenom,
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

    const errRecipient = validatePolygonAddress(values.recipient);
    if (errRecipient) errors.recipient = errRecipient;

    const errAmount = validateAmount(availableBridgeableAmount, values.amount);
    if (errAmount) errors.amount = errAmount;

    if (!values.agreeErpa) errors.agreeErpa = requirementAgreement;

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
