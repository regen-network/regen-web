import Button from '@mui/material/Button';
import { styled } from '@mui/material';

const gradient =
  'linear-gradient(204.4deg, #527984 5.94%, #79C6AA 51.92%, #C4DAB5 97.89%)';
const hoverGradient =
  'linear-gradient(204.4deg, #52798470 5.94%, #79C6AA70 51.92%, #C4DAB570 97.89%)';

const ContainedButton = styled(Button)(({ theme }) => {
  return {
    color: theme.palette.primary.main,
    border: 0,
    background: gradient,
    backgroundColor: theme.palette.primary.main,
    borderImageSlice: 1,
    borderImageSource: gradient,
    transition: 'all 0.2s ease-in-out',
    ':hover': {
      background: hoverGradient,
      backgroundColor: theme.palette.secondary.light,
      borderImageSource: hoverGradient,
    },
    ':disabled': {
      color: theme.palette.grey[50],
      backgroundColor: theme.palette.grey[100],
      background: theme.palette.grey[100],
      borderColor: theme.palette.grey[100],
    },
  };
}) as typeof Button; // type coersion necessary to get full props

export default ContainedButton;
