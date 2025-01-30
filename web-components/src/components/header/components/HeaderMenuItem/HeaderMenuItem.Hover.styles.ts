import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useMenuHoverStyles = makeStyles()((theme: Theme) => ({
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
  icon: {
    marginLeft: theme.spacing(1),
  },
}));
