import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import PlaceInfo from './PlaceInfo';

interface ProjectPlaceInfoProps {
  place: string;
  area: number;
  areaUnit: string;
  fontSize?: string;
  smFontSize?: string;
  color?: string;
  displayCity?: boolean;
  displayRegion?: boolean;
  displayCountry?: boolean;
  iconClassName?: string;
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
  iconClassName,
}: ProjectPlaceInfoProps): JSX.Element {
  const classes = useStyles({});
  const displayedArea: string = new Intl.NumberFormat('en-US').format(area);
  return (
    <PlaceInfo
      fontSize={fontSize}
      smFontSize={smFontSize}
      color={color}
      iconClassName={iconClassName}
    >
      {place}
      <span className={classes.separator}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      {displayedArea} {areaUnit}
    </PlaceInfo>
  );
}
