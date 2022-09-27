import axios from 'axios';
import * as jsonld from 'jsonld';

import getApiUri from './apiUri';

export const getMetadata = async (iri: string): Promise<any> => {
  if (!iri) throw new Error('No metadata iri provided');
  const { data } = await axios.get(`${getApiUri()}/metadata-graph/${iri}`);
  console.log('raw', { ...data });

  const compacted = await jsonld.compact(data, {
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
    'schema:itemListElement': { '@container': '@list' },
    'regen:verificationReports': { '@container': '@list' },
    'regen:cfcCreditSerialNumbers': { '@container': '@list' },
  });
  console.log('compacted', compacted);
  return compacted;
};

/**
 * Generate IRI
 */

const iriUrl = '/iri-gen';

type IriSuccessProp = {
  iri: string;
};

type MetadataProp<T> = {
  metadata: T;
};

export type IriFromMetadataSuccess<T> = IriSuccessProp & MetadataProp<T>;

type IriFromMetadata<T> = IriFromMetadataSuccess<T>;

export async function generateIri<T>(
  metadata: T,
): Promise<IriFromMetadata<T> | undefined> {
  try {
    const response = await axios.post(getApiUri() + iriUrl, metadata);
    return response.data;
  } catch (err) {
    throw new Error(`Error in iri generation service: ${err}`);
  }
}

/**
 * Metadata transformations
 */

export function stringToUint8Array(metadata: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(metadata);
}
