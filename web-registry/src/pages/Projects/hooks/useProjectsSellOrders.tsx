import { useEffect, useState } from 'react';
import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { ProjectCardProps } from 'web-components/lib/components/cards/ProjectCard';

import { getMetadata } from 'lib/metadata-graph';

import {
  getPurchaseInfo,
  sortProjectsBySellOrdersAvailability,
} from './useProjectsSellOrders.utils';

import DefaultProject from 'assets/default-project.jpg';

type Props = {
  projects?: ProjectInfo[];
  sellOrders?: SellOrderInfo[];
  limit?: number;
};

export const useProjectsSellOrders = ({
  projects,
  sellOrders,
  limit,
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
          limit ?? projects.length,
        );
        setProjectsWithOrders(_projectsWithOrders);
      }
    };
    normalize();
  }, [projects, sellOrders, limit]);

  return projectsWithOrders;
};

export interface ProjectWithOrderData extends ProjectCardProps {
  id: string;
}

const getProjectDisplayData = async (
  projects: ProjectInfo[],
  sellOrders: SellOrderInfo[],
  limit: number,
): Promise<ProjectWithOrderData[]> => {
  const projectsWithOrderData = await Promise.all(
    projects
      .sort(sortProjectsBySellOrdersAvailability(sellOrders))
      .slice(0, limit)
      .map(async project => {
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
          imgSrc:
            metadata?.['regen:previewPhoto']?.['@value'] || DefaultProject,
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
