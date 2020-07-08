import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

interface GaugeProps {
  amount: number;
  totalAmount: number;
  height?: string;
  borderRadius?: string;
}

interface StyleProps {
  percentage: number;
  height?: string;
  borderRadius?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    height: props => props.height || theme.spacing(1.25),
    borderRadius: props => props.borderRadius || '0.5rem',
    backgroundColor: theme.palette.info.light,
    border: `1px solid ${theme.palette.grey[100]}`,
  },
  gauge: props => ({
    width: `${props.percentage}%`,
    height: '100%',
    backgroundColor: theme.palette.secondary.main,
    borderTopLeftRadius: props.borderRadius || '0.5rem',
    borderBottomLeftRadius: props.borderRadius || '0.5rem',
  }),
}));

export default function Gauge({ amount, totalAmount, height, borderRadius }: GaugeProps): JSX.Element {
  const classes = useStyles({
    percentage: totalAmount ? (100 * amount) / totalAmount : 0,
    height,
    borderRadius,
  });
  return (
    <div className={classes.root}>
      <div className={classes.gauge} />
    </div>
  );
}
