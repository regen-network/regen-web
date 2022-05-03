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
  return getMetadata(metadataStr);
};

function uint8ArrayToBase64(arr: Uint8Array): string {
  return btoa(
    Array.from(arr)
      .map(c => String.fromCharCode(c))
      .join(''),
  );
}
