import * as jsonld from 'jsonld';
import { JsonLdDocument, NodeObject } from 'jsonld';

export const COMPACTED_CONTEXT = {
  schema: 'http://schema.org/',
  regen: 'http://regen.network/',
  qudt: 'http://qudt.org/schema/qudt/',
  unit: 'http://qudt.org/vocab/unit/',
  xsd: 'http://www.w3.org/2001/XMLSchema#',
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
};

export const jsonLdCompact = async (
  data: JsonLdDocument,
): Promise<NodeObject> => {
  return await jsonld.compact(
    data,
    JSON.parse(JSON.stringify(COMPACTED_CONTEXT)),
  );
};
