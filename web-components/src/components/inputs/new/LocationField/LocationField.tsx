import React, { forwardRef, useState } from 'react';
import mbxGeocoder, {
  GeocodeFeature,
  GeocodeQueryType,
} from '@mapbox/mapbox-sdk/services/geocoding';

import LocationSearchIcon from '../../../icons/LocationSearchIcon';
import FieldFormControl from '../FieldFormControl/FieldFormControl';
import Input from '../Input/Input';
import { useLocationStyles } from './LocationField.styles';
import { isGeocodingFeature } from './LocationField.types';
import { getLongLat } from './LocationField.utils';

interface LocationFieldProps {
  className?: string;
  description?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  optional?: boolean | string;
  disabled?: boolean;
  placeholder?: string;
  types?: GeocodeQueryType[];
  token?: string;
  value: string | GeocodeFeature;
  handleChange: (value: string | GeocodeFeature) => void;
  onBlur: (
    value: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => void;
  searchIcon?: boolean;
  showCoordinates?: boolean;
}

type Props = React.PropsWithChildren<LocationFieldProps>;

const LocationField = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      label,
      description,
      optional,
      placeholder,
      disabled,
      // https://docs.mapbox.com/api/search/geocoding/#data-types
      types = [
        'country',
        'region',
        'postcode',
        'district',
        'place',
        'locality',
        'neighborhood',
        'address',
        'poi',
      ],
      token: accessToken = '',
      value,
      handleChange,
      onBlur,
      searchIcon = true,
      showCoordinates = false,
      ...props
    },
    ref,
  ) => {
    const geocoderService = mbxGeocoder({ accessToken });
    const [features, setFeatures] = useState<GeocodeFeature[]>([]);
    const [showResults, setShowResults] = useState(true);

    const { classes } = useLocationStyles();

    return (
      <FieldFormControl
        className={className}
        label={label}
        description={description}
        disabled={disabled}
        optional={optional}
      >
        <>
          <Input
            {...props}
            placeholder={placeholder}
            endAdornment={
              searchIcon && (
                <LocationSearchIcon
                  sx={{ color: 'grey.100', width: 20, height: 22 }}
                />
              )
            }
            value={
              isGeocodingFeature(value)
                ? showCoordinates
                  ? `${value.geometry.coordinates[0]}, ${value.geometry.coordinates[1]} (${value.place_name})`
                  : value.place_name
                : value
            }
            onBlur={e => {
              onBlur(e);
              setTimeout(() => {
                // setShowResults(false);
              }, 800);
            }}
            onChange={({ target: { value } }) => {
              handleChange(value);
              if (value.length >= 1) {
                const longLat = getLongLat(value);

                if (longLat) {
                  const coordinates: [number, number] = [
                    longLat[0],
                    longLat[1],
                  ];
                  geocoderService
                    .reverseGeocode({
                      mode: 'mapbox.places',
                      query: coordinates,
                      types: ['place'],
                    })
                    .send()
                    .then(({ body }) => {
                      setFeatures(body.features);
                      setShowResults(true);
                    });
                } else {
                  geocoderService
                    .forwardGeocode({
                      types,
                      mode: 'mapbox.places',
                      query: value,
                    })
                    .send()
                    .then(res => {
                      setFeatures(res.body.features);
                      setShowResults(true);
                    });
                }
              }
            }}
            ref={ref}
          />
          {showResults &&
            features.map((item, index) => (
              <div
                key={index}
                className={classes.result}
                onClick={() => {
                  let geojson;
                  const longLat = getLongLat(value as string);
                  // in case the user entered precise coordinates,
                  // we keep those but add the corresponding place name to be displayed on the project page
                  if (longLat) {
                    const { context, place_name } = item;
                    geojson = {
                      type: 'Feature',
                      geometry: {
                        type: 'Point',
                        coordinates: [longLat[0], longLat[1]],
                      },
                      context,
                      place_name,
                    };
                  } else {
                    geojson = item;
                  }
                  handleChange({
                    // @ts-ignore
                    '@context': {
                      '@vocab': 'https://purl.org/geojson/vocab#',
                      type: '@type',
                      coordinates: { '@container': '@list' },
                    },
                    ...geojson,
                  });
                  setShowResults(false);
                }}
              >
                {item.place_name}
              </div>
            ))}
        </>
      </FieldFormControl>
    );
  },
);

export default LocationField;
