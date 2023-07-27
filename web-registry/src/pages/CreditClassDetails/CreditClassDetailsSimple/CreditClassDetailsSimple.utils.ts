import { CreditClassMetadataLD } from 'lib/db/types/json-ld';

export const getCreditClassDisplayName = (
  creditClassId: string,
  metadata?: Partial<CreditClassMetadataLD>,
) => {
  const name = metadata?.['schema:name'];
  return name ? name : creditClassId;
};
