import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Feature } from 'geojson';

import { PostForm } from './PostForm';

export default {
  title: 'forms/PostForm',
  component: PostForm,
} as Meta<typeof PostForm>;

type Story = StoryObj<typeof PostForm>;
export const Basic: Story = {
  render: args => <PostForm className="mx-auto" {...args} />,
};

const projectLocation = {
  type: 'Feature',
  place_name: 'New York, New York, United States',
  geometry: {
    type: 'Point',
    coordinates: [-74.0059945, 40.7127492],
  },
} as GeocodeFeature;

const fileLocation: Feature = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [-74.01592482325455, 40.68983643942107],
  },
  properties: [],
};

Basic.args = {
  onClose: action('onClose'),
  projectLocation,
  initialValues: {
    title: 'Lorem ipsum',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    privacyType: 'public',
    files: [
      {
        url: 'https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png',
        name: 'ImageWithoutCaption.png',
        location: projectLocation,
        locationType: 'none',
      },
      {
        url: 'https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png',
        name: 'ImageWithDescription.png',
        description: 'Lorem ipsum.',
        credit: 'John Doe',
        location: fileLocation,
        locationType: 'file',
      },
    ],
  },
};
