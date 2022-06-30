import React, { useEffect, useState } from 'react';
import { Field, useFormikContext } from 'formik';

import { Body } from 'web-components/lib/components/typography';
import InputLabel from 'web-components/lib/components/inputs/InputLabel';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import { Box } from '@mui/material';
import { CreditBasicsFormValues } from '../../features/ecocredit/CreateBatchBySteps/CreateBatchMultiStepForm/CreditBasics';

// TODO
// Make this component more generic, so that it doesn't depend
// on specific types/interfaces of a particular form.

interface FieldProps {
  name?: string;
  required?: boolean;
}

export function MetadataJSONField({
  name = 'metadata',
  required,
  ...props
}: FieldProps): JSX.Element {
  const {
    setFieldValue,
    setFieldTouched,
    values: { classId, metadata },
  } = useFormikContext<CreditBasicsFormValues>();
  const [formikName, setFormikName] = useState('loading');

  useEffect(() => {
    // reset metadata if classId changes and still in Object form
    if (typeof metadata !== 'string') {
      setFieldValue(name, '');
      // using this timeout fixes a timing bug when transitioning from metadata Object
      setTimeout(() => {
        setFormikName(name);
        setFieldTouched(name, false);
      }, 700);
    }
  }, [classId, metadata, setFieldValue, name, setFieldTouched]);

  return (
    <Box sx={{ mt: 10 }}>
      {formikName === name && typeof metadata === 'string' ? (
        <>
          <InputLabel>Metadata</InputLabel>
          <Body size="sm" mt={1} mb={3}>
            Attach arbitrary JSON-LD metadata to the credit batch below.{' '}
            <a href="#TODO">Learn more»</a>
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
