import React, { useCallback, useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Cookies, { CookieAttributes } from 'js-cookie';

// TODO use Section component
// import Section from '../section';
import OutlinedButton from '../buttons/OutlinedButton';

interface CookiesFooterProps {
  privacyUrl: string;
}

const cookieName = 'cookies-consent';

function getCookieValue(): string | undefined {
  let cookieValue = Cookies.get(cookieName);

  if (cookieValue === undefined) {
    cookieValue = Cookies.get(getLegacyCookieName(cookieName));
  }
  return cookieValue;
}

function getLegacyCookieName(name: string): string {
  return `${name}-legacy`;
}

function setCookie(cookieValue: string): void {
  const secure: boolean = window.location ? window.location.protocol === 'https:' : true;

  const cookieOptions: CookieAttributes = { expires: 365, sameSite: 'None', secure };

  // Fallback for older browsers that can not set SameSite=None
  // https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
  Cookies.set(getLegacyCookieName(cookieName), cookieValue, cookieOptions);

  // set the regular cookie
  Cookies.set(cookieName, cookieValue, cookieOptions);
}

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    zIndex: 1000,
    backgroundColor: theme.palette.info.light,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(19),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(19),
    },
    boxShadow: theme.shadows[7],
  },
  // section: {
  //   paddingTop: 0,
  //   height: '100%',
  // },
  root: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(37.5),
      paddingLeft: theme.spacing(37.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(19),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    '& a': {
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  link: {
    color: theme.palette.secondary.main,
  },
  text: {
    color: theme.palette.info.dark,
    lineHeight: '150%',
    paddingRight: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
  button: {
    [theme.breakpoints.up('sm')]: {
      minWidth: theme.spacing(33.25),
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: theme.spacing(22),
    },
  },
}));

export default function CookiesFooter({ privacyUrl }: CookiesFooterProps): JSX.Element | null {
  const classes = useStyles({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getCookieValue() === undefined) {
      setVisible(true);
    }
  }, [setVisible]);

  const accept = useCallback(() => {
    setCookie('true');
    setVisible(false);
  }, []);

  if (visible) {
    return (
      <div className={classes.background}>
        <Grid container wrap="nowrap" alignItems="center" justify="space-between" className={classes.root}>
          <Typography className={classes.text}>
            We use cookies to provide you with a great user experience. By using this site, you accept our use
            of{' '}
            <Link className={classes.link} href={privacyUrl}>
              cookies policy
            </Link>
            .
          </Typography>
          <OutlinedButton className={classes.button} onClick={accept}>
            accept
          </OutlinedButton>
        </Grid>
      </div>
    );
  }
  return null;
}
