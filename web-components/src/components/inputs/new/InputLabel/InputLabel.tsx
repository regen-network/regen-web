import MuiInputLabel, { InputLabelProps } from '@mui/material/InputLabel';

import { useInputLabelStyles } from './InputLabel.styles';

interface LabelProps extends InputLabelProps {
  optional?: boolean;
}

export default function RegenInputLabel({
  optional = false,
  ...props
}: LabelProps): JSX.Element {
  const { classes } = useInputLabelStyles({ optional });

  return (
    <MuiInputLabel {...props} classes={{ root: classes.root }}>
      {props.children}
    </MuiInputLabel>
  );
}
