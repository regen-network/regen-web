import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';

import { ProjectCardProps } from 'web-components/lib/components/cards/ProjectCard';

export interface UISellOrderInfo extends Omit<SellOrderInfo, 'id' | '$type'> {
  id: string;
}

export interface ProjectWithOrderData extends ProjectCardProps {
  id: string;
  sellOrders: UISellOrderInfo[];
}
