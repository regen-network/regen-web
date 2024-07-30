import { forwardRef, PropsWithChildren } from 'react';
import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from '@mui/material/Checkbox';

import CheckedIcon from '../../../icons/CheckedIcon';
import UncheckedIcon from '../../../icons/UncheckedIcon';
import { useCheckboxStyles } from './Checkbox.styles';

interface CheckboxProps extends MuiCheckboxProps {
  triggerOnChange?: (v: any) => Promise<void>;
}

type Props = PropsWithChildren<CheckboxProps>;

const Checkbox = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { classes } = useCheckboxStyles();
  const { disabled } = props;

  return (
    <MuiCheckbox
      {...props}
      ref={ref}
      color="secondary"
      icon={<UncheckedIcon className={classes.check} disabled={disabled} />}
      checkedIcon={
        <CheckedIcon className={classes.check} disabled={disabled} />
      }
    />
  );
});

export default Checkbox;
