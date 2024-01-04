import { lazy, Suspense, useState } from 'react';
import { CircularProgress } from '@mui/material';
import bbox from '@turf/bbox';
import { FeatureCollection } from 'geojson';

import PinIcon from '../icons/PinIcon';

import 'mapbox-gl/dist/mapbox-gl.css';

const Map = lazy(() => import('react-map-gl'));
const Marker = lazy(() => import('./lib/Marker'));

export interface MapProps {
  geojson: FeatureCollection;
  mapboxToken?: string;
}

export default function StaticMap({
  geojson,
  mapboxToken,
}: MapProps): JSX.Element {
  const [viewPort, setViewPort] = useState({
    zoom: 11,
    latitude: 0.0,
    longitude: 0.0,
    width: 1,
    height: 1,
  });
  const [boundary, setBoundary] = useState({
    zoom: 11,
    latitude: 0.0,
    longitude: 0.0,
  });

  const onLoad = (): void => {
    if (viewPort) {
      const [minLng, minLat, maxLng, maxLat] = bbox(geojson);
      import('@math.gl/web-mercator').then(({ WebMercatorViewport }) => {
        const webViewport = new WebMercatorViewport(viewPort);
        const { longitude, latitude, zoom, width, height } =
          webViewport.fitBounds([
            [minLng, minLat],
            [maxLng, maxLat],
          ]);
        setViewPort({
          longitude,
          latitude,
          zoom: 4,
          width,
          height,
        });
        setBoundary({ longitude, latitude, zoom });
      });
    }
  };

  return (
    <Suspense fallback={<CircularProgress color="secondary" />}>
      <Map
        {...viewPort}
        style={{ width: '100%', height: '100%' }}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v10"
        onLoad={onLoad}
        attributionControl={false}
        boxZoom={false}
        doubleClickZoom={false}
        dragRotate={false}
        dragPan={false}
        keyboard={false}
        touchPitch={false}
        touchZoomRotate={false}
        cursor="default"
      >
        <Marker
          latitude={boundary.latitude}
          longitude={boundary.longitude}
          style={{ cursor: 'default' }}
        >
          <PinIcon fontSize="large" size={35} />
        </Marker>
      </Map>
    </Suspense>
  );
}
