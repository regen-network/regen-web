import React from 'react';
import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from '@mui/material/Checkbox';
import { Theme } from '@mui/material/styles';
import {
  CheckboxProps as FormikCheckboxProps,
  fieldToCheckbox,
} from 'formik-mui';
import { makeStyles } from 'tss-react/mui';

import CheckedIcon from '../icons/CheckedIcon';
import UncheckedIcon from '../icons/UncheckedIcon';

interface CheckboxProps extends FormikCheckboxProps {
  triggerOnChange?: (v: any) => Promise<void>;
}

const useStyles = makeStyles()((theme: Theme) => ({
  check: {
    height: theme.spacing(5),
    width: theme.spacing(5),
  },
}));

/** Custom styles on top of MUI's `Checkbox` component */
const Checkbox: React.FC<React.PropsWithChildren<CheckboxProps>> = (
  props: CheckboxProps,
) => {
  const { classes } = useStyles();
  const { form, field, triggerOnChange, disabled } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.checked;
    form.setFieldValue(field.name, value);
    if (triggerOnChange) {
      triggerOnChange(value);
    }
  };

  return (
    <MuiCheckbox
      {...(fieldToCheckbox(props) as MuiCheckboxProps)}
      onChange={onChange}
      color="secondary"
      icon={<UncheckedIcon className={classes.check} />}
      checkedIcon={
        <CheckedIcon className={classes.check} disabled={disabled} />
      }
    />
  );
};

export default Checkbox;
