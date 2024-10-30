import { msg } from '@lingui/macro';

export const basePostContent = {
  // eslint-disable-next-line lingui/no-unlocalized-strings
  '@type': 'ProjectPost',
  '@context': {
    dcterms: 'http://purl.org/dc/terms/',
    geo: 'http://www.opengis.net/ont/geosparql#',
    linkml: 'https://w3id.org/linkml/',
    regenschema: 'https://schema.regen.network/',
    '@vocab': 'https://schema.regen.network/',
    credit: {
      '@id': 'dcterms:creator',
    },
    description: {
      '@id': 'dcterms:description',
    },
    iri: '@id',
    location: {
      '@type': '@id',
      '@id': 'geo:hasGeometry',
    },
    name: {
      '@id': 'dcterms:title',
    },
    wkt: {
      '@id': 'geo:asWKT',
    },
    comment: {
      '@id': 'dcterms:description',
    },
    files: {
      '@type': '@id',
      '@id': 'dcterms:references',
    },
    title: {
      '@id': 'dcterms:title',
    },
    FileLocation: {
      '@id': 'geo:Geometry',
    },
  },
};

export const POST_CREATED = msg`Congrats! You successfully created this post.`;
export const VIEW_POST = msg`view post`;
export const FILE_NAMES = msg`file name(s)`;
export const PROJECT = 'project';
export const POST_CREATED_SIGNING_FAILED = msg`You successfully created this post but signing failed.`;
export const CREATE_DATA_POST = msg`Create Data Post`;
export const DRAFT_CREATED = msg`Draft created!`;
export const DRAFT_SAVED = msg`Draft saved!`;
