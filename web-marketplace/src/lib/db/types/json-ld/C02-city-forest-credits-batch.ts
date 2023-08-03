import { ContextDefinition } from 'jsonld';

import { BatchMetadataLD } from './batch-base';

// type generated from https://github.com/regen-network/regen-registry-standards/blob/main/jsonld/credit-batches/C02-batch.jsonld

export interface CFCBatchMetadataLD extends BatchMetadataLD {
  '@context'?: ContextDefinition;
  'regen:cfcCreditSerialNumbers'?: string[];
  'regen:cfcVintageYear'?: string;
  'regen:verificationReports'?: {
    'schema:url': string;
  }[];
}
