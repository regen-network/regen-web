import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material';

interface ContainedButtonProps extends ButtonProps {
  target?: string;
  rel?: string;
}

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '2px',
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: 800,
  color: theme.palette.primary.main,
  letterSpacing: '1px',
  boxShadow: 'none',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 6),
    fontSize: '1.125rem',
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3, 12.5),
    fontSize: '1.3125rem',
  },
}));

export default function ContainedButton(
  props: ContainedButtonProps,
): JSX.Element {
  return (
    <StyledButton color="secondary" variant="contained" {...props}>
      {props.children}
    </StyledButton>
  );
}
