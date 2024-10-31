import { QueryClientImpl } from '@regen-network/api/lib/generated/regen/data/v1/query';
import axios from 'axios';

import { apiUri } from 'lib/apiUri';
import { jsonLdCompact } from 'lib/rdf';

type GetMetadataProps = {
  iri?: string;
  client?: QueryClientImpl;
  context?: object;
  languageCode: string;
};

export const getMetadata = async ({
  iri,
  client,
  context,
  languageCode,
}: GetMetadataProps): Promise<any> => {
  if (!iri) return null;
  let res;
  try {
    res = await fetch(
      `${apiUri}/data/v1/metadata-graph/${iri}?languageCode=${languageCode}`,
    );
    if (res.ok) {
      const data = await res.json();
      return await jsonLdCompact(data, context);
    }
  } catch (err) {
    return null;
  }

  // Fallback to data module resolvers if metadata can't be found on registry-server
  // (fetch API doesn't throw any error on 404)
  if (res.status === 404 && client) {
    try {
      const resolversRes = await client.ResolversByIRI({ iri });
      const resolversLen = resolversRes.resolvers.length;
      for (let i = 0; i < resolversLen; i++) {
        const resolverUrl = resolversRes.resolvers[i].url;
        try {
          const resolverRes = await fetch(`${resolverUrl}/${iri}`);
          if (resolverRes.ok) {
            const data = await resolverRes.json();
            return await jsonLdCompact(data, context);
          }
        } catch (fetchErr) {
          // Error while fetching metadata with resolver,
          // will keep looping through the remaining resolvers
          // until successful or iterator exhausted and null will be returned.
        }
      }
    } catch (clientErr) {
      // No resolver found, null will be returned.
    }
  }

  return null;
};

/**
 * Generate IRI
 */

const iriUrl = '/data/v1/iri-gen';

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
    // eslint-disable-next-line lingui/no-unlocalized-strings
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
