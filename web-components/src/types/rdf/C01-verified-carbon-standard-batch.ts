import { NameUrl } from '.';

// type generated from https://github.com/regen-network/regen-registry-standards/blob/a71a0be161eb15b8e7c6a6ffe12881c26673b34d/jsonld/credit-batches/C01-verified-carbon-standard-batch.json

export interface VCSBatchMetadataLD {
  '@context'?: Context;
  '@type'?: string;
  'regen:vcsProjectId'?: string;
  'regen:vcsRetirementSerialNumber'?: string;
  'regen:additionalCertifications'?: NameUrl[];
}

interface Context {
  schema: string;
  regen: string;
  'regen:additionalCertifications': { '@container': '@list' };
}
