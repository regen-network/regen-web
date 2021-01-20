import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import { getFormattedPlace } from './place';
import PlaceInfo from './PlaceInfo';

export interface Place {
  city?: string;
  region?: string;
  state: string;
  country: string;
}

interface ProjectPlaceInfoProps {
  place: Place | string;
  area: number;
  areaUnit: string;
  fontSize?: string;
  smFontSize?: string;
  color?: string;
  displayCity?: boolean;
  displayRegion?: boolean;
  displayCountry?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  separator: {
    fontWeight: 100,
  },
}));

export default function ProjectPlaceInfo({
  place,
  area,
  areaUnit,
  fontSize,
  smFontSize,
  color,
  displayCity = true,
  displayRegion = true,
  displayCountry = true,
}: ProjectPlaceInfoProps): JSX.Element {
  const classes = useStyles({});
  const displayedArea: string = new Intl.NumberFormat('en-US').format(area);
  const formattedPlace: string =
    typeof place === 'string' ? place : getFormattedPlace(place, displayCity, displayRegion, displayCountry);
  return (
    <PlaceInfo fontSize={fontSize} smFontSize={smFontSize} color={color}>
      {formattedPlace}
      <span className={classes.separator}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      {displayedArea} {areaUnit}
    </PlaceInfo>
  );
}
