import Grid from '@mui/material/Grid';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import Gauge from './Gauge';
import GaugeText from './GaugeText';

export interface CreditsProps {
  numberOfHolders: number;
  numberOfHoldersLabel: string;
  numberOfProjects: number;
  numberOfProjectsLabel: string;
  amount: number; // current purchased amount
  totalAmount: number; // total available amount
  totalAmountLabel: string;
  unit?: string; // currency?
}

const useStyles = makeStyles()((theme: Theme) => ({
  gauge: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
  },
}));

export default function Credits(props: CreditsProps): JSX.Element {
  const { classes } = useStyles();
  return (
    <Grid container direction="column">
      <GaugeText
        number={props.totalAmount}
        label={props.totalAmountLabel}
        format
      />
      <Grid item className={classes.gauge}>
        <Gauge amount={props.amount} totalAmount={props.totalAmount} />
      </Grid>
      <Grid item container direction="row" justifyContent="space-between">
        <GaugeText
          number={props.numberOfHolders}
          label={props.numberOfHoldersLabel}
          textSize="xs"
        />
        <GaugeText
          number={props.numberOfProjects}
          label={props.numberOfProjectsLabel}
          textSize="xs"
        />
      </Grid>
    </Grid>
  );
}
