import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';

interface ContainedButtonProps extends ButtonProps {
  target?: string;
  rel?: string;
}

const CustomButton = withStyles((theme: Theme) => ({
  root: {
    borderRadius: '2px',
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 800,
    color: theme.palette.primary.main,
    letterSpacing: '1px',
    boxShadow: 'none',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 6),
      fontSize: '1.125rem',
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3, 12.5),
      fontSize: '1.3125rem',
    },
  },
}))(Button);

export default function ContainedButton(props: ContainedButtonProps): JSX.Element {
  return (
    <CustomButton color="secondary" variant="contained" onClick={props.onClick} {...props}>
      {props.children}
    </CustomButton>
  );
}
