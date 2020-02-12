import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { PurchasedCredits } from '../mocks';
import Title from 'web-components/lib/components/title';
import PurchasedCreditsCard from 'web-components/lib/components/cards/PurchasedCreditsCard';
import TotalCreditsIcon from 'web-components/lib/components/icons/TotalCreditsIcon';
import CurrentCreditsIcon from 'web-components/lib/components/icons/CurrentCreditsIcon';
import AvailableCreditsIcon from 'web-components/lib/components/icons/AvailableCreditsIcon';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(17.75)} 0 ${theme.spacing(28.25)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(10.75)} 0 ${theme.spacing(20.5)}`,
    },
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
  },
  title: {
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(37.5),
      paddingLeft: theme.spacing(37.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
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
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(8.25),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(37.5),
      paddingLeft: theme.spacing(37.5),
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
  },
  cardContainer: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(-2.5),
      paddingTop: theme.spacing(11.5),
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(10),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(8.25),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(32.5),
      paddingLeft: theme.spacing(37.5),
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(0),
      paddingLeft: theme.spacing(5),
    },
  },
  card: {
    [theme.breakpoints.up('sm')]: {
      padding: `0 ${theme.spacing(2.5)}`,
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(4.75),
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
      <Grid container alignItems="center" justify="space-between" className={classes.title}>
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
      <Grid container className={classes.cardContainer}>
        <Grid className={classes.card} item xs={12} sm={4}>
          <PurchasedCreditsCard
            number={credits.currentPurchase.total}
            description="credits you purchased"
            date={credits.currentPurchase.date}
            icon={<CurrentCreditsIcon />}
          />
        </Grid>
        <Grid className={classes.card} item xs={12} sm={4}>
          <PurchasedCreditsCard
            number={credits.totalPurchased}
            description="total credits you have purchased"
            icon={<TotalCreditsIcon />}
          />
        </Grid>
        <Grid className={classes.card} item xs={12} sm={4}>
          <PurchasedCreditsCard
            number={credits.totalAvailable}
            description="credits available for purchase"
            icon={<AvailableCreditsIcon />}
          />
        </Grid>
      </Grid>
    </div>
  );
}
