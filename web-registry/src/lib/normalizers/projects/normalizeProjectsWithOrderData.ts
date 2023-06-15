import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';

import { GECKO_PRICES } from 'pages/Projects/hooks/useProjectsSellOrders.types';
import {
  getPurchaseInfo,
  normalizeToUISellOrderInfo,
} from 'pages/Projects/hooks/useProjectsSellOrders.utils';
import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';
import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

import DefaultProject from 'assets/default-project.jpg';

interface NormalizeProjectsWithOrderDataParams {
  projects?: ProjectInfo[];
  sellOrders?: SellOrderInfoExtented[];
  geckoPrices?: GECKO_PRICES;
  userAddress?: string;
  sanityCreditClassData?: AllCreditClassQuery;
}

export const normalizeProjectsWithOrderData = ({
  projects,
  sellOrders = [],
  geckoPrices,
  userAddress,
  sanityCreditClassData,
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

    const creditClass = findSanityCreditClass({
      sanityCreditClassData,
      creditClassIdOrUrl: project.classId ?? '',
    });

    return {
      id: project.id,
      name: project.id,
      imgSrc: DefaultProject,
      place: project.jurisdiction,
      area: 0,
      areaUnit: '',
      purchaseInfo,
      href: `/project/${project.id}`,
      sellOrders: sellOrdersNormalized,
      metadata: project.metadata,
      creditClassId: project.classId,
      sanityCreditClassData: creditClass,
    } as ProjectWithOrderData;
  });

  return projectsWithOrderData ?? [];
};
