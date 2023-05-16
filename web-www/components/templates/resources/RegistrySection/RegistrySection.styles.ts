import { SxProps } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useRegistryStyles = makeStyles()(theme => ({
  section: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  table: {
    border: `2px solid ${theme.palette.secondary.contrastText}`,
    background: theme.palette.grey[50],
    borderRadius: '5px',
  },
}));

export const registrySxs = {
  btn: {
    color: 'info.dark',
    my: 8,
  } as SxProps,
};
