import React from 'react';
import { useTheme } from '@mui/material';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { getIn } from 'formik';
import { CheckboxProps } from 'formik-mui';

import Checkbox from '../inputs/Checkbox';
import { Subtitle } from '../typography';

interface CheckboxLabelProps extends CheckboxProps {
  label: FormControlLabelProps['label'];
  disabled?: boolean;
}

export default function CheckboxLabel({
  label,
  disabled,
  sx = [],
  ...props
}: CheckboxLabelProps): JSX.Element {
  const theme = useTheme();
  const {
    form: { errors, touched },
    field: { name },
  } = props;
  const fieldError = getIn(errors, name);
  const showError = getIn(touched, name) && !!fieldError;
  const isLabelStringOrNumber =
    typeof label === 'string' || typeof label === 'number';

  return (
    <>
      <FormControlLabel
        className={props.className}
        sx={[{ ml: 0 }, ...(Array.isArray(sx) ? sx : [sx])]}
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
        label={isLabelStringOrNumber ? <Subtitle>{label}</Subtitle> : label}
      />
      {showError && (
        <FormHelperText error={showError} sx={{ ml: 9 }}>
          <Subtitle
            as="span"
            size="sm"
            sx={{ color: theme.palette.error.main }}
          >
            {fieldError}
          </Subtitle>
        </FormHelperText>
      )}
    </>
  );
}
