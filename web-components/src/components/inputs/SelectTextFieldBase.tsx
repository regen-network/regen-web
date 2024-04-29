import { SelectProps, useTheme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import DropdownIcon from '../icons/DropdownIcon';
import { DefaultStyleProps } from './FieldFormControl';
import TextFieldBase from './TextFieldBase';

// This is a SelectTextField with formik props stripped out so it can be used outside
// of a Formik context.
// TODO: use this as a style base for SelectTextField

const useStyles = makeStyles<StyleProps>()((theme, { defaultStyle }) => ({
  root: {
    '& select': {
      color: defaultStyle ? theme.palette.info.main : 'inherit',
    },
  },
}));

export interface Option {
  value: string;
  label: string;
}

export type SelectTextFieldProps = DefaultStyleProps &
  SelectProps & {
    options?: Option[];
    label?: string;
  };

interface StyleProps {
  defaultStyle: boolean;
}

export default function SelectTextFieldBase({
  options,
  disabled,
  label,
  defaultStyle,
  ...selectProps
}: SelectTextFieldProps): JSX.Element {
  const { classes: styles } = useStyles({ defaultStyle: !!defaultStyle });
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
