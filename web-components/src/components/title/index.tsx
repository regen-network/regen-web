import { styled, Typography } from '@mui/material';

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: 900,
}));

export default Title;
