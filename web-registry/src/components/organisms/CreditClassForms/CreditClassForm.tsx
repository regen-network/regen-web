import { Box, useTheme } from '@mui/material';
import { Form, Field, FieldArray, useFormikContext } from 'formik';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import SelectTextField from 'web-components/lib/components/inputs/SelectTextField';
import RegenTextField from 'web-components/lib/components/inputs/TextField';
import TrashIcon from 'web-components/lib/components/icons/TrashIcon';
import { TextButton } from 'web-components/lib/components/buttons/TextButton';

/** Values modeled on ledger v1 ecocredit MsgCreateClass. See:
 * https://buf.build/regen/regen-ledger/docs/main:regen.ecocredit.v1#regen.ecocredit.v1.MsgCreateClass */
export interface CreditClassValues {
  admin: string;
  issuers: string[];
  metadata: string;
  creditTypeAbbr: string;
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
  const { disabledFields = [] } = props;
  const fieldDisabled = (field: string): boolean =>
    disabledFields.includes(field);

  const { values } = useFormikContext<CreditClassValues>();
  const theme = useTheme();

  return (
    <Form translate="yes" id={props.id}>
      <OnBoardingCard>
        <Field
          component={ControlledTextField}
          label="Admin"
          name="admin"
          type="string"
          disabled={fieldDisabled('admin')}
        />
        <FieldArray name="issuers">
          {({ push, remove }) => (
            <Box sx={{ mt: [6, 4] }}>
              {values.issuers.map((_, index) => (
                <Field
                  component={ControlledTextField}
                  defaultStyle={false}
                  label={index === 0 && 'Issuers'}
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
                        <TrashIcon color={theme.palette.secondary.main} />
                      </TextButton>
                    )
                  }
                />
              ))}
              <TextButton
                fontSize="sm"
                onClick={e => {
                  e.preventDefault();
                  push('');
                }}
                sx={{ float: 'right', mt: [8] }}
              >
                {'+ add another issuer'}
              </TextButton>
            </Box>
          )}
        </FieldArray>
        <Field
          component={SelectTextField}
          label="Credit Type"
          name="creditTypeAbbr"
          options={[
            // TODO:
            { value: '', label: '' },
            { value: 'ct1', label: 'Credit type 1' },
            { value: 'ct2', label: 'Credit type 2' },
          ]}
        />
        <Field
          component={ControlledTextField}
          // component={RegenTextField}
          multiline
          label="Metadata"
          description="Attach arbitrary JSON-LD metadata to the credit batch below. "
          name="metadata"
          rows={5}
        />
        <Field
          component={RegenTextField}
          // component={ControlledTextField}
          label="Credit class creation fee"
          name="fee"
          type="string"
          disabled={fieldDisabled('fee')}
        />
      </OnBoardingCard>
    </Form>
  );
};
