import * as jsonld from 'jsonld';
import { JsonLdDocument, NodeObject } from 'jsonld';

import { COMPACTED_CONTEXT } from './rdf.constants';

export const jsonLdCompact = async (
  data: JsonLdDocument,
  context?: object,
): Promise<NodeObject> => {
  return await jsonld.compact(
    data,
    JSON.parse(JSON.stringify({ ...COMPACTED_CONTEXT, ...context })),
  );
};
