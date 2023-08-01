import { CreditClassMetadataLD } from 'lib/db/types/json-ld';

export type CreditClassDetailsTableTabsProps = {
  creditClassMetadata?: CreditClassMetadataLD;
  creditTypeName?: string;
  onChainCreditClassId?: string;
};
