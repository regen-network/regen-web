import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';

import { ProjectWithOrderData } from 'pages/Projects/AllProjects/AllProjects.types';
import {
  getPurchaseInfo,
  normalizeToUISellOrderInfo,
} from 'pages/Projects/AllProjects/hooks/useProjectsSellOrders.utils';
import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';
import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

interface NormalizeProjectsWithOrderDataParams {
  projects?: ProjectInfo[];
  sellOrders?: SellOrderInfoExtented[];
  userAddress?: string;
  sanityCreditClassData?: AllCreditClassQuery;
}

export const normalizeProjectsWithOrderData = ({
  projects,
  sellOrders = [],
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
      userAddress,
    });

    const creditClass = findSanityCreditClass({
      sanityCreditClassData,
      creditClassIdOrUrl: project.classId ?? '',
    });

    return {
      id: project.id,
      name: project.id,
      imgSrc: '/jpg/default-project.jpg',
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
