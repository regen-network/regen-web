import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { MapRef } from 'react-map-gl';
import { CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import bbox from '@turf/bbox';
import { Point } from 'geojson';

import { cn } from '../../../utils/styles/cn';
import { AudioFileIcon } from '../../icons/AudioFileIcon';
import { ImageIcon } from '../../icons/ImageIcon';
import MinusIcon from '../../icons/MinusIcon';
import { OtherDocumentsIcon } from '../../icons/OtherDocumentsIcon';
import { PdfFileIcon } from '../../icons/PdfFileIcon';
import PlusIcon from '../../icons/PlusIcon';
import { SpreadsheetFileIcon } from '../../icons/SpreadsheetFileIcon';
import {
  isAudio,
  isImage,
  isPdf,
  isSpreadSheet,
  isVideo,
} from '../../inputs/new/FileDrop/FileDrop.utils';
import { Body } from '../../typography/Body';
import { PostFile, PostFilesProps } from './PostFiles';
import { PostFilesCardsDesktop } from './PostFiles.Cards.Desktop';
import { PostFilesCardsMobile } from './PostFiles.Cards.Mobile';
import { PostFilesDrawer } from './PostFiles.Drawer';
import { useStyles } from './PostFiles.styles';

import 'mapbox-gl/dist/mapbox-gl.css';

const Map = lazy(() => import('react-map-gl'));
const Marker = lazy(() => import('../../map/lib/Marker'));
const Popup = lazy(() => import('../../map/lib/Popup'));

type Props = Pick<PostFilesProps, 'files' | 'mapboxToken'>;

const PostFilesPublic = ({ files, mapboxToken }: Props) => {
  const { classes: styles } = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedUrl, setSelectedUrl] = useState<string | undefined>(
    files[0]?.url,
  );
  const [selectedLocation, setSelectedLocation] = useState<Point | undefined>(
    files[0]?.location,
  );
  const [animateMarker, setAnimateMarker] = useState<boolean>(false);
  const mapRef = useRef<MapRef | null>(null);

  useEffect(() => {}, [selectedUrl]);

  const groupByLocation = useMemo(
    () =>
      files.reduce((group: { [key: string]: Array<PostFile> }, file) => {
        const { location } = file;
        const coord = `${location.coordinates[1]},${location.coordinates[0]}`;
        group[coord] = group[coord] ?? [];
        group[coord].push(file);
        return group;
      }, {}),
    [files],
  );

  const locations = {
    type: 'FeatureCollection',
    features: Object.values(groupByLocation).map(files => ({
      type: 'Feature',
      geometry: files[0].location,
      properties: [],
    })),
  };

  const onLoad = (): void => {
    if (locations) {
      const [minLng, minLat, maxLng, maxLat] = bbox(locations);
      mapRef.current?.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        {
          padding: {
            top: mobile ? 50 : 100,
            left: 50,
            right: mobile ? 50 : 150,
            bottom: mobile ? 220 : 100,
          },
          duration: 0,
        },
      );
    }
  };

  return (
    <div className={cn(styles.map, 'h-[600px]')}>
      <Suspense fallback={<CircularProgress color="secondary" />}>
        <Map
          initialViewState={{
            zoom: 11,
            latitude: 0.0,
            longitude: 0.0,
          }}
          ref={mapRef}
          style={{ width: '100%', height: '100%' }}
          mapboxAccessToken={mapboxToken}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v10"
          onLoad={onLoad}
          attributionControl={false}
        >
          {locations &&
            locations.features.map((feature, i) => {
              const geometry = feature.geometry as Point;
              const group =
                groupByLocation[
                  `${geometry.coordinates[1]},${geometry.coordinates[0]}`
                ];

              const mimeType = group[0].mimeType;
              return (
                <Marker
                  key={i}
                  latitude={geometry.coordinates[1]}
                  longitude={geometry.coordinates[0]}
                >
                  <div
                    onClick={() => {
                      setSelectedLocation(geometry);
                      // Set first file of group as selected
                      setSelectedUrl(group[0].url);
                    }}
                    className={cn(
                      'transition duration-500 cursor-pointer flex items-center justify-center border border-solid rounded-[30px] h-30',
                      selectedLocation === geometry
                        ? animateMarker
                          ? 'bg-grey-500 border-grey-500 text-grey-0 shadow-md'
                          : 'bg-grey-700 border-grey-600 text-grey-0 shadow-sm'
                        : 'bg-grey-0 border-grey-300 text-grey-700 shadow-sm',
                      group.length > 1 ? 'py-5 px-15' : 'py-3 px-10',
                    )}
                  >
                    {group.length > 1 && (
                      <Body
                        className={cn(
                          'font-semibold',
                          selectedLocation === geometry
                            ? 'text-grey-0'
                            : 'text-grey-700',
                        )}
                        size="xs"
                      >
                        {group.length}
                      </Body>
                    )}
                    {group.length === 1 &&
                      (isImage(mimeType) ? (
                        <ImageIcon width="24" height="24" />
                      ) : isVideo(mimeType) ? (
                        <></>
                      ) : isAudio(mimeType) ? (
                        <AudioFileIcon width="24" height="24" />
                      ) : isPdf(mimeType) ? (
                        <PdfFileIcon width="24" height="24" />
                      ) : isSpreadSheet(mimeType) ? (
                        <SpreadsheetFileIcon width="24" height="24" />
                      ) : (
                        <OtherDocumentsIcon width="24" height="24" />
                      ))}
                  </div>
                </Marker>
              );
            })}
          <div className="hidden sm:block">
            {/* We need to check for mobile media query too because `display: none` (`hidden` class) only
              hides the element from the rendered tree but it's still in the DOM and that might
              conflict with mobile desired behavior */}
            {selectedLocation && selectedUrl && !mobile && (
              <Popup
                className={styles.popup}
                longitude={selectedLocation.coordinates[0]}
                latitude={selectedLocation.coordinates[1]}
                closeButton={false}
                closeOnClick={false}
                maxWidth="301px"
                offset={25}
              >
                <PostFilesCardsDesktop
                  files={
                    groupByLocation[
                      `${selectedLocation.coordinates[1]},${selectedLocation.coordinates[0]}`
                    ]
                  }
                  onClose={() => {
                    setSelectedLocation(undefined);
                    setSelectedUrl(undefined);
                  }}
                  setSelectedUrl={setSelectedUrl}
                  selectedUrl={selectedUrl}
                />
              </Popup>
            )}
            <PostFilesDrawer
              files={files}
              setSelectedUrl={setSelectedUrl}
              selectedUrl={selectedUrl}
              setSelectedLocation={setSelectedLocation}
            />
            <div
              onClick={() => mapRef.current?.zoomOut()}
              className="cursor-pointer absolute top-20 left-20 h-30 w-30 bg-brand-400 rounded-[5px]"
            >
              <MinusIcon className="h-30 w-30 text-grey-0" />
            </div>
            <div
              onClick={() => mapRef.current?.zoomIn()}
              className="cursor-pointer absolute top-20 left-60 h-30 w-30 bg-brand-400 rounded-[5px]"
            >
              <PlusIcon className="h-30 w-30 text-grey-0" />
            </div>
          </div>
          {selectedLocation && selectedUrl && mobile && (
            <PostFilesCardsMobile
              files={files}
              setSelectedUrl={setSelectedUrl}
              selectedUrl={selectedUrl}
              onClose={() => {
                setSelectedUrl(undefined);
                setSelectedLocation(undefined);
              }}
              setSelectedLocation={setSelectedLocation}
              setAnimateMarker={setAnimateMarker}
            />
          )}
        </Map>
      </Suspense>
    </div>
  );
};

export { PostFilesPublic };
