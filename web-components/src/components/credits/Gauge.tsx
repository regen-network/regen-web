import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

interface GaugeProps {
  amount: number,
  totalAmount: number,
}

interface StyleProps {
  percentage: number,
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    height: theme.spacing(1.25),
    borderRadius: '0.5rem',
    backgroundColor: theme.palette.info.light,
  },
  gauge: props => ({
    width: `${props.percentage}%`,
    height: '100%',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '0.5rem',
  }),
}));

export default function Gauge({ amount, totalAmount }: GaugeProps): JSX.Element {
  const classes = useStyles({
    percentage: totalAmount? 100 * amount / totalAmount : 0,
  });
  return (
    <div className={classes.root}>
      <div className={classes.gauge} />
    </div>
  );
}
