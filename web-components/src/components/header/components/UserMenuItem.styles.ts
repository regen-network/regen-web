import { makeStyles } from '@mui/styles';

export const useUserMenuItemStyles = makeStyles(theme => ({
  userMenuItem: {
    padding: 0,
    borderRadius: '2px',
    border: `1px solid ${theme.palette.grey[100]}`,
    position: 'relative',
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: `${theme.palette.primary.contrastText} !important`,
    height: 'auto',
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
