import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { FieldProps } from 'formik';
import MapboxClient from '@mapbox/mapbox-sdk';
import mbxGeocoder, { GeocodeQueryType, GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import FieldFormControl from './FieldFormControl';
import Input from './Input';

const useStyles = makeStyles((theme: Theme) => ({
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
  optional?: boolean;
  placeholder?: string;
  types?: GeocodeQueryType[];
  token: string;
  transformValue?: (v: any) => any;
  triggerOnChange?: (v: any) => Promise<void>;
}

const LocationField: React.FC<Props> = ({
  description,
  className,
  label,
  optional,
  placeholder,
  transformValue,
  triggerOnChange,
  types = ['address'],
  token: accessToken,
  ...fieldProps
}) => {
  const baseClient = MapboxClient({ accessToken });
  const geocoderService = mbxGeocoder(baseClient);
  const [results, setResults] = useState<GeocodeFeature[]>([]);
  const [showResults, setShowResults] = useState(true);
  const { form, field } = fieldProps;

  const classes = useStyles();
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
            value={field.value.place_name}
            onBlur={({ target: { value } }) => {
              handleBlur(value);
              setTimeout(() => setShowResults(false), 200); // without the timeout, `onBlur` fires before the click event on the results list, so the value doesn't properly update. There's probably a better solution to this, but it works fo rnow
            }}
            onChange={({ target: { value } }) => {
              handleChange(value);
              if (value.length > 1) {
                geocoderService
                  .forwardGeocode({
                    types,
                    mode: 'mapbox.places',
                    query: value,
                  })
                  .send()
                  .then(res => {
                    setResults(res.body.features);
                    setShowResults(true);
                  });
              }
            }}
          />
          {showResults &&
            results.map((item, index) => (
              <div
                key={index}
                className={classes.result}
                onClick={() => {
                  handleChange(item);
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
