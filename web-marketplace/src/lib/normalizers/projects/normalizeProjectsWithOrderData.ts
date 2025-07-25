import { ProjectInfo } from '@regen-network/api/regen/ecocredit/v1/query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { IS_TERRASOS } from 'lib/env';
import { SellOrderInfoExtented } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.types';

import { ProjectWithOrderData } from 'pages/Projects/AllProjects/AllProjects.types';
import {
  getPurchaseInfo,
  normalizeToUISellOrderInfo,
} from 'pages/Projects/hooks/useProjectsSellOrders.utils';
import {
  ADMIN_ON_CHAIN_PROJECTS,
  ON_CHAIN_PROJECTS,
} from 'components/templates/ProjectDetails/hooks/useMoreProjects.constants';
import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

interface NormalizeProjectsWithOrderDataParams {
  projects?: (ProjectInfo | undefined)[];
  sellOrders?: SellOrderInfoExtented[];
  userAddress?: string;
  sanityCreditClassData?: AllCreditClassQuery;
  adminAddr?: string;
}

export const normalizeProjectsWithOrderData = ({
  projects,
  sellOrders = [],
  userAddress,
  sanityCreditClassData,
  adminAddr,
}: NormalizeProjectsWithOrderDataParams): (
  | ProjectWithOrderData
  | undefined
)[] => {
  const projectsWithOrderData = projects?.map((project, index) => {
    if (!project) return undefined;
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

    const defaultProjectImage = IS_TERRASOS
      ? '/jpg/default-project2.jpg'
      : '/jpg/default-project.jpg';

    return {
      id: project.id,
      name: project.id,
      imgSrc: defaultProjectImage,
      place: project.jurisdiction,
      area: 0,
      areaUnit: '',
      purchaseInfo,
      href: `/project/${project.id}`,
      sellOrders: sellOrdersNormalized,
      metadata: project.metadata,
      creditClassId: project.classId,
      sanityCreditClassData: creditClass,
      adminOrder:
        adminAddr && adminAddr === project.admin
          ? ADMIN_ON_CHAIN_PROJECTS
          : ON_CHAIN_PROJECTS,
    } as ProjectWithOrderData;
  });

  return projectsWithOrderData ?? [];
};
