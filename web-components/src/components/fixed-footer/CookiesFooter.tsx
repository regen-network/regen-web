import React, { useCallback } from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// TODO use Section component
// import Section from '../section';
import OutlinedButton from '../buttons/OutlinedButton';

interface CookiesFooterProps {
  privacyUrl: string;
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
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
}));

export default function CookiesFooter({ privacyUrl }: CookiesFooterProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();

  const accept = useCallback(() => {}, []);

  return (
    <div className={classes.background}>
      {/* <Section className={classes.section}> */}
      <Grid container wrap="nowrap" alignItems="center" justify="space-between" className={classes.root}>
        <Typography className={classes.text}>
          We use cookies to provide you with a great user experience. By using this site, you accept our use
          of{' '}
          <Link className={classes.link} href={privacyUrl}>
            cookies policy
          </Link>
          .
        </Typography>
        <OutlinedButton onClick={accept}>accept</OutlinedButton>
      </Grid>
      {/* </Section> */}
    </div>
  );
}
