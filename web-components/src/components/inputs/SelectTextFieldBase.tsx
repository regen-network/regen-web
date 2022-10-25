import React from 'react';
import { SelectProps, Theme, useTheme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import DropdownIcon from '../icons/DropdownIcon';
import { DefaultStyleProps } from './FieldFormControl';
import TextFieldBase from './TextFieldBase';

// This is a SelectTextField with formik props stripped out so it can be used outside
// of a Formik context.
// TODO: use this as a style base for SelectTextField

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    '& select': {
      color: props => (props.default ? theme.palette.info.main : 'inherit'),
    },
  },
}));

export interface Option {
  value: string;
  label: string;
}

export interface SelectTextFieldProps extends DefaultStyleProps, SelectProps {
  options?: Option[];
  label?: string;
}

interface StyleProps {
  default: boolean;
}

export default function SelectTextFieldBase({
  options,
  disabled,
  label,
  defaultStyle,
  ...selectProps
}: SelectTextFieldProps): JSX.Element {
  const { classes: styles } = useStyles({ default: !!defaultStyle });
  const theme = useTheme();

  return (
    <TextFieldBase
      label={label}
      disabled={disabled}
      className={styles.root}
      select
      SelectProps={{
        native: true,
        IconComponent: disabled
          ? () => <DropdownIcon color={theme.palette.grey['400']} />
          : DropdownIcon,
        ...selectProps,
      }}
      defaultStyle={defaultStyle}
    >
      {options ? (
        options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))
      ) : (
        <option key="loading">No options available</option>
      )}
    </TextFieldBase>
  );
}
