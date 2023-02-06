import * as jsonld from 'jsonld';
import { JsonLdDocument, NodeObject } from 'jsonld';

import { ANCHORED_PROJECT_CONTEXT, UNANCHORED_PROJECT_CONTEXT } from './rdf';

export const COMPACTED_CONTEXT = {
  'regen:ecosystemType': { '@container': '@list' },
  'regen:projectActivities': { '@container': '@list' },
  'regen:offsetGenerationMethod': { '@container': '@list' },
  'regen:sectoralScope': { '@container': '@list' },
  'regen:verificationReports': { '@container': '@list' },
  'regen:cfcCreditSerialNumbers': { '@container': '@list' },
  'schema:itemListElement': { '@container': '@list' },
  'schema:location': {
    '@context': {
      type: '@type',
      '@vocab': 'https://purl.org/geojson/vocab#',
      coordinates: {
        '@container': '@list',
      },
    },
  },
  'regen:approvedMethodologies': {
    '@container': '@list',
  },

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
};

export const jsonLdCompact = async (
  data: JsonLdDocument,
): Promise<NodeObject> => {
  return await jsonld.compact(
    data,
    JSON.parse(JSON.stringify(COMPACTED_CONTEXT)),
  );
};
