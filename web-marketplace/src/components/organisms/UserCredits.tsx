import React from 'react';
import { Link } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import Grid from '@mui/material/Grid';
import { makeStyles } from 'tss-react/mui';

import PurchasedCreditsCard from 'web-components/src/components/cards/PurchasedCreditsCard';
import AvailableCreditsIcon from 'web-components/src/components/icons/AvailableCreditsIcon';
import CurrentCreditsIcon from 'web-components/src/components/icons/CurrentCreditsIcon';
import TotalCreditsIcon from 'web-components/src/components/icons/TotalCreditsIcon';
import { Title } from 'web-components/src/components/typography';
import { Theme } from 'web-components/src/theme/muiTheme';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(17.75)} 0 ${theme.spacing(28.25)}`,
    },
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(4.75),
    },
  },
}));

interface Purchase {
  total: number;
  date: Date | string;
}

interface BasicProject {
  id: string;
  name: string;
}

interface PurchasedCredits {
  userId: string;
  project: BasicProject;
  currentPurchase: Purchase;
  totalPurchased: number;
  totalAvailable: number;
}

interface PurchasedCreditsProps {
  credits: PurchasedCredits;
}

function UserCredits({ credits }: PurchasedCreditsProps): JSX.Element {
  const { _ } = useLingui();
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        alignItems="flex-end"
        justifyContent="space-between"
        className={classes.title}
      >
        <Grid item sm={6} xs={12}>
          <Title variant="h3">
            <Trans>Credits for</Trans>{' '}
            <Link
              to={`/project/${credits.project.id}`}
              className={classes.projectName}
            >
              {credits.project.name}
            </Link>
          </Title>
        </Grid>
        {/*<Grid item sm={6} xs={12} className={classes.ledgerText}>
          see on the ledger»
        </Grid>*/}
      </Grid>
      <Grid container className={classes.cardContainer}>
        <Grid className={classes.card} item xs={12} sm={4}>
          <PurchasedCreditsCard
            number={credits.currentPurchase.total}
            description={_(msg`credits you purchased`)}
            date={credits.currentPurchase.date}
            icon={<CurrentCreditsIcon />}
          />
        </Grid>
        <Grid className={classes.card} item xs={12} sm={4}>
          <PurchasedCreditsCard
            number={credits.totalPurchased}
            description={_(msg`total credits you have purchased`)}
            icon={<TotalCreditsIcon />}
          />
        </Grid>
        <Grid className={classes.card} item xs={12} sm={4}>
          <PurchasedCreditsCard
            number={credits.totalAvailable}
            description={_(msg`credits available for purchase`)}
            icon={<AvailableCreditsIcon />}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export { UserCredits };
