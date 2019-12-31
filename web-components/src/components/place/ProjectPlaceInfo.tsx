import * as React from 'react';
import PlaceInfo from './PlaceInfo';

interface ProjectPlaceInfoProps {
  place: string;
  area: number;
}

export default function ProjectPlaceInfo({ place, area }: ProjectPlaceInfoProps): JSX.Element {
  return (
    <PlaceInfo>
      {place} | {area} hectares
    </PlaceInfo>
  );
}
