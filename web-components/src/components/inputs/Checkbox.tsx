import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import MuiCheckbox from '@material-ui/core/Checkbox';
import {
  fieldToCheckbox,
  CheckboxProps as MuiCheckboxProps,
} from 'formik-material-ui';

import CheckedIcon from '../icons/CheckedIcon';
import UncheckedIcon from '../icons/UncheckedIcon';

interface CheckboxProps extends MuiCheckboxProps {
  triggerOnChange?: (v: any) => Promise<void>;
}

const useStyles = makeStyles((theme: Theme) => ({
  check: {
    height: theme.spacing(5),
    width: theme.spacing(5),
  },
}));

/** Custom styles on top of MUI's `Checkbox` component */
const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps) => {
  const classes = useStyles();
  const { form, field, triggerOnChange } = props;

  const onChange = (e: React.ChangeEvent<any>): void => {
    const value = e.target.checked;
    form.setFieldValue(field.name, value);
    if (triggerOnChange) {
      triggerOnChange(value);
    }
  };

  return (
    <MuiCheckbox
      {...fieldToCheckbox(props)}
      onChange={onChange}
      color="secondary"
      icon={<UncheckedIcon className={classes.check} />}
      checkedIcon={<CheckedIcon className={classes.check} />}
    />
  );
};

export default Checkbox;
