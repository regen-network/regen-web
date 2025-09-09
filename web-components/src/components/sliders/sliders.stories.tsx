import { projectCardBodyTextMapping } from '../cards/ProjectCard/ProjectCard.mock';
import StaticMap from '../map/StaticMap';
import ProjectMedia, { Asset, Media } from './ProjectMedia';

export default {
  title: 'Sliders',
  component: ProjectMedia,
};

// Protected Species component and related stories have been removed
// as the ProtectedSpecies and Item components were deleted

const mediaAssets: Media[] = [
  {
    src: './andover.jpg',
    thumbnail: './andover.jpg',
    type: 'image',
  },
  {
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    type: 'video',
  },
];

export const projectMedia = (): JSX.Element => (
  <div style={{ width: 600, height: 400 }}>
    <ProjectMedia assets={mediaAssets} bodyTexts={projectCardBodyTextMapping} />
  </div>
);

const MAPBOX_TOKEN = import.meta.env.STORYBOOK_MAPBOX_TOKEN || '';

const assets: Asset[] = [
  {
    src: './andover.jpg',
    thumbnail: './andover.jpg',
    type: 'image',
  },
  <StaticMap
    mapboxToken={MAPBOX_TOKEN}
    geojson={{
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          id: 'polygon1',
          properties: {
            stroke: '#FFC432',
            fill: '#ffe7ad',
          },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [4.716849625110626, 45.75426138098967],
                [4.7168174386024475, 45.753932000072346],
                [4.717772305011749, 45.75354834371205],
                [4.718327522277832, 45.75420149369476],
                [4.717434346675873, 45.754545844762895],
                [4.716849625110626, 45.75426138098967],
              ],
            ],
          },
        },
      ],
    }}
  />,
];

export const projectMediaWithMap = (): JSX.Element => (
  <div style={{ width: '100%' }}>
    <ProjectMedia
      gridView
      assets={assets}
      bodyTexts={projectCardBodyTextMapping}
    />
  </div>
);

// TODO: add other sliders
