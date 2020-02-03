import * as React from 'react';
import PlaceInfo from './PlaceInfo';
import { makeStyles, Theme } from '@material-ui/core';

interface ProjectPlaceInfoProps {
  place: string;
  area: number;
  areaUnit: string;
  fontSize?: string;
  color?: string;
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
  color,
}: ProjectPlaceInfoProps): JSX.Element {
  const classes = useStyles({});

  return (
    <PlaceInfo fontSize={fontSize} color={color}>
      {place}
      <span className={classes.separator}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      {area} {areaUnit}
    </PlaceInfo>
  );
}
