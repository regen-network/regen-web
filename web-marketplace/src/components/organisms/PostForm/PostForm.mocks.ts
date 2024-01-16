import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Feature } from 'geojson';

import { PostFormSchemaType } from './PostForm.schema';

export const projectLocation = {
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

export const initialValues: PostFormSchemaType = {
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
      mimeType: 'image/png',
    },
    {
      url: 'https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png',
      name: 'ImageWithDescription.png',
      description: 'Lorem ipsum.',
      credit: 'John Doe',
      location: fileLocation,
      locationType: 'file',
      mimeType: 'image/png',
    },
    {
      url: 'https://www.shutterstock.com/shutterstock/videos/1030690055/preview/stock-footage-professional-photographer-with-a-professional-camera-out-in-san-francisco-taking-pictures-of-the.webm',
      name: 'video-file.webm',
      location: projectLocation,
      locationType: 'none',
      mimeType: 'video/webm',
    },
    {
      url: 'audio-file.mp4',
      name: 'audio-file.mp4',
      location: projectLocation,
      locationType: 'none',
      mimeType: 'audio/mp4',
    },
    {
      url: 'pdf-file.pdf',
      name: 'pdf-file.pdf',
      location: projectLocation,
      locationType: 'none',
      mimeType: 'application/pdf',
    },
    {
      url: 'csv-file.csv',
      name: 'csv-file.csv',
      location: projectLocation,
      locationType: 'none',
      mimeType: 'text/csv',
    },
    {
      url: 'json-file.json',
      name: 'json-file.json',
      location: projectLocation,
      locationType: 'none',
      mimeType: 'application/json',
    },
  ],
};
