import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material';
import { Box } from '@mui/system';

export type ContainedColorVariant = 'secondary' | 'gradientBlueGreen';

interface ContainedButtonProps extends ButtonProps {
  target?: string;
  rel?: string;
  colorVariant?: ContainedColorVariant;
}

const StyledButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'colorVariant',
})<ContainedButtonProps>(({ theme, colorVariant = 'secondary' }) => {
  const isSecondary = colorVariant === 'secondary';
  const isGradientBlueGreen = colorVariant === 'gradientBlueGreen';
  return {
    color: theme.palette.primary.main,
    '&:disabled': {
      color: theme.palette.grey[50],
      backgroundColor: theme.palette.grey[100],
      background: theme.palette.grey[100],
      borderColor: theme.palette.grey[100],
    },
    ...(isSecondary && {
      borderColor: theme.palette.secondary.main,
      '&:hover': {
        borderColor: theme.palette.secondary.dark,
      },
    }),
    ...(isGradientBlueGreen && {
      border: 0,
      background:
        'linear-gradient(204.4deg, #527984 5.94%, #79C6AA 51.92%, #C4DAB5 97.89%)',
      '&:hover': {
        background:
          'linear-gradient(204.4deg, #52798470 5.94%, #79C6AA70 51.92%, #C4DAB570 97.89%)',
      },
    }),
  };
});
StyledButton.defaultProps = {
  colorVariant: 'secondary',
};

export default function ContainedButton(
  props: ContainedButtonProps,
): JSX.Element {
  const isGradientBlueGreen = props.colorVariant === 'gradientBlueGreen';
  return (
    <StyledButton color="secondary" variant="contained" {...props}>
      {isGradientBlueGreen ? (
        <Box sx={{ p: 0.5 }}>{props.children}</Box>
      ) : (
        props.children
      )}
    </StyledButton>
  );
}
