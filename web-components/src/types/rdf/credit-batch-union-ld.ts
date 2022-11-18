import { VCSBatchMetadataLD } from './C01-verified-carbon-standard-batch';
import { CFCBatchMetadataLD } from './C02-city-forest-credits-batch';
import { ToucanBatchMetadataLD } from './C03-toucan-batch';

export type CreditBatchMetadataUnionLD = VCSBatchMetadataLD &
  CFCBatchMetadataLD &
  ToucanBatchMetadataLD;
