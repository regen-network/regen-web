import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material';

interface ContainedButtonProps extends ButtonProps {
  target?: string;
  rel?: string;
}

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderColor: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  '&:hover': {
    borderColor: theme.palette.secondary.dark,
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
