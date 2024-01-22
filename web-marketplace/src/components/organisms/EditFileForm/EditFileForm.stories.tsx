import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Feature } from 'geojson';

import { EditFileForm } from './EditFileForm';

export default {
  title: 'forms/EditFileForm',
  component: EditFileForm,
} as Meta<typeof EditFileForm>;

type Story = StoryObj<typeof EditFileForm>;

export const Basic: Story = {
  render: args => <EditFileForm className="mx-auto" {...args} />,
};

const fileLocation: Feature = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [-74.01592482325455, 40.68983643942107],
  },
  properties: [],
};

const projectLocation = {
  type: 'Feature',
  place_name: 'New York, New York, United States',
  geometry: {
    type: 'Point',
    coordinates: [-74.0059945, 40.7127492],
  },
} as GeocodeFeature;

Basic.args = {
  initialValues: {
    url: '/andover.jpg',
    name: 'image.jpg',
    locationType: 'file',
    location: fileLocation,
    mimeType: 'image/jpeg',
  },
  fileLocation,
  projectLocation,
  mapboxToken: import.meta.env.STORYBOOK_MAPBOX_TOKEN,
  setDebouncedViewState: action('setDebouncedViewState'),
};
