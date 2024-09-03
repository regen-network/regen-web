import React, { useEffect, useState } from 'react';
import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { Field, useFormikContext } from 'formik';

import ControlledTextField from 'web-components/src/components/inputs/ControlledTextField';
import InputLabel from 'web-components/src/components/inputs/InputLabel';
import { Body } from 'web-components/src/components/typography';

import { CreditBasicsFormValues } from '../../features/ecocredit/CreateBatchBySteps/CreateBatchMultiStepForm/CreditBasics';
import { ClassID } from '../../types/ledger/ecocredit';

// TODO
// Make this component more generic, so that it doesn't depend
// on specific types/interfaces of a particular form.

interface FieldProps {
  name?: string;
  required?: boolean;
  classId: ClassID;
}

export function MetadataJSONField({
  name = 'metadata',
  required,
  classId,
  ...props
}: FieldProps): JSX.Element {
  const {
    setFieldValue,
    setFieldTouched,
    values: { metadata },
  } = useFormikContext<CreditBasicsFormValues>();
  const [formikName, setFormikName] = useState('loading');

  useEffect(() => {
    // reset metadata if classId changes and still in Object form
    if (typeof metadata !== 'string' || formikName === 'loading') {
      setFieldValue(name, '');
      // using this timeout fixes a timing bug when transitioning from metadata Object
      setTimeout(() => {
        setFormikName(name);
        setFieldTouched(name, false);
      }, 700);
    }
  }, [classId, formikName, metadata, name, setFieldTouched, setFieldValue]);

  return (
    <Box sx={{ mt: 10 }}>
      {formikName === name && typeof metadata === 'string' ? (
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
            name={formikName}
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
