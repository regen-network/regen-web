import React from 'react';
import Grid from '@mui/material/Grid';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { pluralize } from '../../utils/pluralize';
import Gauge from './Gauge';
import GaugeText from './GaugeText';

export interface CreditsProps {
  purchased: number; // current purchased amount
  issued: number; // total issued amount
  creditsPurchasedLabel: string;
  creditsIssuedLabel: string;
}

const useStyles = makeStyles()((theme: Theme) => ({
  gauge: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
  },
}));

export default function CreditsGauge(props: CreditsProps): JSX.Element {
  const { classes } = useStyles();
  const available: number = props.issued - props.purchased;
  return (
    <Grid container direction="column">
      <Grid item container direction="row" justifyContent="space-between">
        {props.purchased > 0 && (
          <GaugeText
            format
            number={props.purchased}
            label={props.creditsPurchasedLabel}
            textSize="xs"
          />
        )}
        <GaugeText
          format
          number={available}
          label={props.creditsIssuedLabel}
          textSize="xs"
        />
      </Grid>
      {props.purchased > 0 && (
        <Grid item className={classes.gauge}>
          <Gauge
            height="1.6875rem"
            borderRadius="3.125rem"
            amount={props.purchased}
            totalAmount={props.issued}
          />
        </Grid>
      )}
    </Grid>
  );
}
