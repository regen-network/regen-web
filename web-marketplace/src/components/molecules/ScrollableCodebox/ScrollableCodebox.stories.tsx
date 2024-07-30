import { ScrollableCodebox } from './ScrollableCodebox';

export default {
  title: 'Marketplace/Molecules/Scrollable Codebox',
  component: ScrollableCodebox,
};

const code = {
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

export const scrollableCodebox = (): JSX.Element => (
  <ScrollableCodebox code={JSON.stringify(code, null, 2)} />
);
