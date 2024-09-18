/* eslint-disable lingui/no-unlocalized-strings */
import { styled } from '@mui/material';
import Button from '@mui/material/Button';

const gradient =
  'linear-gradient(204.4deg, #527984 5.94%, #79C6AA 51.92%, #C4DAB5 97.89%)';

const ContainedButton = styled(Button)(({ theme }) => {
  return {
    background: gradient,
    backgroundSize: '150% 100%',
    backgroundPosition: '75% 0',
    color: theme.palette.primary.main,
    borderColor: 'transparent',
    transition: 'all 0.2s ease-in-out',
    backgroundOrigin: 'border-box',
    ':hover': {
      // a bit hacky -
      // You can't transition a background gradient directly, so we handle through positioning
      color: theme.palette.secondary.light,
      backgroundColor: theme.palette.secondary.light,
      backgroundPosition: '0 0',
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
