import React from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Typography from '@material-ui/core/Typography';
import CurrentCreditsIcon from '../icons/CurrentCreditsIcon';
import ContainedButton from '../buttons/ContainedButton';

interface BuyFooterProps {
  creditPrice: number;
  href?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(30),
    },
    width: '100%',
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
  creditsText: {
    color: theme.palette.info.dark,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.125rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.75rem',
    },
  },
  number: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 800,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.3125rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.125rem',
    },
  },
  creditPrice: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(5),
    },
    // [theme.breakpoints.down('xs')]: {
    //   fontSize: '1.125rem',
    // },
  },
  buyText: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(1.5),
    },
  },
}));

export default function BuyFooter({ creditPrice, href }: BuyFooterProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Grid
      container
      wrap="nowrap"
      alignItems="center"
      justify={matches ? 'flex-end' : 'space-between'}
      className={classes.root}
    >
      <Grid item className={classes.creditPrice}>
        <Typography>
          <span className={classes.number}>${creditPrice}</span>
          <span className={classes.creditsText}>/credit USD</span>
        </Typography>
      </Grid>
      <Grid item>
        <a href={href} target="_blank" rel="noopener noreferrer">
          <ContainedButton>
            <CurrentCreditsIcon
              height={matches ? '1.625rem' : '1.375rem'}
              width={matches ? '1.75rem' : '1.5rem'}
              color={theme.palette.primary.main}
            />
            <span className={classes.buyText}>buy credits</span>
          </ContainedButton>
        </a>
      </Grid>
    </Grid>
  );
}
