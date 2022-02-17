import React, { useState } from 'react';
import bbox from '@turf/bbox';
// import { FeatureCollection } from 'geojson'; TODO
// import { AllGeoJSON } from '@turf/helpers';
import { makeStyles, useTheme, DefaultTheme as Theme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ReactMapGL, {
  Popup,
  Marker,
  Source,
  Layer,
  NavigationControl,
  WebMercatorViewport,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PinIcon from '../icons/PinIcon';
import PointerIcon from '../icons/PointerIcon';
import MapCard from '../cards/MapCard';
// import MapCards from '../sliders/MapCards';
import OutlinedButton from '../buttons/OutlinedButton';
import ZoomIcon from '../icons/ZoomIcon';
import LazyLoad from 'react-lazyload';

interface GeoJson {
  features: any[];
}

interface MapProps {
  geojson: GeoJson;
  mapboxToken: string | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(150),
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(121),
    },
    '& .mapboxgl-marker svg': {
      cursor: 'pointer',
    },
  },
  scaleControl: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    '& .mapboxgl-ctrl': {
      background: 'none',
      '& button': {
        '&.mapboxgl-ctrl-icon': {
          backgroundColor: theme.palette.secondary.main,
          '&:hover': {
            backgroundColor: theme.palette.secondary.main,
          },
          borderTop: 'none',
          borderRadius: '2px',
          height: '30px',
          width: '30px',
          '&.mapboxgl-ctrl-zoom-in': {
            marginBottom: theme.spacing(3),
            '& span': {
              height: '30px',
              width: '30px',
              background: `linear-gradient(${theme.palette.primary.main},${theme.palette.primary.main}), linear-gradient(${theme.palette.primary.main},${theme.palette.primary.main})`,
              backgroundPosition: 'center',
              backgroundSize: '18px 4px,4px 18px',
              backgroundRepeat: 'no-repeat',
            },
          },
          '&.mapboxgl-ctrl-zoom-out': {
            '& span': {
              background: theme.palette.primary.main,
              height: '4px',
              width: '18px',
              marginLeft: '6px',
            },
          },
        },
      },
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  popup: {
    '& .mapboxgl-popup-content': {
      padding: 0,
      background: 'none',
      boxShadow: 'none',
    },
    '& .mapboxgl-popup-tip': {
      display: 'none',
    },
  },
  slider: {
    position: 'absolute',
    bottom: '30px',
    width: '100%',
  },
  arrowContainer: {
    position: 'absolute',
    bottom: '-31px',
    left: 'calc(50% - 17.5px)',
  },
  zoomButton: {
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      top: theme.spacing(5),
      right: theme.spacing(5),
    },
    [theme.breakpoints.down('sm')]: {
      top: theme.spacing(3.75),
      right: theme.spacing(3.75),
    },
    '& .MuiButton-startIcon': {
      marginRight: '5px',
    },
  },
}));

interface PopupInfo {
  lngLat: number[];
  feature: any;
}

export default function Map({ geojson, mapboxToken }: MapProps): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const filteredFeatures: any[] = geojson.features.filter(
    feature => !feature.properties.boundary,
  );

  const [viewPort, setViewPort] = useState<any>({
    zoom: 11,
    latitude: 0.0,
    longitude: 0.0,
  });
  const [boundary, setBoundary] = useState<any>({
    zoom: 11,
    latitude: 0.0,
    longitude: 0.0,
  });
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  // const [shownLayer, setShownLayer] = useState<string | null>(
  const [shownLayer] = useState<string | null>(
    filteredFeatures.length ? filteredFeatures[0].id : null,
  );

  const interactiveLayerIds: string[] = geojson.features
    ? geojson.features
        .filter(f => f.geometry.type === 'Polygon' && !f.properties.boundary)
        .map((f, i) => f.id || i.toString())
    : [];

  const onLoad = (): void => {
    const [minLng, minLat, maxLng, maxLat] = bbox(geojson);
    const webViewport = new WebMercatorViewport(viewPort);
    const { longitude, latitude, zoom } = webViewport.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      {
        padding:
          matches || (!matches && interactiveLayerIds.length === 0)
            ? 0
            : { top: 10, bottom: 300, left: 10, right: 10 },
      },
    );
    setViewPort({ longitude, latitude, zoom: 4 });
    setBoundary({ longitude, latitude, zoom });
  };

  const onMapClick = (e: any): void => {
    let popupInfo = null;

    const feature = e.features[0];
    if (feature && filteredFeatures.find(f => feature.layer.id === f.id)) {
      popupInfo = {
        lngLat: e.lngLat,
        feature: feature.properties,
      };
    }
    setPopupInfo(popupInfo);
  };

  const onMarkerClick = (feature: any, index: string): void => {
    setPopupInfo({
      lngLat: [
        feature.geometry.coordinates[0],
        feature.geometry.coordinates[1],
      ],
      feature: { ...feature.properties, id: feature.id || index },
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
          <div className={classes.arrowContainer}>
            <PointerIcon />
          </div>
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

  // const renderSlider = (): JSX.Element => {
  //   return (
  //     <div className={classes.slider}>
  //       <MapCards features={filteredFeatures} afterChange={setShownLayer} />
  //     </div>
  //   );
  // };

  return (
    <LazyLoad offset={300}>
      <div className={classes.root}>
        <ReactMapGL
          {...viewPort}
          scrollZoom={false}
          onLoad={onLoad}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/satellite-streets-v10"
          onViewportChange={(v: any) => setViewPort(v)}
          mapboxApiAccessToken={mapboxToken}
          onClick={onMapClick}
          // interactiveLayerIds={interactiveLayerIds} unused for now
          attributionControl={false}
        >
          {viewPort.zoom < boundary.zoom - 1 && (
            <Marker latitude={boundary.latitude} longitude={boundary.longitude}>
              <PinIcon fontSize="large" size={35} />
            </Marker>
          )}
          {geojson.features &&
            geojson.features.map((feature, index) => {
              return (
                <div key={index}>
                  {feature.geometry.type !== 'Point' &&
                    !feature.properties.boundary &&
                    viewPort.zoom >= boundary.zoom - 1 && (
                      // (matches || (!matches && feature.id === shownLayer)) && (
                      <Source type="geojson" data={feature}>
                        <Layer
                          id={feature.id || index.toString()}
                          type="fill"
                          paint={{
                            'fill-opacity':
                              parseFloat(feature.properties['fill-opacity']) ||
                              0,
                            'fill-color':
                              feature.properties['fill'] || '#000000',
                          }}
                        />
                        <Layer
                          type="line"
                          paint={{
                            // 'line-color': feature.properties['stroke'] || '#000000',
                            'line-color': theme.palette.primary.main,
                            'line-width': 2,
                          }}
                        />
                      </Source>
                    )}
                  {feature.geometry.type === 'Polygon' &&
                    feature.properties.boundary &&
                    viewPort.zoom >= boundary.zoom - 1 && (
                      <Source type="geojson" data={feature}>
                        <Layer
                          id={feature.id || index.toString()}
                          type="line"
                          paint={{
                            'line-color': theme.palette.primary.main,
                            'line-width': 2,
                            'line-dasharray': [2, 1.5],
                          }}
                        />
                      </Source>
                    )}
                  {feature.geometry.type === 'Point' &&
                    (matches || (!matches && feature.id === shownLayer)) && (
                      <Marker
                        latitude={feature.geometry.coordinates[1]}
                        longitude={feature.geometry.coordinates[0]}
                      >
                        <PinIcon
                          fontSize="large"
                          size={35}
                          onClick={() =>
                            onMarkerClick(feature, index.toString())
                          }
                        />
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
        <div className={classes.zoomButton}>
          <OutlinedButton
            onClick={() =>
              setViewPort({
                longitude: boundary.longitude,
                latitude: boundary.latitude,
                zoom: boundary.zoom,
              })
            }
            startIcon={<ZoomIcon />}
          >
            zoom to project area
          </OutlinedButton>
        </div>
        {/* {!matches && renderSlider()} */}
      </div>
    </LazyLoad>
  );
}
