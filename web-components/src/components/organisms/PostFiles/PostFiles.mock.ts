import { Point } from 'geojson';

import { FileLocationType } from './PostFiles';

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
    iri: 'regen:123.jpg',
    url: '/andover.jpg',
    name: 'image.jpg',
    description:
      'Far far away, behind the word mountains, far from the countries lorem ipsum dolor sit apsicing Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ven.',
    location: location1,
    mimeType: 'image/jpeg',
    locationType: 'public' as FileLocationType,
  },
  {
    iri: 'regen:123.webm',
    url: 'https://www.shutterstock.com/shutterstock/videos/1030690055/preview/stock-footage-professional-photographer-with-a-professional-camera-out-in-san-francisco-taking-pictures-of-the.webm',
    name: 'video-file.webm',
    description: 'video with a short description',
    location: location2,
    mimeType: 'video/webm',
    locationType: 'public' as FileLocationType,
  },
  {
    iri: 'regen:123.mp4',
    url: 'audio-file.mp4',
    name: 'audio-file.mp4',
    location: location2,
    mimeType: 'audio/mp4',
    locationType: 'public' as FileLocationType,
  },
  {
    iri: 'regen:123.csv',
    url: '/csv-file.csv',
    name: 'csv-file.csv',
    description: 'csv with a short description',
    location: location2,
    mimeType: 'text/csv',
    locationType: 'public' as FileLocationType,
  },
  {
    iri: 'regen:123.json',
    url: '/json-file.json',
    name: 'json-file.json',
    location: location2,
    locationType: 'public' as FileLocationType,
    mimeType: 'application/json',
  },
  {
    iri: 'regen:123.png',
    url: '/coorong.png',
    name: 'image-no-description.jpg',
    location: location1,
    mimeType: 'image/png',
    locationType: 'public' as FileLocationType,
  },
  {
    iri: 'regen:123.pdf',
    url: '/pdf-file.pdf',
    name: 'pdf-file.pdf',
    location: location3,
    mimeType: 'application/pdf',
    locationType: 'public' as FileLocationType,
  },
  {
    iri: 'regen:123.bin',
    url: '/xlsx-file.xlsx',
    name: 'xlsx-file.xlsx',
    location: location3,
    mimeType:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    locationType: 'public' as FileLocationType,
  },
  {
    iri: 'regen:456.bin',
    url: '/docx-file.docx',
    name: 'docx-file.docx',
    location: location3,
    mimeType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    locationType: 'public' as FileLocationType,
  },
];
