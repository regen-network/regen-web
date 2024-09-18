import { Box, MenuItem, useTheme } from '@mui/material';
import { TextFieldProps } from 'formik-mui';
import { makeStyles } from 'tss-react/mui';

import DropdownIcon from '../icons/DropdownIcon';
import { DefaultStyleProps } from './FieldFormControl';
import TextField from './TextField';

interface StyleProps {
  defaultStyle: boolean;
}

const useStyles = makeStyles<StyleProps>()((theme, { defaultStyle }) => ({
  root: {
    '& select': {
      color: defaultStyle ? theme.palette.info.main : 'inherit',
    },
  },
}));

export interface Option {
  value: string;
  label: string | JSX.Element;
  disabled?: boolean;
  selected?: boolean;
}

export interface SelectTextFieldProps
  extends TextFieldProps,
    DefaultStyleProps {
  options?: Option[];
  native?: boolean;
  emptyOptionText: string;
}

export default function SelectTextField({
  options,
  disabled,
  native = true,
  emptyOptionText,
  ...props
}: SelectTextFieldProps): JSX.Element {
  const {
    field: { value },
  } = props;
  const { classes: styles } = useStyles({ defaultStyle: !value });
  const theme = useTheme();

  return (
    <TextField
      {...props}
      disabled={disabled}
      className={styles.root}
      select
      SelectProps={{
        native,
        displayEmpty: true,
        renderValue: native
          ? undefined
          : selected => {
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
}
