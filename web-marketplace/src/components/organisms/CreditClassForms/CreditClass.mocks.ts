/* eslint-disable lingui/no-unlocalized-strings */
export const mockTxHash =
  'C5AD9746EEE7E8131066FF4DF708B1D535399F697DBB7877A195FFB638A73975';

export const mockAccount = 'cosmos15h5eszss2wtavw2x73f66jqp00sh4kewqf9ah0';

export const mockClassId = 'C01';

export const mockMetadata = {
  '@context': {
    schema: 'http://schema.org/',
    regen: 'https://schema.regen.network#',
    qudt: 'http://qudt.org/schema/qudt/',
    unit: 'http://qudt.org/vocab/unit/',
    xsd: 'http://www.w3.org/2001/XMLSchema#',
  },
  '@type': 'regen:C01-Project',
  'schema:name': '',
  'regen:vcsProjectId': 0,
  'regen:vcsProjectPage': {
    '@type': 'schema:URL',
    '@value': '',
  },
  'schema:description': '',
  'regen:projectDeveloper': {
    '@type': 'regen:OrganizationDisplay',
    'schema:name': '',
    'schema:description': '',
    'regen:address': '',
    'regen:showOnProjectPage': true,
  },
  'regen:projectType': '',
  'regen:projectActivity': {
    'schema:name': '',
    'schema:url': {
      '@type': 'schema:URL',
      '@value': '',
    },
  },
  'regen:offsetGenerationMethod': {
    '@list': [],
  },
  'regen:vcsMethodology': {
    'schema:name': '',
    'schema:url': {
      '@type': 'schema:URL',
      '@value': '',
    },
  },
  'regen:projectSize': {
    'qudt:unit': {
      '@type': 'qudt:Unit',
      '@value': 'unit:HA',
    },
    'qudt:numericValue': {
      '@type': 'xsd:double',
      '@value': 0,
    },
  },
  'regen:projectStartDate': {
    '@type': 'xsd:date',
    '@value': '',
  },
  'regen:projectEndDate': {
    '@type': 'xsd:date',
    '@value': '',
  },
  'schema:location': {
    '@context': {
      type: '@type',
      '@vocab': 'https://purl.org/geojson/vocab#',
      coordinates: {
        '@container': '@list',
      },
      bbox: {
        '@container': '@list',
      },
    },
  },
};

export const createCreditClassStepsMock = [
  {
    id: 'create-credit-class',
    name: 'Create Credit Class',
    title: 'Create Credit Class',
  },
  {
    id: '',
    name: 'Review',
    title: 'Review',
  },
  {
    id: '',
    name: 'Finished',
    title: 'Finished',
  },
];
