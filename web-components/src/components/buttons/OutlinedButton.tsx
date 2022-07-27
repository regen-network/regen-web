import { styled } from '@mui/material';
import Button from '@mui/material/Button';

const OutlinedButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.primary.main,
  borderImageSlice: 1,
  borderImageSource: 'linear-gradient(201.8deg, #4FB573, #B9E1C7)',
  '&:hover': {
    backgroundColor: theme.palette.secondary.light,
    borderColor: theme.palette.secondary.light,
    borderImageSource: 'none',
  },
  '&:disabled': {
    color: theme.palette.grey[100],
    background: theme.palette.grey[50],
    borderColor: theme.palette.grey[100],
  },
}));

export default OutlinedButton as typeof Button;
