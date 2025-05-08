import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Box } from '@mui/material';
import { Field, FieldArray, Form, useFormikContext } from 'formik';

import { TextButton } from 'web-components/src/components/buttons/TextButton';
import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';
import TrashIcon from 'web-components/src/components/icons/TrashIcon';
import ControlledTextField from 'web-components/src/components/inputs/ControlledTextField';
import SelectTextField from 'web-components/src/components/inputs/SelectTextField';
import RegenTextField from 'web-components/src/components/inputs/TextField';

/** Values modeled on ledger v1 ecocredit MsgCreateClass. See:
 * https://buf.build/regen/regen-ledger/docs/main:regen.ecocredit.v1#regen.ecocredit.v1.MsgCreateClass */
export interface CreditClassValues {
  admin: string;
  issuers: string[];
  metadata: string;
  creditTypeAbbr: string; // TODO: this should probably be a full `CreditType`
  fee: string;
}

export const creditClassBaseValues: CreditClassValues = {
  admin: '',
  issuers: [''],
  creditTypeAbbr: '',
  metadata: '',
  fee: '',
};

export const CreditClassForm = (props: {
  id?: string;
  disabledFields?: string[];
}): JSX.Element => {
  const { _ } = useLingui();
  const { values } = useFormikContext<CreditClassValues>();

  const fieldDisabled = (field: string): boolean =>
    props?.disabledFields?.includes(field) ?? false;

  return (
    <Form translate="yes" id={props.id}>
      <OnBoardingCard>
        <Field
          component={ControlledTextField}
          label={_(msg`Admin`)}
          name="admin"
          type="string"
          disabled={fieldDisabled('admin')}
        />
        <FieldArray name="issuers">
          {({ push, remove }) => (
            <Box sx={{ mt: [6, 4] }}>
              {values.issuers.map((issuer, index) => (
                <Field
                  key={index}
                  component={ControlledTextField}
                  defaultStyle={false}
                  label={index === 0 && _(msg`Issuers`)}
                  name={`issuers[${index}]`}
                  type="string"
                  errors={{ 'issuers[0]': 'hmm' }}
                  sx={{ mt: [4, 8] }}
                  endAdornment={
                    index !== 0 && (
                      <TextButton
                        onClick={e => {
                          e.preventDefault();
                          remove(index);
                        }}
                      >
                        <TrashIcon className="text-brand-100" />
                      </TextButton>
                    )
                  }
                />
              ))}
              <TextButton
                textSize="sm"
                onClick={e => {
                  e.preventDefault();
                  push('');
                }}
                sx={{ float: 'right', mt: [5.5] }}
              >
                <Trans>+ add another issuer'</Trans>
              </TextButton>
            </Box>
          )}
        </FieldArray>
        <Field
          component={SelectTextField}
          label={_(msg`Credit Type`)}
          name="creditTypeAbbr"
          options={[
            // TODO:
            { value: '', label: _(msg`Choose a credit type`) },
            { value: 'ct1', label: _(msg`Credit type 1`) },
            { value: 'ct2', label: _(msg`Credit type 2`) },
          ]}
        />
        <Field
          component={ControlledTextField}
          multiline
          label={_(msg`Metadata`)}
          description={_(
            msg`Attach arbitrary JSON-LD metadata to the credit batch below.`,
          )}
          name="metadata"
          rows={5}
        />
        <Field
          component={RegenTextField}
          label={_(msg`Credit class creation fee`)}
          name="fee"
          type="string"
          disabled={fieldDisabled('fee')}
        />
      </OnBoardingCard>
    </Form>
  );
};
