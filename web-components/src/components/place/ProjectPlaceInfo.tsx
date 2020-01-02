import * as React from 'react';
import PlaceInfo from './PlaceInfo';

interface ProjectPlaceInfoProps {
  place: string;
  area: number;
  fontSize?: string;
  color?: string;
}

export default function ProjectPlaceInfo({ place, area, fontSize, color }: ProjectPlaceInfoProps): JSX.Element {
  return (
    <PlaceInfo fontSize={fontSize} color={color}>
      {place} | {area} hectares
    </PlaceInfo>
  );
}
