import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

interface OutlinedButtonProps {
  children?: any;
  startIcon?: JSX.Element;
  fullWidth?: boolean;
  onClick?: () => void;
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
  },
  startIcon: {
    marginRight: 0,
  },
}))(Button);

export default function OutlinedButton(props: OutlinedButtonProps): JSX.Element {
  return (
    <CustomButton
      color="secondary"
      startIcon={props.startIcon}
      fullWidth={props.fullWidth}
      onClick={props.onClick}
    >
      {props.children}
    </CustomButton>
  );
}
