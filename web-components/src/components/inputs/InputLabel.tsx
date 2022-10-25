import React from 'react';
import MuiInputLabel, { InputLabelProps } from '@mui/material/InputLabel';
import { makeStyles } from 'tss-react/mui';
import { DefaultTheme as Theme } from '@mui/styles';

interface LabelProps extends InputLabelProps {
  optional?: boolean;
}

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
const useStyles = makeStyles()((theme: Theme) => ({
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
  const { classes } = useStyles({ optional });

  return (
    <MuiInputLabel {...props} classes={{ root: classes.root }}>
      {props.children}
    </MuiInputLabel>
  );
}
