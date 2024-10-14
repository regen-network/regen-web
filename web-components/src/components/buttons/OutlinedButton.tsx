import { styled } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';

import { ColorScheme } from 'src/theme/theme.types';

type OutlinedButtonProps = ButtonProps & { colorScheme: ColorScheme };

const OutlinedButton = styled(Button)<OutlinedButtonProps>(
  ({ theme, colorScheme = 'regen' }) => ({
    color:
      colorScheme === 'terrasos'
        ? theme.palette.primary.contrastText
        : theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main,
    borderImageSlice: 1,
    borderImageSource:
      colorScheme === 'terrasos'
        ? 'linear-gradient(201.8deg, #636464, #636464)'
        : 'linear-gradient(201.8deg, #4FB573, #B9E1C7)',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      borderColor: theme.palette.secondary.light,
      borderImageSource: 'none',
    },
    '&:disabled': {
      color: theme.palette.grey[100],
      background: theme.palette.grey[50],
      borderImageSource: 'none',
      borderColor: theme.palette.grey[100],
    },
  }),
);

export default OutlinedButton;
