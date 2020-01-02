import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import PlaceInfo from './PlaceInfo';

interface CreditPlaceInfoProps {
  place: string;
  outcome?: string;
  fontSize?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  outcome: {
    color: theme.palette.info.main,
  },
}));

export default function CreditPlaceInfo({ place, outcome, fontSize }: CreditPlaceInfoProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();

  return (
    <PlaceInfo fontSize={fontSize} color={theme.palette.primary.light}>
      {place}
      {outcome && " in "}
      {outcome && <span className={classes.outcome}>{outcome}</span>}
    </PlaceInfo>
  );
}
