import * as jsonld from 'jsonld';
import { ContextDefinition, JsonLdDocument, NodeObject } from 'jsonld';

import { COMPACTED_CONTEXT } from './rdf.constants';

export const jsonLdCompact = async (
  data: JsonLdDocument,
  context?: object,
): Promise<NodeObject> => {
  const dataHasContext = hasContext(data);
  const incomingContext = dataHasContext ? data['@context'] : {};
  const fullContext = { ...COMPACTED_CONTEXT, ...context, ...incomingContext };
  return await jsonld.compact(
    { ...data, '@context': fullContext as ContextDefinition },
    JSON.parse(JSON.stringify(fullContext)),
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
