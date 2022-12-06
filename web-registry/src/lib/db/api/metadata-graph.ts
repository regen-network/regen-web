import axios from 'axios';

import getApiUri from 'lib/apiUri';
import { jsonLdCompact } from 'lib/rdf';

export const getMetadata = async (iri?: string): Promise<any> => {
  if (!iri) return null;
  try {
    const { data } = await axios.get(`${getApiUri()}/metadata-graph/${iri}`);
    return await jsonLdCompact(data);
  } catch (err) {
    return null;
  }
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
