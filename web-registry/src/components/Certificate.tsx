import React, { useEffect } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({}));

export default function Certificate(): JSX.Element {
  const classes = useStyles();
  const searchParams = new URLSearchParams(window.location.search);
  const stripeId = searchParams.get('stripeId');

  return <></>;
}
