import { styled } from '@mui/material';

export const GreyText = styled('span')(({ theme }) => ({
  color: theme.palette.info.main,
}));

export const BreakText = styled('div')({
  whiteSpace: 'normal',
  wordWrap: 'break-word',
});

export const BreakTextEnd = styled('div')({
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  textAlign: 'end',
});
