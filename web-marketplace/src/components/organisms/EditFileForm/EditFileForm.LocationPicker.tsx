import { forwardRef, lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { MapRef } from 'react-map-gl';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { CircularProgress } from '@mui/material';
import { Feature, Point } from 'geojson';

import PinIcon from 'web-components/lib/components/icons/PinIcon';
import LocationField from 'web-components/lib/components/inputs/new/LocationField/LocationField';
import { isGeocodingFeature } from 'web-components/lib/components/inputs/new/LocationField/LocationField.types';
import { Body } from 'web-components/lib/components/typography';
import { UseStateSetter } from 'web-components/lib/types/react/useState';

import { useDebounce } from 'hooks/useDebounce';

import { RestrictedViewState } from './EditFileForm.types';

const Map = lazy(() => import('react-map-gl'));

type LocationPickerProps = {
  disabled?: boolean;
  value: Feature | GeocodeFeature;
  mapboxToken?: string;
  handleChange: (value: Feature | GeocodeFeature) => void;
  onBlur: (
    value: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => void;
  geocodingPlaceName?: string;
  setDebouncedViewState: UseStateSetter<RestrictedViewState>;
};

export const LocationPicker = forwardRef<HTMLDivElement, LocationPickerProps>(
  (
    {
      value,
      disabled,
      mapboxToken,
      handleChange,
      onBlur,
      setDebouncedViewState,
      geocodingPlaceName,
    },
    ref,
  ) => {
    const mapRef = useRef<MapRef | null>(null);
    const point = value.geometry as Point;
    const displayedLocation = `${point.coordinates[0]}, ${
      point.coordinates[1]
    } ${geocodingPlaceName ? `(${geocodingPlaceName})` : ''}`;
    const [viewState, setViewState] = useState<RestrictedViewState>({
      longitude: point.coordinates[0],
      latitude: point.coordinates[1],
      zoom: 5,
    });
    const [locationSearch, setLocationSearch] = useState<string | undefined>();

    const debouncedValue = useDebounce(viewState, 1000);
    useEffect(() => {
      if (!isGeocodingFeature(value)) setDebouncedViewState(debouncedValue);
    }, [debouncedValue, setDebouncedViewState, value]);
    // TODO This will need to be used at the upper level component of EditFileForm (EditFileModal)
    // in order to get the place name associated to the center of the current view state (geocodingPlaceName)
    // We use a debounced value so we don't make reverse geocoding queries for every move on the map.
    // const { data } = useQuery(
    //   getGeocodingQuery({
    //     request: {
    //       types: ['place'],
    //       query: [debouncedValue.longitude, debouncedValue.latitude],
    //     },
    //     mapboxToken,
    //     enabled: !!debouncedValue,
    //   }),
    // );

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
                {isGeocodingFeature(value)
                  ? value.place_name
                  : displayedLocation}
              </Body>
            ) : (
              <>
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
              </>
            )}
          </div>
          {/* We simply absolutely position the location pin at the center,
          without using a react-map-gl Marker, so the map moves around the pin */}
          <div className="absolute top-[50%] left-[50%]">
            <PinIcon fontSize="large" size={35} />
          </div>
        </Map>
      </Suspense>
    );
  },
);
