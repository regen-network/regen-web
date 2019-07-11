import React from 'react';
import * as turf from '@turf/turf';

export interface PolygonIconProps {
  polygon: turf.Polygon,
}

export function PolygonIcon(props: PolygonIconProps) {
  const {polygon} = props;
  const bbox = turf.bbox(polygon);
  const [minX, minY, maxX, maxY] = bbox;
  const center= turf.center(polygon);
  const [cx, cy] = center.geometry != null ? center.geometry.coordinates : [0,0];
  const boxWidth = maxX - minX
  const boxHeight = maxY - minY
  const coordinateArray = polygon.coordinates;
  let coordinates = "";
  coordinateArray[0].forEach((point) => {
    coordinates += `${point[0] - cx},${point[1] - cy} `;
  });

  const viewbox = `${minX - cx} ${minY - cy} ${boxWidth} ${boxHeight}`;
  const transform = `scale(1,-1)`

  return (
    <div>
      <svg viewBox={viewbox} width="50" height="50" overflow="visible" xmlns="http://www.w3.org/2000/svg">
        <polygon points={coordinates} transform={transform}
                 fill={"#ffc433"} stroke="none"/>
      </svg>
    </div>
  );
}

export default PolygonIcon;
