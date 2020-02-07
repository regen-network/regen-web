import * as React from 'react';
import PlaceInfo from './PlaceInfo';
import { makeStyles, Theme } from '@material-ui/core';

interface ProjectPlaceInfoProps {
  place: string;
  area: number;
  areaUnit: string;
  fontSize?: string;
  smFontSize?: string;
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
  smFontSize,
  color,
}: ProjectPlaceInfoProps): JSX.Element {
  const classes = useStyles({});
  const displayedArea: string = new Intl.NumberFormat('en-US').format(area);
  return (
    <PlaceInfo fontSize={fontSize} smFontSize={smFontSize} color={color}>
      {place}
      <span className={classes.separator}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      {displayedArea} {areaUnit}
    </PlaceInfo>
  );
}
