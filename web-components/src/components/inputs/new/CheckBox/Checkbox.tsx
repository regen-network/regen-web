import React, { forwardRef, PropsWithChildren } from 'react';
import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from '@mui/material/Checkbox';
import { DefaultTheme as Theme } from '@mui/styles';
import { makeStyles } from 'tss-react/mui';

import CheckedIcon from '../../../icons/CheckedIcon';
import UncheckedIcon from '../../../icons/UncheckedIcon';

interface CheckboxProps extends MuiCheckboxProps {
  triggerOnChange?: (v: any) => Promise<void>;
}

const useStyles = makeStyles()((theme: Theme) => ({
  check: {
    height: theme.spacing(5),
    width: theme.spacing(5),
  },
}));

type Props = PropsWithChildren<CheckboxProps>;

const Checkbox = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { classes } = useStyles();
  const { triggerOnChange, disabled } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.checked;
    if (triggerOnChange) {
      triggerOnChange(value);
    }
  };

  return (
    <MuiCheckbox
      {...props}
      ref={ref}
      color="secondary"
      icon={<UncheckedIcon className={classes.check} />}
      checkedIcon={
        <CheckedIcon className={classes.check} disabled={disabled} />
      }
    />
  );
});

export default Checkbox;
