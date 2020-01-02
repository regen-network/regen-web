import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ThemeStyle } from '@material-ui/core/styles/createTypography';
import Title from '../title';
import Gauge from './Gauge';
import GaugeText from './GaugeText';

export interface CreditsProps {
  numberOfHolders: number,
  numberOfProjects: number,
  amount: number, // current purchased amount
  totalAmount: number, // total available amount
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
        label="credits issued"
        format
      />
      <Grid item className={classes.gauge}>
        <Gauge
          amount={props.amount}
          totalAmount={props.totalAmount}
        />
      </Grid>
      <Grid item container direction="row" justify="space-between">
        <GaugeText
          number={props.numberOfHolders}
          label="credit holders"
          variant="body2"
        />
        <GaugeText
          number={props.numberOfProjects}
          label="projects"
          variant="body2"
        />
      </Grid>
    </Grid>
  );
}
