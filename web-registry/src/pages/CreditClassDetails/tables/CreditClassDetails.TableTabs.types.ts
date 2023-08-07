import { CreditClassMetadataLD } from 'lib/db/types/json-ld';

export type CreditClassDetailsTableTabsProps = {
  creditClassMetadata?: CreditClassMetadataLD;
  onChainCreditClassId?: string;
};
