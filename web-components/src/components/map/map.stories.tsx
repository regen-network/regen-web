import * as React from 'react';
import Map from 'web-components/lib/components/map';
// import * as togeojson from '@mapbox/togeojson';
import { withKnobs, object } from '@storybook/addon-knobs';

export default {
  title: 'Components|Map',
  component: Map,
  decorators: [withKnobs],
};

// const kml: string = `<?xml version="1.0" encoding="utf-8" ?><kml xmlns="http://www.opengis.net/kml/2.2"><Document id="root_doc"><Schema name="Reveg_upper" id="Reveg_upper"><SimpleField name="tessellate" type="int"></SimpleField></Schema><Folder><name>Reveg_upper</name><Placemark><name>Reveg upper</name><Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style><ExtendedData><SchemaData schemaUrl="#Reveg_upper"><SimpleData name="tessellate">1</SimpleData></SchemaData></ExtendedData><Polygon><outerBoundaryIs><LinearRing><coordinates>139.301964544446,-35.7334349941573 139.302618507057,-35.734016351157 139.30292109905,-35.7311592633386 139.302927249187,-35.7307320552533 139.301964544446,-35.7334349941573</coordinates></LinearRing></outerBoundaryIs></Polygon></Placemark></Folder></Document></kml>`;
// const dom = new DOMParser().parseFromString(kml, 'text/xml');
// const geojsonFromKml: any = togeojson.kml(dom);

const geojson = {
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

export const map = (): JSX.Element => (
  <Map geojson={object('geojson', geojson)} token={process.env.STORYBOOK_MAPBOX_TOKEN} />
);
