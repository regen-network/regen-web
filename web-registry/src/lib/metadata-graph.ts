import axios from 'axios';
import getApiUri from './apiUri';

export const getMetadata = async (iri: string): Promise<any> => {
  if (!iri) throw new Error('No metadata iri provided');
  const { data } = await axios.get(`${getApiUri()}/metadata-graph/${iri}`);
  return data;
};

export const getMetadataFromUint8Array = async (
  metadata: Uint8Array,
): Promise<any> => {
  const metadataStr = uint8ArrayToBase64(metadata);
  return metadataStr && getMetadata(metadataStr);
};

function uint8ArrayToBase64(arr: Uint8Array): string {
  return btoa(
    Array.from(arr)
      .map(c => String.fromCharCode(c))
      .join(''),
  );
}

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

export function uint8ArrayToString(metadata: Uint8Array): string {
  const decoder = new TextDecoder();
  return decoder.decode(metadata);
}

export function stringToUint8Array(metadata: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(metadata);
}
