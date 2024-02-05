import { Point } from 'geojson';

const location1: Point = {
  type: 'Point',
  coordinates: [-74.01592482325455, 40.68983643942107],
};
const location2: Point = {
  type: 'Point',
  coordinates: [-74.0059945, 40.7127492],
};

const location3: Point = {
  type: 'Point',
  coordinates: [-74.05104169600756, 40.70401908024334],
};

export const files = [
  {
    url: '/andover.jpg',
    name: 'image.jpg',
    description: 'image with description',
    location: location1,
    mimeType: 'image/jpeg',
  },
  {
    url: 'https://www.shutterstock.com/shutterstock/videos/1030690055/preview/stock-footage-professional-photographer-with-a-professional-camera-out-in-san-francisco-taking-pictures-of-the.webm',
    name: 'video-file.webm',
    location: location2,
    mimeType: 'video/webm',
  },
  {
    url: 'audio-file.mp4',
    name: 'audio-file.mp4',
    location: location2,
    mimeType: 'audio/mp4',
  },
  {
    url: '/csv-file.csv',
    name: 'csv-file.csv',
    description: 'file',
    location: location2,
    mimeType: 'text/csv',
  },
  {
    url: '/json-file.json',
    name: 'json-file.json',
    location: location2,
    locationType: 'none',
    mimeType: 'application/json',
  },
  {
    url: '/coorong.png',
    name: 'image-no-description.jpg',
    location: location1,
    mimeType: 'image/png',
  },
  {
    url: '/pdf-file.pdf',
    name: 'pdf-file.pdf',
    location: location3,
    mimeType: 'application/pdf',
  },
];
