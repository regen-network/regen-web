import React, { useState } from 'react';
import bbox from '@turf/bbox';
import { Marker, WebMercatorViewport, StaticMap } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PinIcon from '../icons/PinIcon';

interface GeoJson {
  features: any[];
}

interface MapProps {
  geojson: GeoJson;
  token: string | undefined;
}

export default function Map({ geojson, token }: MapProps): JSX.Element {
  const [viewPort, setViewPort] = useState({ zoom: 11, latitude: 0.0, longitude: 0.0 });
  const [boundary, setBoundary] = useState({ zoom: 11, latitude: 0.0, longitude: 0.0 });

  const onLoad = (): void => {
    if (viewPort) {
      const [minLng, minLat, maxLng, maxLat] = bbox(geojson);
      const webViewport = new WebMercatorViewport(viewPort);
      const { longitude, latitude, zoom } = webViewport.fitBounds([
        [minLng, minLat],
        [maxLng, maxLat],
      ]);
      setViewPort({ longitude, latitude, zoom: 4 });
      setBoundary({ longitude, latitude, zoom });
    }
  };

  return (
    <StaticMap
      {...viewPort}
      width="100%"
      height="100%"
      mapboxApiAccessToken={token}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v10"
      onLoad={onLoad}
      attributionControl={false}
    >
      <Marker latitude={boundary.latitude} longitude={boundary.longitude}>
        <PinIcon fontSize="large" size={35} />
      </Marker>
    </StaticMap>
  );
}
