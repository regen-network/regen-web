import { SellOrderInfo } from '@regen-network/api/regen/ecocredit/marketplace/v1/query';

import { ProjectCardProps } from 'web-components/src/components/cards/ProjectCard';

import { AllCreditClassQuery } from 'generated/sanity-graphql';

import { CardSellOrder } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';

export interface UISellOrderInfo extends Omit<SellOrderInfo, 'id' | '$type'> {
  id: string;
  askBaseDenom: string;
}

export interface ProjectWithOrderData extends ProjectCardProps {
  id: string;
  sellOrders: UISellOrderInfo[];
  metadata?: string;
  sanityCreditClassData?: AllCreditClassQuery['allCreditClass'][0];
  offChain?: boolean;
  published?: boolean;
  offChainId?: string;
  slug?: string;
  marketType?: string[];
  ecosystemType?: string[];
  region?: string;
  allCardSellOrders?: Array<CardSellOrder>;
  adminOrder?: number;
}

export type FilterCommunityCreditsEvent = {
  selected: string;
};

export type FilterCreditClassEvent = {
  creditClassId: string;
  selected: string;
};

export type CreditClassFilter = {
  name: string;
  path: string;
  isCommunity?: boolean;
};
