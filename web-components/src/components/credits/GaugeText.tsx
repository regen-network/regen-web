import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { ThemeStyle } from '@material-ui/core/styles/createTypography';

interface GaugeTextProps {
  number: number,
  label: string,
  format?: boolean,
  variant?: ThemeStyle,
}

const useStyles = makeStyles((theme: Theme) => ({
  number: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 900,
  },
  text: {
    fontSize: '0.75rem',
  },
}));

export default function GaugeText({
  number,
  label,
  format,
  variant,
}: GaugeTextProps): JSX.Element {
  const classes = useStyles({});
  const displayedNumber: string = format ?
    new Intl.NumberFormat('en-US').format(number) : number.toString();
  return (
    <Typography variant={variant || "body1"}>
      <span className={classes.number}>{displayedNumber} </span>
      <span className={classes.text}>{label}</span>
    </Typography>
  );
}
