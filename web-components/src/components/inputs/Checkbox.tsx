import React from 'react';
import { makeStyles, Theme, Checkbox as MuiCheckbox } from '@material-ui/core';
import { fieldToCheckbox, CheckboxProps } from 'formik-material-ui';

import CheckedIcon from '../icons/CheckedIcon';
import UncheckedIcon from '../icons/UncheckedIcon';

const useStyles = makeStyles((theme: Theme) => ({
  check: {
    height: theme.spacing(5),
    width: theme.spacing(5),
  },
}));

/** Custom styles on top of MUI's `Checkbox` component */
const Radio = (props: CheckboxProps): JSX.Element => {
  const classes = useStyles();
  return (
    <MuiCheckbox
      {...fieldToCheckbox(props)}
      color="secondary"
      icon={<UncheckedIcon className={classes.check} />}
      checkedIcon={<CheckedIcon className={classes.check} />}
    />
  );
};

export default Radio;
