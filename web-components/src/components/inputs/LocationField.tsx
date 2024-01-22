import React, { useState } from 'react';
import MapboxClient from '@mapbox/mapbox-sdk';
import mbxGeocoder, {
  GeocodeFeature,
  GeocodeQueryType,
} from '@mapbox/mapbox-sdk/services/geocoding';
import { Theme } from '@mui/material/styles';
import { FieldProps } from 'formik';
import { makeStyles } from 'tss-react/mui';

import FieldFormControl from './FieldFormControl';
import Input from './Input';

const useStyles = makeStyles()((theme: Theme) => ({
  result: {
    border: `1px solid ${theme.palette.info.light}`,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1.25),
    cursor: 'pointer',
  },
}));

interface Props extends FieldProps {
  className?: string;
  description?: string;
  label?: string;
  optional?: boolean | string;
  placeholder?: string;
  types?: GeocodeQueryType[];
  token: string;
  transformValue?: (v: any) => any;
  triggerOnChange?: (v: any) => Promise<void>;
}

const LocationField: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  label,
  optional,
  placeholder,
  transformValue,
  triggerOnChange,
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
  token: accessToken,
  ...fieldProps
}) => {
  const baseClient = MapboxClient({ accessToken });
  const geocoderService = mbxGeocoder(baseClient);
  const [features, setFeatures] = useState<GeocodeFeature[]>([]);
  const [showResults, setShowResults] = useState(true);
  const { form, field } = fieldProps;

  const { classes } = useStyles();
  return (
    <FieldFormControl
      className={className}
      label={label}
      disabled={form.isSubmitting}
      optional={optional}
      {...fieldProps}
    >
      {({ handleChange, handleBlur }) => (
        <>
          <Input
            {...fieldProps}
            placeholder={placeholder}
            value={field.value ? field.value.place_name : undefined}
            onBlur={({ target: { value } }) => {
              setTimeout(() => {
                handleBlur(value);
                setShowResults(false);
                // without the timeout, `onBlur` fires before the click event on the results list, so the value doesn't properly update. There's probably a better solution to this, but it works fo rnow
              }, 800);
            }}
            onSelect={() => form.setFieldTouched(field.name, true)}
            onChange={({ target: { value } }) => {
              handleChange(value);
              if (value.length >= 1) {
                const isCoordinates =
                  /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(
                    value,
                  );
                if (isCoordinates) {
                  const [longitude, latitude] = value
                    .split(',')
                    .map(Number) as [number, number];
                  const coordinates: [number, number] = [longitude, latitude];
                  geocoderService
                    .reverseGeocode({
                      mode: 'mapbox.places',
                      query: coordinates,
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
          />
          {showResults &&
            features.map((item, index) => (
              <div
                key={index}
                className={classes.result}
                onClick={() => {
                  handleChange({
                    '@context': {
                      '@vocab': 'https://purl.org/geojson/vocab#',
                      type: '@type',
                      coordinates: { '@container': '@list' },
                    },
                    ...item,
                  });
                  setShowResults(false);
                }}
              >
                {item.place_name}
              </div>
            ))}
        </>
      )}
    </FieldFormControl>
  );
};

export default LocationField;
