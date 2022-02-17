import * as React from 'react';
import { ItemProps } from 'web-components/lib/components/sliders/Item';
import ProtectedSpecies, {
  ProtectedSpeciesProps,
} from 'web-components/lib/components/sliders/ProtectedSpecies';
import ProjectMedia, {
  Media,
  Asset,
} from 'web-components/lib/components/sliders/ProjectMedia';
import StaticMap from 'web-components/lib/components/map/StaticMap';

import Grid from '@mui/material/Grid';

export default {
  title: 'Sliders',
  component: ProtectedSpecies,
};

const item: ItemProps = {
  name: 'Melaleuca brevifolia',
  imgSrc: './melaleuca-b.png',
};

const species: ProtectedSpeciesProps = [
  item,
  item,
  item,
  item,
  item,
  item,
  item,
  item,
  item,
  item,
];

// export const protectedSpeciesItem = (): JSX.Element => (
//   <Item name={text('Name', item.name)} imgSrc={item.imgSrc} />
// );

export const protectedSpecies = (): JSX.Element => (
  <Grid container>
    <Grid item xs={12} sm={4}>
      <ProtectedSpecies species={species} />
    </Grid>
  </Grid>
);

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
    <ProjectMedia assets={mediaAssets} />
  </div>
);

const assets: Asset[] = [
  {
    src: './andover.jpg',
    thumbnail: './andover.jpg',
    type: 'image',
  },
  <StaticMap
    mapboxToken={process.env.STORYBOOK_MAPBOX_TOKEN}
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
    <ProjectMedia gridView assets={assets} />
  </div>
);

// TODO: add other sliders
