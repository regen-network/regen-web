import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Gauge from './Gauge';
import GaugeText from './GaugeText';
import { pluralize } from './pluralize';

export interface CreditsProps {
  numberOfHolders: number;
  numberOfProjects: number;
  amount: number; // current purchased amount
  totalAmount: number; // total available amount
  unit?: string; // currency?
}

const useStyles = makeStyles((theme: Theme) => ({
  gauge: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
  },
}));

export default function Credits(props: CreditsProps): JSX.Element {
  const classes = useStyles({});
  return (
    <Grid container direction="column">
      <GaugeText
        number={props.totalAmount}
        label={`${pluralize(props.totalAmount, 'credit')} issued`}
        format
      />
      <Grid item className={classes.gauge}>
        <Gauge amount={props.amount} totalAmount={props.totalAmount} />
      </Grid>
      <Grid item container direction="row" justify="space-between">
        <GaugeText
          number={props.numberOfHolders}
          label={`credit ${pluralize(props.numberOfHolders, 'holder')}`}
          variant="body2"
        />
        <GaugeText
          number={props.numberOfProjects}
          label={pluralize(props.numberOfProjects, 'project')}
          variant="body2"
        />
      </Grid>
    </Grid>
  );
}
