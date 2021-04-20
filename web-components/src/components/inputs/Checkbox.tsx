import React from 'react';
import { makeStyles, Theme, Checkbox as MuiCheckbox, CheckboxProps } from '@material-ui/core';

import CheckedIcon from '../icons/CheckedIcon';
import UncheckedIcon from '../icons/UncheckedIcon';

const useStyles = makeStyles((theme: Theme) => ({
  check: {
    height: theme.spacing(5),
    width: theme.spacing(5),
  },
}));

/** Custom styles on top of MUI's `Checkbox` composnent */
const Radio: React.FC<CheckboxProps> = props => {
  const classes = useStyles();
  return (
    <MuiCheckbox
      {...props}
      color="secondary"
      icon={<UncheckedIcon className={classes.check} />}
      checkedIcon={<CheckedIcon className={classes.check} />}
    />
  );
};

export default Radio;
