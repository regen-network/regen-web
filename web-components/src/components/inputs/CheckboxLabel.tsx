import React from 'react';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { CheckboxProps } from 'formik-mui';
import { getIn } from 'formik';

import Checkbox from '../inputs/Checkbox';
import { Subtitle } from '../typography';

interface CheckboxLabelProps extends CheckboxProps {
  label: FormControlLabelProps['label'];
  disabled?: boolean;
}

export default function CheckboxLabel({
  label,
  disabled,
  ...props
}: CheckboxLabelProps): JSX.Element {
  const {
    form: { errors, touched },
    field: { name },
  } = props;
  const fieldError = getIn(errors, name);
  const showError = getIn(touched, name) && !!fieldError;

  return (
    <>
      <FormControlLabel
        className={props.className}
        sx={{ ml: 0 }}
        control={
          <Checkbox
            sx={{ p: 0, mr: 3.5 }}
            field={props.field}
            form={props.form}
            meta={props.meta}
            type="checkbox"
            disabled={disabled}
          />
        }
        label={<Subtitle>{label}</Subtitle>}
      />
      {showError && (
        <FormHelperText error={showError}>{fieldError}</FormHelperText>
      )}
    </>
  );
}
