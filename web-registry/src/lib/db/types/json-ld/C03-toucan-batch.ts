import { VCSBatchMetadataLD } from './C01-verified-carbon-standard-batch';

// type generated from https://github.com/regen-network/regen-registry-standards/blob/main/jsonld/C03/credit-batch-metadata/C03-batch-minimal-example.jsonld

export interface ToucanBatchMetadataLD extends VCSBatchMetadataLD {
  'regen:toucanVintageTokenId': number;
  'regen:toucanURI': string;
}
