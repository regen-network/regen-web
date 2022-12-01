import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { GECKO_PRICES } from 'pages/Projects/hooks/useProjectsSellOrders.types';
import {
  getPurchaseInfo,
  normalizeToUISellOrderInfo,
} from 'pages/Projects/hooks/useProjectsSellOrders.utils';
import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

import DefaultProject from 'assets/default-project.jpg';

interface NormalizeProjectsWithOrderDataParams {
  projects?: ProjectInfo[];
  sellOrders?: SellOrderInfoExtented[];
  geckoPrices?: GECKO_PRICES;
  userAddress?: string;
  metadatas?: any[];
}

export const normalizeProjectsWithOrderData = ({
  projects,
  sellOrders = [],
  geckoPrices,
  userAddress,
  metadatas,
}: NormalizeProjectsWithOrderDataParams): ProjectWithOrderData[] => {
  const projectsWithOrderData = projects?.map((project: ProjectInfo, index) => {
    const sellOrdersNormalized = sellOrders
      .filter(sellOrder => sellOrder?.batchDenom?.startsWith(project.id))
      .map(normalizeToUISellOrderInfo);
    const purchaseInfo = getPurchaseInfo({
      projectId: project.id,
      sellOrders,
      geckoPrices,
      userAddress,
    });
    const metadata: any = metadatas?.[index];

    return {
      id: project.id,
      name: metadata?.['schema:name'] || project.id,
      imgSrc: metadata?.['regen:previewPhoto']?.['@value'] || DefaultProject,
      place: metadata?.['schema:location']?.place_name || project.jurisdiction,
      area: metadata?.['regen:projectSize']?.['qudt:numericValue']?.['@value'],
      areaUnit:
        metadata?.['regen:projectSize']?.['qudt:unit']?.['@value'] || '',
      purchaseInfo,
      href: `/projects/${project.id}`,
      sellOrders: sellOrdersNormalized,
    } as ProjectWithOrderData;
  });

  return projectsWithOrderData ?? [];
};
