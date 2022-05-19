import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Gauge from './Gauge';
import GaugeText from './GaugeText';
import { pluralize } from '../../utils/pluralize';

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
      <Grid item container direction="row" justifyContent="space-between">
        <GaugeText
          number={props.numberOfHolders}
          label={`credit ${pluralize(props.numberOfHolders, 'holder')}`}
          textSize="xs"
        />
        <GaugeText
          number={props.numberOfProjects}
          label={pluralize(props.numberOfProjects, 'project')}
          textSize="xs"
        />
      </Grid>
    </Grid>
  );
}
