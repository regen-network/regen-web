import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';

const Label = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '1px',
}));

export { Label };
