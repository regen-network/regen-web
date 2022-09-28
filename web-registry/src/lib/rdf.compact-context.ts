export const COMPACT_CONTEXT = JSON.parse(
  JSON.stringify({
    schema: 'http://schema.org/',
    regen: 'http://regen.network/',
    qudt: 'http://qudt.org/schema/qudt/',
    unit: 'http://qudt.org/vocab/unit/',
    xsd: 'http://www.w3.org/2001/XMLSchema#',
    geojson: 'https://purl.org/geojson/vocab#',
    'geojson:coordinates': { '@container': '@list' },
    'regen:ecosystemType': { '@container': '@list' },
    'regen:projectActivities': { '@container': '@list' },
    'regen:offsetGenerationMethod': { '@container': '@list' },
    'regen:sectoralScope': { '@container': '@list' },
    'regen:verificationReports': { '@container': '@list' },
    'regen:cfcCreditSerialNumbers': { '@container': '@list' },
    'schema:itemListElement': { '@container': '@list' },
  }),
);
