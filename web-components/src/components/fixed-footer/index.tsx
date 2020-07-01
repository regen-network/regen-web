import React from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

interface FixedFooterProps {
  children?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    zIndex: 1000,
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(30),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(19),
    },
    boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1)',
  },
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
}));

export default function FixedFooter({ children }: FixedFooterProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div className={classes.background}>
      <Grid
        container
        wrap="nowrap"
        alignItems="center"
        justify={matches ? 'flex-end' : 'space-between'}
        className={classes.root}
      >
        {children}
      </Grid>
    </div>
  );
}
