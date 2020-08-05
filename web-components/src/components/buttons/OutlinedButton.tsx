import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';

interface OutlinedButtonProps extends ButtonProps {
  border?: string;
  target?: string;
  rel?: string;
}

const CustomButton = withStyles((theme: Theme) => ({
  root: {
    border: `2px solid ${theme.palette.secondary.light}`,
    borderRadius: '2px',
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 800,
    letterSpacing: '1px',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}))(Button);

export default function OutlinedButton(props: OutlinedButtonProps): JSX.Element {
  return (
    <CustomButton style={props.border ? { border: props.border } : {}} color="secondary" {...props}>
      {props.children}
    </CustomButton>
  );
}
