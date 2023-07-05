import { ContextDefinition } from 'jsonld';

import { CompactedNameOptionalUrl } from 'lib/rdf/types';

import { BatchMetadataLD } from './batch-base';

// type generated from https://github.com/regen-network/regen-registry-standards/blob/a71a0be161eb15b8e7c6a6ffe12881c26673b34d/jsonld/credit-batches/C01-verified-carbon-standard-batch.json

export interface VCSBatchMetadataLD extends BatchMetadataLD {
  '@context'?: ContextDefinition;
  'regen:vcsProjectId'?: string;
  'regen:vcsRetirementSerialNumber'?: string;
  'regen:additionalCertifications'?: CompactedNameOptionalUrl[];
}
