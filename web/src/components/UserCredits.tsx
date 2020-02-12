import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { PurchasedCredits } from '../mocks';
import Title from 'web-components/lib/components/title';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing(17.75)} ${theme.spacing(37.5)} ${theme.spacing(28.25)}`,
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(17.75)} ${theme.spacing(10)} ${theme.spacing(28.25)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(10.75)} ${theme.spacing(4)} ${theme.spacing(20.5)}`, // 43 / 82
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
  },
  projectName: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
  },
  ledgerText: {
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    fontWeight: 800,
    fontFamily: theme.typography.h1.fontFamily,
    textAlign: 'right',
    letterSpacing: '1px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.75rem',
      paddingTop: theme.spacing(7.5),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.875rem',
    },
  },
  creditsContainer: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(11.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(8.25),
    },
  },
}));

interface PurchasedCreditsProps {
  credits: PurchasedCredits;
}

export default function UserCredits({ credits }: PurchasedCreditsProps): JSX.Element {
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item sm={6} xs={12}>
          <Title variant="h2">
            Credits for{' '}
            <Link to={`/projects/${credits.project.id}`} className={classes.projectName}>
              {credits.project.name}
            </Link>
          </Title>
        </Grid>
        <Grid item sm={6} xs={12} className={classes.ledgerText}>
          see on the ledger»
        </Grid>
      </Grid>
      <div></div>
    </div>
  );
}
