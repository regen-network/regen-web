import * as React from 'react';
import PlaceInfo from './PlaceInfo';
import { makeStyles, Theme } from '@material-ui/core';
import { getFormattedPlace } from './place';

export interface Place {
  city?: string;
  state: string;
  country: string;
}

interface ProjectPlaceInfoProps {
  place: Place;
  area: number;
  areaUnit: string;
  fontSize?: string;
  smFontSize?: string;
  color?: string;
  displayCity?: boolean;
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
  displayCountry = true,
}: ProjectPlaceInfoProps): JSX.Element {
  const classes = useStyles({});
  const displayedArea: string = new Intl.NumberFormat('en-US').format(area);
  return (
    <PlaceInfo fontSize={fontSize} smFontSize={smFontSize} color={color}>
      {getFormattedPlace(place, displayCity, displayCountry)}
      <span className={classes.separator}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      {displayedArea} {areaUnit}
    </PlaceInfo>
  );
}
