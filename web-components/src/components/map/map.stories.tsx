import { Box } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';
import { FeatureCollection } from 'geojson';

import StaticMap from './StaticMap';

export default {
  title: 'Map',
  component: StaticMap,
} as Meta<typeof StaticMap>;

type Story = StoryObj<typeof StaticMap>;

const geojson: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'polygon1',
      properties: {
        stroke: '#FFC432',
        fill: '#ffe7ad',
        'fill-opacity': 0.8,
        'stroke-opacity': 1,
        name: 'Euc diversifola mallee 1',
        imgSrc: './diversifola.png',
        description:
          'This species from the Hawkesbury region of New South Wales may grow into a multi-trunked mallee, or as a single trunked small tree.',
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
    {
      type: 'Feature',
      id: 'marker',
      properties: {
        name: 'Marker',
        imgSrc: './diversifola.png',
        description:
          'This species from the Hawkesbury region of New South Wales may grow into a multi-trunked mallee, or as a single trunked small tree.',
      },
      geometry: {
        type: 'Point',
        coordinates: [4.717238545417786, 45.75410230522118],
      },
    },
    {
      type: 'Feature',
      id: 'boundary',
      properties: {
        boundary: 1,
        name: 'Boundary',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4.715736508369446, 45.754308167894095],
            [4.717302918434143, 45.754854636033265],
            [4.719030261039734, 45.754199622215744],
            [4.719008803367615, 45.75316655622795],
            [4.716149568557739, 45.75312912594188],
            [4.715736508369446, 45.754308167894095],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      id: 'polygon2',
      properties: {
        stroke: '#3D7ACF',
        fill: '#B1CAEC',
        'fill-opacity': 0.7,
        'stroke-opacity': 1,
        name: 'Euc diversifola mallee 2',
        imgSrc: './diversifola.png',
        description:
          'This species from the Hawkesbury region of New South Wales may grow into a multi-trunked mallee, or as a single trunked small tree.',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4.716224670410156, 45.7534266960227],
            [4.718694984912872, 45.7534266960227],
            [4.718694984912872, 45.7537205215268],
            [4.716224670410156, 45.7537205215268],
            [4.716224670410156, 45.7534266960227],
          ],
        ],
      },
    },
  ],
};

const MAPBOX_TOKEN = import.meta.env.STORYBOOK_MAPBOX_TOKEN || '';

export const Static: Story = {
  render: args => (
    <Box sx={{ width: 600, height: 400 }}>
      <StaticMap {...args} />
    </Box>
  ),
};

Static.args = {
  geojson,
  mapboxToken: MAPBOX_TOKEN,
};
