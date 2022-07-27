import axios from 'axios';

import getApiUri from './apiUri';

export const getMetadata = async (metadata: string): Promise<any> => {
  if (metadata) {
    // The on-chain metadata fields being stored as bytes for now, we need to decode it using base64 to get the corresponding IRI value as a string.
    // This won't be needed once the on-chain metadata fields are converted to string: https://github.com/regen-network/regen-ledger/issues/829
    const iri = atob(metadata);
    const { data } = await axios.get(`${getApiUri()}/metadata-graph/${iri}`);

    return data;
  }
  throw new Error('No metadata hash provided');
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
