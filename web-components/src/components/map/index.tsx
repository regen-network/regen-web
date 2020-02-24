import React, { useState } from 'react';
// import { makeStyles, useTheme, Theme } from '@material-ui/core';
import bbox from '@turf/bbox';
// import { FeatureCollection } from 'geojson';
// import { AllGeoJSON } from '@turf/helpers';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReactMapGL, {
  Popup,
  Marker,
  Source,
  Layer,
  NavigationControl,
  WebMercatorViewport,
} from 'react-map-gl';

import PinIcon from '../icons/PinIcon';
import MapCard from '../cards/MapCard';
import MapCards from '../sliders/MapCards';

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
    position: 'relative',
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
  popup: {
    '& .mapboxgl-popup-content': {
      padding: 0,
      background: 'none',
      boxShadow: 'none',
    },
  },
  slider: {
    position: 'absolute',
    bottom: '30px',
    width: '100%',
  },
}));

interface PopupInfo {
  lngLat: number[];
  feature: any;
}

export default function Map({ geojson, token }: MapProps): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const filteredFeatures: any[] = geojson.features.filter(feature => !feature.properties.boundary);

  const [viewPort, setViewPort] = useState({ zoom: 11, latitude: 1, longitude: 1 });
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const [shownLayer, setShownLayer] = useState<string | null>(
    filteredFeatures.length ? filteredFeatures[0].id : null,
  );

  const onLoad = (): void => {
    const [minLng, minLat, maxLng, maxLat] = bbox(geojson);
    const webViewport = new WebMercatorViewport(viewPort);
    const { longitude, latitude, zoom } = webViewport.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      {
        padding: matches ? 10 : { top: 10, bottom: 300, left: 10, right: 10 },
      },
    );
    setViewPort({ longitude, latitude, zoom });
  };

  const onMapClick = (e: any): void => {
    let popupInfo = null;
    setPopupInfo(popupInfo);
    const feature = e.features[0];
    if (feature) {
      popupInfo = {
        lngLat: e.lngLat,
        feature: feature.properties,
      };

      setPopupInfo(popupInfo);
    }
  };

  const onMarkerClick = (feature: any): void => {
    setPopupInfo(null);
    setPopupInfo({
      lngLat: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]],
      feature: { ...feature.properties, fill: '#B9E1C7' },
    });
  };

  const renderPopup = (): JSX.Element | null => {
    return (
      popupInfo && (
        <Popup
          className={classes.popup}
          longitude={popupInfo.lngLat[0]}
          latitude={popupInfo.lngLat[1]}
          closeButton={false}
        >
          <MapCard
            isPopup
            onClose={() => setPopupInfo(null)}
            color={popupInfo.feature.fill}
            name={popupInfo.feature.name}
            description={popupInfo.feature.description}
            imgSrc={popupInfo.feature.imgSrc}
          />
        </Popup>
      )
    );
  };

  const renderSlider = (): JSX.Element => {
    return (
      <div className={classes.slider}>
        <MapCards features={filteredFeatures} afterChange={setShownLayer} />
      </div>
    );
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
        onClick={onMapClick}
      >
        {geojson.features &&
          geojson.features.map((feature, index) => {
            return (
              <div key={index}>
                {feature.geometry.type === 'Polygon' &&
                  !feature.properties.boundary &&
                  (matches || (!matches && feature.id === shownLayer)) && (
                    <Source type="geojson" data={feature}>
                      <Layer
                        type="fill"
                        paint={{
                          'fill-opacity': feature.properties['fill-opacity'],
                          'fill-color': feature.properties['fill'],
                        }}
                      />
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
                {feature.geometry.type === 'Point' && (matches || (!matches && feature.id === shownLayer)) && (
                  <Marker
                    latitude={feature.geometry.coordinates[1]}
                    longitude={feature.geometry.coordinates[0]}
                  >
                    <PinIcon fontSize="large" onClick={() => onMarkerClick(feature)} />
                  </Marker>
                )}
              </div>
            );
          })}
        {matches && renderPopup()}
        <div className={classes.scaleControl}>
          <NavigationControl showCompass={false} />
        </div>
      </ReactMapGL>
      {!matches && renderSlider()}
    </div>
  );
}
