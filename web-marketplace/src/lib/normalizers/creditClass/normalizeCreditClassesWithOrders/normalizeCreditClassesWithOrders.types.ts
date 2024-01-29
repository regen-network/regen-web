import { ClassInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { PurchaseInfo } from 'web-components/src/components/cards/ProjectCard/ProjectCard.types';

import { CreditClassMetadataLD } from 'lib/db/types/json-ld';

export type CreditClassWithOrder = {
  id: string;
  name: string;
  imgSrc: string;
  purchaseInfo?: PurchaseInfo;
};

export type CreditClassWithMedata = {
  creditClass: ClassInfo;
  metadata?: CreditClassMetadataLD;
};
