import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useMenuHoverStyles = makeStyles()((theme: Theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  popoverContent: {
    pointerEvents: 'auto',
    marginTop: theme.spacing(4),
  },
  text: {
    '& li.MuiMenuItem-root:hover': {
      backgroundColor: 'transparent',
    },
    '& li > a': {
      fontFamily: 'lato',
      color: '#000',
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  noOutline: {
    outline: 'none',
    '&:focus, &:selected': {
      outline: 'none',
    },
  },
  paper: {
    borderRadius: '2px',
    border: `1px solid ${theme.palette.grey[400]}`,
    padding: theme.spacing(6.25),
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
}));
