import { styled } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';

const OutlinedButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: 'rgba(var(--sc-button-text-icon-dark) / 1)',
  backgroundColor:
    'rgba(var(--sc-button-surface-standard-secondary-default) / 1)',
  borderImageSlice: 1,
  borderImageSource:
    'linear-gradient(201.8deg, rgba(var(--sc-gradient-lighter-gradient-500) / 1), rgba(var(--sc-gradient-lighter-gradient-300) / 1))',
  '&:hover': {
    backgroundColor:
      'rgba(var(--sc-button-surface-standard-secondary-hover) / 1)',
    color: 'rgba(var(--sc-button-text-icon-dark) / 1)',
    borderColor: 'rgba(var(--sc-button-surface-standard-secondary-hover) / 1)',
    borderImageSource: 'none',
  },
  '&:disabled': {
    color: theme.palette.grey[100],
    background: theme.palette.grey[50],
    borderImageSource: 'none',
    borderColor: theme.palette.grey[100],
  },
}));
export default OutlinedButton as typeof Button;
