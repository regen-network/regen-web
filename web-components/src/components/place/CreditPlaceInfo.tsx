import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import PlaceInfo from './PlaceInfo';

interface CreditPlaceInfoProps {
  place: string;
  outcome?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  outcome: {
    color: theme.palette.info.main,
  },
}));

export default function CreditPlaceInfo({ place, outcome }: CreditPlaceInfoProps): JSX.Element {
  const classes = useStyles({});
  return (
    <PlaceInfo>
      {place}
      {outcome && " in "}
      {outcome && <span className={classes.outcome}>{outcome}</span>}
    </PlaceInfo>
  );
}
