import { useEffect, useState } from 'react';
import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { ProjectCardProps } from 'web-components/lib/components/cards/ProjectCard';
import { PurchaseInfo } from 'web-components/lib/components/cards/ProjectCard/ProjectCard.types';

import { getMetadata } from 'lib/metadata-graph';

import DefaultProject from 'assets/default-project.jpg';

type Props = {
  projects?: ProjectInfo[];
  sellOrders?: SellOrderInfo[];
};

export const useProjectsSellOrders = ({
  projects,
  sellOrders,
}: Props): ProjectWithOrderData[] => {
  const [projectsWithOrders, setProjectsWithOrders] = useState<
    ProjectWithOrderData[]
  >([]);

  useEffect(() => {
    const normalize = async (): Promise<void> => {
      if (projects && sellOrders) {
        const _projectsWithOrders = await getProjectDisplayData(
          projects,
          sellOrders,
        );
        setProjectsWithOrders(_projectsWithOrders);
      }
    };
    normalize();
  }, [projects, sellOrders]);

  return projectsWithOrders;
};

export interface ProjectWithOrderData extends ProjectCardProps {
  id: string;
}

const getProjectDisplayData = async (
  projects: ProjectInfo[],
  sellOrders: SellOrderInfo[],
): Promise<ProjectWithOrderData[]> => {
  const projectsWithOrderData = await Promise.all(
    projects?.map(async project => {
      const purchaseInfo = getPurchaseInfo(project.id, sellOrders);
      let metadata;
      if (project.metadata.length) {
        try {
          metadata = await getMetadata(project.metadata);
        } catch (error) {
          // eslint-disable-next-line
          console.error(error);
        }
      }

      return {
        id: project.id,
        name: metadata?.['schema:name'] || project.id,
        imgSrc: metadata?.['regen:previewPhoto']?.['@value'] || DefaultProject,
        place:
          metadata?.['schema:location']?.place_name || project.jurisdiction,
        area: metadata?.['regen:projectSize']?.['qudt:numericValue']?.[
          '@value'
        ],
        areaUnit:
          metadata?.['regen:projectSize']?.['qudt:unit']?.['@value'] || '',
        purchaseInfo,
        href: `/projects/${project.id}`,
      } as ProjectWithOrderData;
    }),
  );
  return projectsWithOrderData;
};

const getPurchaseInfo = (
  projectId: string,
  sellOrders: SellOrderInfo[],
): PurchaseInfo => {
  const ordersForThisProject = sellOrders.filter(order =>
    order.batchDenom.startsWith(projectId),
  );
  if (!ordersForThisProject.length)
    return {
      sellInfo: {
        pricePerTon: `-`,
        creditsAvailable: 0,
      },
    };

  const creditsAvailable = ordersForThisProject
    .map(order => parseInt(order.quantity))
    .reduce((total, quantity) => total + quantity, 0);

  const prices = ordersForThisProject
    .map(order => parseInt(order.askAmount))
    .sort((a, b) => a - b);
  const priceMin = prices?.[0];
  const priceMax = prices?.[prices.length - 1];

  return {
    sellInfo: {
      pricePerTon: `${priceMin}-${priceMax}`,
      creditsAvailable,
    },
  };
};
