import * as React from 'react';
import PlaceInfo from './PlaceInfo';

interface ProjectPlaceInfoProps {
  place: string;
  area: number;
  fontSize?: string;
}

export default function ProjectPlaceInfo({ place, area, fontSize }: ProjectPlaceInfoProps): JSX.Element {
  return (
    <PlaceInfo fontSize={fontSize}>
      {place} | {area} hectares
    </PlaceInfo>
  );
}
