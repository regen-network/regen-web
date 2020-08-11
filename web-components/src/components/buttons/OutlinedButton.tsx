import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';

interface OutlinedButtonProps extends ButtonProps {
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
    /**
     * Tried doing this with props in withStyles hook, but it turned out to be a mess, material-ui either doesn't support it, or the documentation hasn't been updated, not sure exactly which. See https://github.com/mui-org/material-ui/issues/8726
     */
    <CustomButton color="secondary" {...props}>
      {props.children}
    </CustomButton>
  );
}
