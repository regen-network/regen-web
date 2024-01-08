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
      properties: {},
      geometry: { type: 'Point', coordinates: [4.65539, 45.757789] },
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
