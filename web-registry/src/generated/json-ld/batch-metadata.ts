import { TypeValue } from '../../types/rdf';

// type generated from https://github.com/regen-network/regen-registry-standards/blob/a71a0be161eb15b8e7c6a6ffe12881c26673b34d/jsonld/credit-batches/C01-verified-carbon-standard-batch.json

export interface BatchMetadataLD {
  '@context'?: Context;
  '@type': string;
  'regen:vcsRetirementSerialNumber': string;
  'regen:vintageYear': TypeValue;
  'regen:batchMonitoringReport': NameUrl;
  'regen:batchVerificationReport': NameUrl;
}

interface NameUrl {
  'schema:name': string;
  'schema:url': TypeValue;
}

interface Context {
  schema: string;
  regen: string;
}
