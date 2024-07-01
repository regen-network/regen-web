import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { MapRef } from 'react-map-gl';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { CircularProgress } from '@mui/material';
import { Feature, Point } from 'geojson';

import { GreenPinIcon } from '../../../icons/GreenPinIcon';
import { Body } from '../../../typography';
import LocationField from '../LocationField/LocationField';
import { isGeocodingFeature } from '../LocationField/LocationField.types';
import { RestrictedViewState } from './LocationPicker.types';

import 'mapbox-gl/dist/mapbox-gl.css';

const Map = lazy(() => import('react-map-gl'));

type LocationPickerProps = {
  disabled?: boolean;
  value: Feature | GeocodeFeature;
  mapboxToken?: string;
  handleChange: (value: Feature<Point> | GeocodeFeature) => void;
  onBlur: (
    value: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => void;
  geocodingPlaceName?: string;
};

export const LocationPicker = ({
  value,
  disabled,
  mapboxToken,
  handleChange,
  onBlur,
  geocodingPlaceName,
}: LocationPickerProps): JSX.Element => {
  const mapRef = useRef<MapRef | null>(null);
  const point = value.geometry as Point;

  const displayedLocation = `${point.coordinates[0]}, ${point.coordinates[1]} ${
    geocodingPlaceName ? `(${geocodingPlaceName})` : ''
  }`;
  const [viewState, setViewState] = useState<RestrictedViewState>({
    longitude: point.coordinates[0],
    latitude: point.coordinates[1],
    zoom: 5,
  });
  const [locationSearch, setLocationSearch] = useState<string | undefined>();

  useEffect(() => {
    if (
      viewState.longitude !== point.coordinates[0] &&
      viewState.latitude !== point.coordinates[1]
    )
      // The value can change either on Map move or from a change outside of this component
      // (in the context of the EditFileForm, by selecting another radio input value), so we update
      // the map view state accordingly in useEffect.
      setViewState({
        zoom: viewState.zoom,
        longitude: point.coordinates[0],
        latitude: point.coordinates[1],
      });
  }, [point, viewState]);

  return (
    <Suspense fallback={<CircularProgress color="secondary" />}>
      <Map
        {...viewState}
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '4px',
        }}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v10"
        onZoom={evt => setViewState(evt.viewState)}
        onMove={evt => {
          if (mapRef.current?.isZooming()) {
            return;
          }
          handleChange({
            type: 'Feature',
            properties: [],
            geometry: {
              type: 'Point',
              coordinates: [evt.viewState.longitude, evt.viewState.latitude],
            },
          });
        }}
        attributionControl={false}
        boxZoom={!disabled}
        doubleClickZoom={!disabled}
        dragRotate={!disabled}
        dragPan={!disabled}
        keyboard={!disabled}
        scrollZoom={disabled ? false : { around: 'center' }}
        touchPitch={!disabled}
        touchZoomRotate={disabled ? false : { around: 'center' }}
        cursor={disabled ? 'default' : undefined}
      >
        <div className="absolute top-0 w-[100%]">
          {disabled ? (
            <Body size="md" className="p-20 pb-15 bg-grey-700/[.6] text-grey-0">
              {isGeocodingFeature(value) ? value.place_name : displayedLocation}
            </Body>
          ) : (
            <div className="pt-10 px-10">
              <LocationField
                token={mapboxToken}
                className="text-grey-500"
                value={
                  locationSearch ??
                  (isGeocodingFeature(value) ? value : displayedLocation)
                }
                handleChange={value => {
                  if (isGeocodingFeature(value)) {
                    setLocationSearch(undefined);
                    handleChange(value);
                  } else {
                    setLocationSearch(value);
                  }
                }}
                onBlur={onBlur}
                searchIcon={false}
                showCoordinates
              />
            </div>
          )}
        </div>
        {/* We simply absolutely position the location pin at the center,
          without using a react-map-gl Marker, so the map moves around the pin */}
        <div className="absolute top-[50%] left-[50%]">
          <GreenPinIcon />
        </div>
      </Map>
    </Suspense>
  );
};
