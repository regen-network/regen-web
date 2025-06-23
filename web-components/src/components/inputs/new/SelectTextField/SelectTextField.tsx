import { forwardRef } from 'react';
import { Box, MenuItem, SxProps, useTheme } from '@mui/material';

import { Theme } from '../../../../theme/muiTheme';
import DropdownIcon from '../../../icons/DropdownIcon';
import { DefaultStyleProps } from '../FieldFormControl/FieldFormControl';
import TextField from '../TextField/TextField';
import { useSelectTextFieldStyles } from './SelectTextField.styles';

export interface Option {
  value: string;
  label: string | JSX.Element;
  disabled?: boolean;
  selected?: boolean;
}

export interface SelectTextFieldProps extends DefaultStyleProps {
  options?: Option[];
  native?: boolean;
  value?: string;
  disabled?: boolean;
  emptyOptionText: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  className?: string;
  sx?: SxProps<Theme>;
  placeholderText?: string;
  defaultValue?: string;
}

const SelectTextField = forwardRef<HTMLDivElement, SelectTextFieldProps>(
  (
    {
      options,
      native = true,
      value,
      disabled,
      label,
      className,
      emptyOptionText,
      placeholderText,
      ...props
    },
    ref,
  ) => {
    const { classes: styles, cx } = useSelectTextFieldStyles({
      defaultStyle: !value,
    });
    const theme = useTheme();

    return (
      <TextField
        {...props}
        value={value}
        ref={ref}
        label={label}
        disabled={disabled}
        className={cx(styles.root, className)}
        select
        SelectProps={{
          native,
          displayEmpty: true,
          renderValue: native
            ? undefined
            : (selected: unknown) => {
                if (!selected) {
                  return (
                    <span className="text-grey-400">{placeholderText}</span>
                  );
                }
                const selectedOption = options?.find(
                  option => option.value === selected,
                );
                if (selectedOption) {
                  return selectedOption.label;
                }

                return options?.[0]?.label;
              },
          IconComponent: disabled
            ? () => <DropdownIcon color={theme.palette.grey['400']} />
            : DropdownIcon,
        }}
      >
        {options ? (
          options.map((option, index) => (
            <Box
              key={`${option.value}-${index}`}
              value={option.value}
              disabled={option.disabled}
              selected={option.selected}
              component={native ? 'option' : MenuItem}
            >
              {option.label}
            </Box>
          ))
        ) : (
          <Box component={native ? 'option' : MenuItem} key="loading">
            {emptyOptionText}
          </Box>
        )}
      </TextField>
    );
  },
);

export default SelectTextField;
