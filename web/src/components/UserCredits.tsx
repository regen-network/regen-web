import React from 'react';
// import { makeStyles, Theme } from '@material-ui/core/styles';
import { PurchasedCredits } from '../mocks';

// const useStyles = makeStyles((theme: Theme) => ({}));

interface PurchasedCreditsProps {
  credits: PurchasedCredits;
}

export default function UserCredits({ credits }: PurchasedCreditsProps): JSX.Element {
  // const classes = useStyles({});
  return <div>{credits.userId}</div>;
}
