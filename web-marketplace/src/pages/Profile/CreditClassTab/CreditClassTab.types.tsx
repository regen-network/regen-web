import { CreditClass } from 'generated/sanity-graphql';

export interface MetadataOnlyClass {
  path: string;
  id: string;
  name: string;
  description: string;
  imageSrc?: string;
  isMetadataOnly: true;
}
export type MergedCreditClass =
  | (CreditClass & {
      name?: string;
      description?: string;
      imageSrc?: string;
    })
  | MetadataOnlyClass;
