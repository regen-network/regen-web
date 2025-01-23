import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { Field, useFormikContext } from 'formik';

import ControlledTextField from 'web-components/src/components/inputs/ControlledTextField';
import InputLabel from 'web-components/src/components/inputs/InputLabel';
import { Body } from 'web-components/src/components/typography';

import { CreditBasicsFormValues } from '../../features/ecocredit/CreateBatchBySteps/CreateBatchMultiStepForm/CreditBasics';

interface FieldProps {
  name?: string;
  required?: boolean;
  classId: string;
}

export function MetadataJSONField({
  name = 'metadata',
  required,
  classId,
  ...props
}: FieldProps): JSX.Element {
  const {
    values: { metadata },
  } = useFormikContext<CreditBasicsFormValues>();

  return (
    <Box sx={{ mt: 10 }}>
      {typeof metadata === 'string' ? (
        <>
          <InputLabel>
            <Trans>Metadata</Trans>
          </InputLabel>
          <Body size="sm" mt={1} mb={3}>
            <Trans>
              Attach arbitrary JSON-LD metadata to the credit batch below.{' '}
              <a href="#TODO">Learn more»</a>
            </Trans>
          </Body>
          <Field
            {...props}
            name={name}
            component={ControlledTextField}
            multiline
            minRows={6}
            maxRows={18}
            defaultStyle={false}
          />
        </>
      ) : null}
    </Box>
  );
}
