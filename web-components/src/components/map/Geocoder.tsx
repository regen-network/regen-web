import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme } from '@material-ui/core';
import MapboxClient from '@mapbox/mapbox-sdk';
import mbxGeocoder, {
  GeocodeQueryType,
} from '@mapbox/mapbox-sdk/services/geocoding';

interface GeocoderProps {
  token: string | undefined;
  types?: GeocodeQueryType[];
  setFeature: (feature: any) => void;
  fullWidth: boolean;
  label: string;
  className?: any;
  required?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  result: {
    border: `1px solid ${theme.palette.info.light}`,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1.25),
    cursor: 'pointer',
  },
}));

export default function Geocoder({
  token: accessToken,
  types = ['address'],
  setFeature,
  fullWidth,
  label,
  className,
  required = false,
}: GeocoderProps): JSX.Element {
  const classes = useStyles();
  const baseClient = MapboxClient({ accessToken });
  const geocoderService = mbxGeocoder(baseClient);
  const [address, setAddress] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState<boolean>(true);

  return (
    <div>
      <TextField
        className={className}
        label={label}
        required={required}
        fullWidth={fullWidth}
        value={address}
        onChange={async ({ target: { value } }) => {
          setAddress(value);
          const res = await geocoderService
            .forwardGeocode({
              types,
              mode: 'mapbox.places',
              query: value,
            })
            .send();
          setShowResults(true);
          setResults(res.body.features);
        }}
      />
      <div>
        {showResults &&
          results.map((item, index) => (
            <div
              key={index}
              className={classes.result}
              onClick={() => {
                setAddress(item.place_name);
                setShowResults(false);
                setFeature(item);
              }}
            >
              {item.place_name}
            </div>
          ))}
      </div>
    </div>
  );
}
