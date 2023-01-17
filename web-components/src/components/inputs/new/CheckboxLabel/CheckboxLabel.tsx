import React from 'react';
import { SxProps, useTheme } from '@mui/material';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

import { Theme } from 'src/theme/muiTheme';

import { Subtitle } from '../../../typography';
import Checkbox from '../CheckBox/Checkbox';

interface CheckboxLabelProps {
  label: FormControlLabelProps['label'];
  disabled?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
}

export default function CheckboxLabel({
  label,
  disabled,
  sx = [],
  ...props
}: CheckboxLabelProps): JSX.Element {
  const theme = useTheme();
  const isLabelStringOrNumber =
    typeof label === 'string' || typeof label === 'number';
  const showError = false;
  const fieldError = '';

  return (
    <>
      <FormControlLabel
        className={props.className}
        sx={[{ ml: 0 }, ...(Array.isArray(sx) ? sx : [sx])]}
        control={<Checkbox sx={{ p: 0, mr: 3.5 }} disabled={disabled} />}
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
