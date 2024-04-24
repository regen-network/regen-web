import { makeStyles } from 'tss-react/mui';

interface StyleProps {
  color: string;
  borderBottom?: boolean;
  fullWidth: boolean;
}

export const useHeaderStyles = makeStyles<StyleProps>()(
  (theme, { color, borderBottom }) => {
    const {
      typography: { pxToRem },
    } = theme;

    return {
      absolute: {
        [theme.breakpoints.up('sm')]: {
          position: 'absolute',
          width: '100vw',
        },
      },
      borderBottom: {
        [theme.breakpoints.up('sm')]: {
          borderBottom: borderBottom
            ? `1px ${theme.palette.grey[100]} solid`
            : 'none',
        },
        [theme.breakpoints.down('sm')]: {
          borderBottom: `1px ${theme.palette.grey[100]} solid`,
        },
      },
      header: {
        color: color,
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '110px',
        [theme.breakpoints.up('md')]: {
          paddingRight: theme.spacing(6),
          paddingLeft: theme.spacing(6),
        },
        [theme.breakpoints.down('md')]: {
          padding: theme.spacing(2.5, 3.75),
          height: theme.spacing(15),
          color: theme.palette.primary.light,
          background: theme.palette.primary.main,
        },
        '& ul > li > a, & ul > li > div > span': {
          color: color,
          textDecoration: 'none',
          paddingTop: theme.spacing(0.25),
          '&:link, &:visited, &:hover, &:active': {
            textDecoration: 'none',
          },
        },
      },
      menuList: {
        [theme.breakpoints.up('sm')]: {
          display: 'flex',
        },
        '& li.MuiMenuItem-root': {
          // BEGIN HACK setting jss styles (duplicated from emotion style)
          // so it's initially rendered on gatsby build
          // Remove once migrations from mui jss to emotion and to latest gatsby done
          listStyle: 'none',
          // END HACK
        },
        '& li.MuiMenuItem-root, li.MuiMenuItem-root > div': {
          display: 'flex',
          alignSelf: 'end',
          backgroundColor: 'inherit',
          textDecoration: 'none',
        },
        position: 'relative',
        width: 'unset',
        zIndex: 0,
      },
      background: {
        backgroundColor: theme.palette.primary.main,
      },
      transparent: {
        backgroundColor: `rgba(0,0,0,0)`,
      },
      signUpBtn: {
        padding: theme.spacing(2, 7),
        fontSize: pxToRem(12),
        [theme.breakpoints.down('md')]: {
          padding: theme.spacing(2, 4),
          fontSize: pxToRem(9),
        },
      },
      loginBtn: {
        textTransform: 'none',
        color: color,
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
      // BEGIN HACK setting jss styles (duplicated from mui components built-in emotion styles)
      // so it's initially rendered on gatsby build
      // Remove once migrations from mui jss to emotion and to latest gatsby done
      desktop: {
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
        [theme.breakpoints.up('md')]: {
          display: 'block',
        },
      },
      mobile: {
        [theme.breakpoints.down('md')]: {
          display: 'block',
        },
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      },
      container: {
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.up('xl')]: {
          maxWidth: theme.breakpoints.values['xl'],
        },
      },
      // END HACK
    };
  },
);
