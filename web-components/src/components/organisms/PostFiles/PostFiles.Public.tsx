import { useCallback, useMemo, useRef, useState } from 'react';
import type { MapRef } from 'react-map-gl';
import { CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import bbox from '@turf/bbox';
import type { FeatureCollection, Point } from 'geojson';
import dynamic from 'next/dynamic';
import { VideoIcon } from 'web-components/src/components/icons/VideoIcon';

import { cn } from '../../../utils/styles/cn';
import { AudioFileIcon } from '../../icons/AudioFileIcon';
import { ImageIcon } from '../../icons/ImageIcon';
import { LockIcon } from '../../icons/LockIcon';
import MinusIcon from '../../icons/MinusIcon';
import { OtherDocumentsIcon } from '../../icons/OtherDocumentsIcon';
import { PdfFileIcon } from '../../icons/PdfFileIcon';
import PlusIcon from '../../icons/PlusIcon';
import { SpreadsheetFileIcon } from '../../icons/SpreadsheetFileIcon';
import {
  isAudio,
  isCsv,
  isImage,
  isPdf,
  isVideo,
} from '../../inputs/new/FileDrop/FileDrop.utils';
import { Body } from '../../typography/Body';
import { Tag } from './components/Tag';
import { PostFile, PostFilesProps } from './PostFiles';
import { PostFilesCardsDesktop } from './PostFiles.Cards.Desktop';
import { PostFilesCardsMobile } from './PostFiles.Cards.Mobile';
import { PostFilesDrawer } from './PostFiles.Drawer';
import { useStyles } from './PostFiles.styles';
import { FilesPreviews } from './PostFiles.types';

import 'mapbox-gl/dist/mapbox-gl.css';

const Map = dynamic(() => import('react-map-gl'), {
  loading: () => <CircularProgress color="secondary" />,
  ssr: false,
});
const Marker = dynamic(() => import('react-map-gl').then(mod => mod.Marker), {
  loading: () => <CircularProgress color="secondary" />,
  ssr: false,
});
const Popup = dynamic(() => import('react-map-gl').then(mod => mod.Popup), {
  loading: () => <CircularProgress color="secondary" />,
  ssr: false,
});

type Props = Pick<PostFilesProps, 'files' | 'mapboxToken' | 'isAdmin'> & {
  privateFiles: boolean;
  privateLocations: boolean;
  filesPreviews: FilesPreviews;
  adminPrivateLabel: string;
  readMoreText: { text: string; lessText: string; moreText: string };
};

const PostFilesPublic = ({
  files,
  mapboxToken,
  isAdmin,
  privateFiles,
  privateLocations,
  filesPreviews,
  adminPrivateLabel,
  readMoreText,
}: Props) => {
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
  const [isFilesWindowOpen, setIsFilesWindowOpen] = useState(
    selectedUrl === files[0]?.url,
  );
  const mapRef = useRef<MapRef | null>(null);

  const groupByLocation = useMemo(
    () =>
      files.reduce((group: { [key: string]: Array<PostFile> }, file) => {
        const { location } = file;
        const coord = `${location?.coordinates[1]},${location?.coordinates[0]}`;
        group[coord] = group[coord] ?? [];
        group[coord].push(file);
        return group;
      }, {}),
    [files],
  );

  const locations: FeatureCollection = {
    type: 'FeatureCollection',
    features: Object.values(groupByLocation).map(files => ({
      type: 'Feature',
      geometry: files[0].location as Point,
      properties: [],
    })),
  };

  const onLoad = (): void => {
    if (locations.features.length > 1) {
      const [minLng, minLat, maxLng, maxLat] = bbox(locations);
      mapRef.current?.fitBounds([
        [minLng, minLat],
        [maxLng, maxLat],
      ]);
    }
  };

  const handleMarkerClick = useCallback(
    (geometry: Point, group: PostFile[]): void => {
      const newSelectedUrl = group[0].url;
      setSelectedLocation(geometry);
      setSelectedUrl(newSelectedUrl);

      if (newSelectedUrl !== selectedUrl) {
        setIsFilesWindowOpen(true);
      } else {
        if (isFilesWindowOpen) {
          setSelectedUrl(undefined);
          setSelectedLocation(undefined);
          setIsFilesWindowOpen(false);
        } else {
          setIsFilesWindowOpen(true);
        }
      }
    },
    [selectedUrl, isFilesWindowOpen],
  );

  return (
    <div className={cn(styles.map, 'h-[600px] sm:h-[550px]')}>
      <Map
        initialViewState={{
          zoom: 16,
          latitude: selectedLocation?.coordinates[1],
          longitude: selectedLocation?.coordinates[0],
          padding: {
            top: mobile ? 50 : 100,
            left: 50,
            right: mobile ? 50 : 310,
            bottom: mobile ? 270 : 100,
          },
        }}
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: mobile ? 'unset' : '10px',
        }}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v10"
        attributionControl={false}
        onLoad={onLoad}
        scrollZoom={false}
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
                  onClick={() => handleMarkerClick(geometry, group)}
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
                      <VideoIcon width="24" height="24" />
                    ) : isAudio(mimeType) ? (
                      <AudioFileIcon width="24" height="24" />
                    ) : isPdf(mimeType) ? (
                      <PdfFileIcon width="24" height="24" />
                    ) : isCsv(mimeType) ? (
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
          {selectedLocation && selectedUrl && !mobile && isFilesWindowOpen && (
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
                filesPreviews={filesPreviews}
                onClose={() => {
                  setSelectedLocation(undefined);
                  setSelectedUrl(undefined);
                  setIsFilesWindowOpen(false);
                }}
                setSelectedUrl={setSelectedUrl}
                selectedUrl={selectedUrl}
              />
            </Popup>
          )}
          <PostFilesDrawer
            files={files}
            filesPreviews={filesPreviews}
            setSelectedUrl={setSelectedUrl}
            selectedUrl={selectedUrl}
            setSelectedLocation={point => {
              setSelectedLocation(point);
              setIsFilesWindowOpen(true);
            }}
            readMoreText={readMoreText}
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
        {selectedLocation && selectedUrl && mobile && isFilesWindowOpen && (
          <PostFilesCardsMobile
            files={files}
            setSelectedUrl={setSelectedUrl}
            selectedUrl={selectedUrl}
            onClose={() => {
              setSelectedUrl(undefined);
              setSelectedLocation(undefined);
              setIsFilesWindowOpen(false);
            }}
            setSelectedLocation={setSelectedLocation}
            setAnimateMarker={setAnimateMarker}
            filesPreviews={filesPreviews}
            readMoreText={readMoreText}
          />
        )}
        {isAdmin && (privateLocations || privateFiles) && (
          <Tag
            className="top-20 left-20 sm:left-[110px] absolute bg-error-300"
            icon={<LockIcon width="18" height="18" />}
            label={adminPrivateLabel}
          />
        )}
      </Map>
    </div>
  );
};

export { PostFilesPublic };
