import { QueryClientImpl } from '@regen-network/api/lib/generated/regen/data/v1/query';
import axios from 'axios';

import { apiUri } from 'lib/apiUri';
import { jsonLdCompact } from 'lib/rdf';

export const getMetadata = async (
  iri?: string,
  context?: object,
  client?: QueryClientImpl,
): Promise<any> => {
  if (!iri) return null;

  // First try to get metadata from registry-server
  let res;
  try {
    res = await fetch(`${apiUri}/metadata-graph/${iri}`);
    if (res.ok) {
      const data = await res.json();
      return await jsonLdCompact(data, context);
    }
  } catch (err) {
    return null;
  }

  // Fallback to data module resolvers if metadata can't be found on registry-server
  if (res.status === 404 && client) {
    const resolversRes = await client.ResolversByIRI({ iri });
    for (let i = 0; i < resolversRes.resolvers.length; i++) {
      const resolverUrl = resolversRes.resolvers[i].url;
      try {
        const resolverRes = await fetch(`${resolverUrl}/${iri}`);
        if (resolverRes.ok) {
          const data = await resolverRes.json();
          return await jsonLdCompact(data, context);
        }
      } catch (e) {
        // We've tried with the last resolver so we can return
        if (i === resolversRes.resolvers.length - 1) {
          return null;
        }
      }
    }
  }
  return null;
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
    const response = await axios.post(apiUri + iriUrl, metadata);
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
