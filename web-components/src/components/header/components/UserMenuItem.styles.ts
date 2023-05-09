import { makeStyles } from '@mui/styles';

export const useUserMenuItemStyles = makeStyles(theme => ({
  userMenuItem: {
    padding: theme.spacing(2.5),
    borderRadius: '2px',
    border: `1px solid ${theme.palette.grey[100]}`,
    position: 'relative',
    '&:hover': {
      '&:after': {
        background: theme.palette.secondary.main,
        position: 'absolute',
        content: '""',
        height: '2px',
        width: '100%',
        bottom: 0,
        left: 0,
      },
    },
    '& > div': {
      borderBottom: 'none',
    },
  },
}));
