import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import MuiInputLabel, { InputLabelProps } from '@mui/material/InputLabel';

interface LabelProps extends InputLabelProps {
  optional?: boolean;
}

const useStyles = makeStyles<Theme, LabelProps>((theme: Theme) => ({
  root: props => ({
    lineHeight: '140%',
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4),
    },
    '&.Mui-error': {
      color: theme.palette.primary.contrastText,
    },
    '&::after': {
      content: !!props.optional ? '" (optional)"' : '',
      fontWeight: 'normal',
      color: theme.palette.info.main,
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(4),
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.spacing(3.5),
      },
    },
  }),
}));

export default function RegenInputLabel({
  optional = false,
  ...props
}: LabelProps): JSX.Element {
  const classes = useStyles({ optional });

  return (
    <MuiInputLabel {...props} classes={{ root: classes.root }}>
      {props.children}
    </MuiInputLabel>
  );
}
