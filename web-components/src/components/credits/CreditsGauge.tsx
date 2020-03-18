import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Gauge from './Gauge';
import GaugeText from './GaugeText';
import { pluralize } from './pluralize';

export interface CreditsProps {
  amount: number; // current purchased amount
  totalAmount: number; // total issued amount
}

const useStyles = makeStyles((theme: Theme) => ({
  gauge: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
  },
}));

export default function CreditsGauge(props: CreditsProps): JSX.Element {
  const classes = useStyles({});
  const available: number = props.totalAmount - props.amount;
  return (
    <Grid container direction="column">
      <Grid item container direction="row" justify="space-between">
        <GaugeText
          number={props.amount}
          label={`${pluralize(props.amount, 'credit')} purchased`}
          variant="body2"
        />
        <GaugeText
          number={available}
          label={`${pluralize(available, 'credit')} available`}
          variant="body2"
        />
      </Grid>
      <Grid item className={classes.gauge}>
        <Gauge
          height="1.6875rem"
          borderRadius="3.125rem"
          amount={props.amount}
          totalAmount={props.totalAmount}
        />
      </Grid>
    </Grid>
  );
}
