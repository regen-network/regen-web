import { styled } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';

const OutlinedButton = styled(Button)<ButtonProps>(() => ({
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
    color: 'rgba(var(--sc-button-surface-standard-primary-disabled) / 1)',
    background:
      'rgba(var(--sc-button-surface-standard-secondary-disabled) / 1)',
    borderImageSource: 'none',
    borderColor: 'rgba(var(--sc-button-outline-secondary-disabled) / 1)',
  },
}));
export default OutlinedButton as typeof Button;
