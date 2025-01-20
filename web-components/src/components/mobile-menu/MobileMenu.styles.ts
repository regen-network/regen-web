import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useMobileMenuStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'inline-block',
    padding: theme.spacing(1),
    alignItems: 'unset',
  },
  drawer: {
    top: theme.spacing(15),
    '& .MuiDrawer-paper': {
      backgroundColor: theme.palette.primary.light,
      width: '85%',
      maxWidth: '350px',
    },
    '& .MuiBackdrop-root, & .MuiDrawer-paper': {
      top: theme.spacing(15),
    },
  },
  menuList: {
    paddingTop: theme.spacing(12.25),
    paddingBottom: theme.spacing(20),
  },
  menuItem: {
    display: 'block',
    fontFamily: theme.typography.h1.fontFamily,
    color: theme.palette.primary.main,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: theme.spacing(3.25),
    lineHeight: theme.spacing(4),
    fontWeight: 800,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(5),
    minHeight: theme.spacing(9.75),
    '& a': {
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  subMenuItem: {
    fontSize: theme.spacing(2.75),
    lineHeight: theme.spacing(3.5),
    fontWeight: 800,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(6),
    minHeight: theme.spacing(9),
  },
  icon: {
    cursor: 'pointer',
  },
  subMenuTitle: {
    color: theme.palette.info.main,
  },
  hamburger: {
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
  },
  close: {
    position: 'absolute',
    top: theme.spacing(4),
    right: theme.spacing(4),
    zIndex: 1,
  },
  currentMenuItem: {
    '& > a': {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
  loginBtns: {
    marginLeft: theme.spacing(4),
  },
  signUpBtn: {
    fontSize: theme.typography.pxToRem(12),
    padding: theme.spacing(2, 7),
  },
  loginBtn: {
    textTransform: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  divider: {
    backgroundColor: theme.palette.info.main,
    width: '85%',
    margin: '0 auto',
    marginBottom: theme.spacing(8),
    marginTop: theme.spacing(4),
  },
}));
