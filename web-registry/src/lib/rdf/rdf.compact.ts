import * as jsonld from 'jsonld';
import { ContextDefinition, JsonLdDocument, NodeObject } from 'jsonld';

import { COMPACTED_CONTEXT } from './rdf.constants';

export const jsonLdCompact = async (
  data: JsonLdDocument,
  context?: object,
): Promise<NodeObject> => {
  const incomingContext = hasContext(data) ? data['@context'] : {};
  return await jsonld.compact(
    data,
    JSON.parse(
      JSON.stringify({ ...COMPACTED_CONTEXT, ...context, ...incomingContext }),
    ),
  );
};

function hasContext(
  data: JsonLdDocument,
): data is { '@context': ContextDefinition | null } {
  if (
    !Array.isArray(data) &&
    !Array.isArray(data['@context']) &&
    typeof data['@context'] !== 'string'
  ) {
    return true;
  }
  return false;
}
