import React, { useState } from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core';
import bbox from '@turf/bbox';
// import { FeatureCollection } from 'geojson';
// import { AllGeoJSON } from '@turf/helpers';
import ReactMapGL, { Marker, Source, Layer, NavigationControl, WebMercatorViewport } from 'react-map-gl';
import PinIcon from '../icons/PinIcon';

interface GeoJson {
  features: any[];
}

interface MapProps {
  geojson: GeoJson;
  token: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(195),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(126),
    },
  },
  scaleControl: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    '& span': {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

export default function Map({ geojson, token }: MapProps): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();

  const [viewPort, setViewPort] = useState({ zoom: 11, latitude: 1, longitude: 1 });

  const onLoad = (): void => {
    const [minLng, minLat, maxLng, maxLat] = bbox(geojson);
    const webViewport = new WebMercatorViewport(viewPort);
    const { longitude, latitude, zoom } = webViewport.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      {
        padding: 10,
      },
    );
    setViewPort({ longitude, latitude, zoom });
  };

  return (
    <div className={classes.root}>
      <ReactMapGL
        {...viewPort}
        onLoad={onLoad}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/satellite-streets-v10"
        onViewportChange={v => setViewPort(v)}
        mapboxApiAccessToken={token}
      >
        {geojson.features &&
          geojson.features.map((feature, index) => {
            return (
              <div key={index}>
                {feature.geometry.type === 'Polygon' && !feature.properties.boundary && (
                  <Source type="geojson" data={feature}>
                    <Layer
                      type="fill"
                      paint={{
                        'fill-opacity': feature.properties['fill-opacity'],
                        'fill-color': feature.properties['fill'],
                      }}
                    />
                  </Source>
                )}
                {feature.geometry.type === 'Polygon' && !feature.properties.boundary && (
                  <Source type="geojson" data={feature}>
                    <Layer
                      type="line"
                      paint={{
                        'line-color': feature.properties['stroke'],
                        'line-width': 2,
                      }}
                    />
                  </Source>
                )}
                {feature.geometry.type === 'Polygon' && feature.properties.boundary && (
                  <Source type="geojson" data={feature}>
                    <Layer
                      type="line"
                      paint={{
                        'line-color': theme.palette.primary.main,
                        'line-width': 2,
                        'line-dasharray': [2, 1.5],
                      }}
                    />
                  </Source>
                )}
                {feature.geometry.type === 'Point' && (
                  <Marker
                    latitude={feature.geometry.coordinates[1]}
                    longitude={feature.geometry.coordinates[0]}
                  >
                    <PinIcon fontSize="large" />
                  </Marker>
                )}
              </div>
            );
          })}
        <div className={classes.scaleControl}>
          <NavigationControl showCompass={false} />
        </div>
      </ReactMapGL>
    </div>
  );
}
