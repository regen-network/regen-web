import axios, { AxiosResponse } from 'axios';
import getApiUri from './apiUri';

export const getMetadata = async (hash: Uint8Array): Promise<AxiosResponse> => {
  if (hash) {
    // The on-chain metadata fields being stored as bytes for now, we need to decode it using base64 to get the corresponding IRI value as a string.
    // This won't be needed once the on-chain metadata fields are converted to string: https://github.com/regen-network/regen-ledger/issues/829
    const iri = atob(hash.toString());
    return axios.get(`${getApiUri()}/metadata-graph/${iri}`);
  }
  return Promise.reject('No metadata hash provided');
};
