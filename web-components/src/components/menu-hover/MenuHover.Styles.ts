import { DefaultTheme as Theme, makeStyles } from '@mui/styles';

export const useMenuHoverStyles = makeStyles((theme: Theme) => ({
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
      'font-family': 'lato',
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
    'border-radius': '2px',
    border: `1px solid ${theme.palette.grey[400]}`,
    padding: theme.spacing(5, 9),
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
}));
