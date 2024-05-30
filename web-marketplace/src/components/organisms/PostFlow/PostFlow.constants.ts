export const basePostContent = {
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
