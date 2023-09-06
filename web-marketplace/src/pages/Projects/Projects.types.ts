import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';

import { ProjectCardProps } from 'web-components/lib/components/cards/ProjectCard';

import { AllCreditClassQuery } from 'generated/sanity-graphql';

export interface UISellOrderInfo extends Omit<SellOrderInfo, 'id' | '$type'> {
  id: string;
  askBaseDenom: string;
}

export interface ProjectWithOrderData extends ProjectCardProps {
  id: string;
  sellOrders: UISellOrderInfo[];
  metadata?: string;
  sanityCreditClassData?: AllCreditClassQuery['allCreditClass'][0];
}

export type FilterCommunityCreditsEvent = {
  selected: string;
};

export type FilterCreditClassEvent = {
  creditClassId: string;
  selected: string;
};
