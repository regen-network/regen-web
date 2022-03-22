import * as React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';

import PlaceInfo from './PlaceInfo';

interface ProjectPlaceInfoProps {
  place: string;
  area?: number;
  areaUnit?: string;
  fontSize?: string;
  smFontSize?: string;
  color?: string;
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
  iconClassName,
}: ProjectPlaceInfoProps): JSX.Element {
  const classes = useStyles({});
  let displayedArea: string | undefined;
  if (area) {
    displayedArea = new Intl.NumberFormat('en-US').format(area);
  }
  return (
    <PlaceInfo
      fontSize={fontSize}
      smFontSize={smFontSize}
      color={color}
      iconClassName={iconClassName}
      showIcon={!!place}
    >
      {place}
      {place && displayedArea && areaUnit && (
        <span className={classes.separator}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      )}
      {displayedArea && areaUnit && (
        <span>
          {displayedArea} {areaUnit}
        </span>
      )}
    </PlaceInfo>
  );
}
