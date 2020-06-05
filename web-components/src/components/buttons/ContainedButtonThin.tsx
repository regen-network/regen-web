import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

interface ContainedButtonProps {
  children?: any;
  onClick?: () => void;
}

const CustomButton = withStyles((theme: Theme) => ({
  root: {
    borderRadius: '2px',
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 800,
    color: theme.palette.primary.main,
    letterSpacing: '1px',
    boxShadow: 'none',
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
      fontSize: '1.125rem',
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
      fontSize: '1.3125rem',
    },
  },
}))(Button);

export default function ContainedButton(props: ContainedButtonProps): JSX.Element {
  return (
    <CustomButton color="secondary" variant="contained" onClick={props.onClick}>
      {props.children}
    </CustomButton>
  );
}
