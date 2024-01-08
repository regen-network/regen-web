import { forwardRef, lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { MapRef } from 'react-map-gl';
import MapboxClient from '@mapbox/mapbox-sdk';
import mbxGeocoder, {
  GeocodeFeature,
  GeocodeQueryType,
} from '@mapbox/mapbox-sdk/services/geocoding';
// import Map, { Marker } from 'react-map-gl';
import { CircularProgress } from '@mui/material';
import { Feature, Point } from 'geojson';

import PinIcon from '../../../icons/PinIcon';
import { Body } from '../../../typography';
import LocationField from '../LocationField/LocationField';
import { isGeocodingFeature } from '../LocationField/LocationField.types';

const Map = lazy(() => import('react-map-gl'));

type LocationPickerProps = {
  disabled?: boolean;
  value: Feature | GeocodeFeature;
  mapboxToken?: string;
  handleChange: (value: Feature | GeocodeFeature) => void;
};

export const LocationPicker = forwardRef<HTMLDivElement, LocationPickerProps>(
  ({ value, disabled, mapboxToken, handleChange }, ref) => {
    const mapRef = useRef<MapRef | null>(null);
    const point = value.geometry as Point;
    const baseClient = MapboxClient({ accessToken: mapboxToken });
    const geocoderService = mbxGeocoder(baseClient);
    const coordinates = `${point.coordinates[0]}, ${point.coordinates[1]}`;
    const [viewState, setViewState] = useState({
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
            // geocoderService
            //   .reverseGeocode({
            //     types: ['place'],
            //     mode: 'mapbox.places',
            //     query: [evt.viewState.longitude, evt.viewState.latitude],
            //   })
            //   .send()
            //   .then(({ body }) => {
            //     console.log(body.features[0]?.place_name);
            //   });
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
          cursor={disabled ? 'default' : 'auto'}
        >
          <div className="absolute top-0 w-[100%]">
            {disabled ? (
              <Body
                size="md"
                className="p-20 pb-15 bg-grey-700/[.6] text-grey-0"
              >
                {isGeocodingFeature(value) ? value.place_name : coordinates}
              </Body>
            ) : (
              <>
                <LocationField
                  token={mapboxToken}
                  value={
                    locationSearch ??
                    (isGeocodingFeature(value) ? value : coordinates)
                  }
                  handleChange={value => {
                    if (isGeocodingFeature(value)) {
                      setLocationSearch(undefined);
                      handleChange(value);
                    } else {
                      setLocationSearch(value);
                    }
                  }}
                  onBlur={() => {}} // TODO
                  searchIcon={false}
                  showCoordinates
                />
              </>
            )}
          </div>

          <div className="absolute top-[50%] left-[50%]">
            <PinIcon fontSize="large" size={35} />
          </div>
        </Map>
      </Suspense>
    );
  },
);
