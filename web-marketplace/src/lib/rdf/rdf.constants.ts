import { ContextDefinition } from 'jsonld';

export const QUDT_UNIT_MAP = {
  one: { 'unit:HA': 'hectare', 'unit:AC': 'acre' },
  other: { 'unit:HA': 'hectares', 'unit:AC': 'acres' },
};

export const DEFAULT_PROJECT_CONTEXT: { [key: string]: string } = {
  regen: 'https://schema.regen.network#',
  schema: 'http://schema.org/',
  xsd: 'http://www.w3.org/2001/XMLSchema#',
  qudt: 'http://qudt.org/schema/qudt/',
  unit: 'http://qudt.org/vocab/unit/',
  geojson: 'https://purl.org/geojson/vocab#',
};

export const UNANCHORED_PROJECT_CONTEXT: ContextDefinition = {
  regen: 'https://schema.regen.network#',
  schema: 'http://schema.org/',
  'regen:galleryPhotos': {
    '@container': '@list',
  },
  'regen:videoURL': {
    '@type': 'schema:URL',
  },
  'schema:url': {
    '@type': 'schema:URL',
  },
};

export const ANCHORED_PROJECT_CONTEXT: ContextDefinition = {
  regen: 'https://schema.regen.network#',
  schema: 'http://schema.org/',
  xsd: 'http://www.w3.org/2001/XMLSchema#',
  qudt: 'http://qudt.org/schema/qudt/',
  unit: 'http://qudt.org/vocab/unit/',
  geojson: 'https://purl.org/geojson/vocab#',
  'schema:url': {
    '@type': 'schema:URL',
  },
  'schema:image': {
    '@type': 'schema:URL',
  },
  'qudt:unit': {
    '@type': 'qudt:Unit',
  },
  'qudt:numericValue': {
    '@type': 'xsd:double',
  },
  'schema:location': {
    '@context': {
      '@vocab': 'https://purl.org/geojson/vocab#',
      type: '@type',
      coordinates: { '@container': '@list' },
    },
  },
};

export const UNANCHORED_PROJECT_KEYS = [
  'regen:creditClassId',
  'schema:description',
  'regen:story',
  'regen:storyTitle',
  'regen:previewPhoto',
  'regen:galleryPhotos',
  'regen:storyMedia',
  'regen:videoURL',
  'schema:creditText',
];

/** This context is meant to be used on any incoming JSON-LD document.
 * We use this as a way to normalize the format of any incoming JSON-LD document.
 * It simplifies parsing these documents in our application.
 */
export const COMPACTED_CONTEXT = {
  'regen:ecosystemType': { '@container': '@list' },
  'regen:projectActivities': { '@container': '@list' },
  'regen:offsetGenerationMethod': { '@container': '@list' },
  'regen:coBenefits': { '@container': '@list' },
  'regen:sectoralScope': { '@container': '@list' },
  'regen:verificationReports': { '@container': '@list' },
  'regen:cfcCreditSerialNumbers': { '@container': '@list' },
  'schema:itemListElement': { '@container': '@list' },
  'regen:additionalCertifications': { '@container': '@list' },
  'regen:cfcVintageYear': { '@type': 'xsd:gYear' },
  'regen:ratings': { '@container': '@list' },
  'regen:certifications': { '@container': '@list' },

  // Generic unanchored and anchored project metadata
  ...UNANCHORED_PROJECT_CONTEXT,
  ...ANCHORED_PROJECT_CONTEXT,
  'regen:projectStartDate': {
    '@type': 'xsd:date',
  },
  'regen:projectEndDate': {
    '@type': 'xsd:date',
  },

  // Class specific anchored project metadata
  'regen:vcsProjectPage': {
    '@type': 'schema:URL',
  },
  'regen:cfcProjectPage': {
    '@type': 'schema:URL',
  },
  'regen:projectDesignDocument': {
    '@type': 'schema:URL',
  },

  // Legacy project metadata
  'regen:landManagementActions': {
    '@container': '@list',
  },
  'schema:image': {
    '@type': 'schema:URL',
  },
  'regen:landStewardPhoto': {
    '@type': 'schema:URL',
  },
  'regen:glanceText': {
    '@container': '@list',
  },
  'regen:boundaries': {
    '@type': 'schema:URL',
  },

  // Credit class version metadata
  'regen:SDGs': { '@container': '@list' },
};
