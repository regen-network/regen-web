/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { getMetadata } from 'lib/metadata-graph';
import { useWallet } from 'lib/wallet/wallet';

import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

import { ProjectWithOrderData } from '../Projects.types';
import { GECKO_PRICES } from './useProjectsSellOrders.types';
import {
  getPurchaseInfo,
  normalizeToUISellOrderInfo,
  sortProjectsBySellOrdersAvailability,
} from './useProjectsSellOrders.utils';

import DefaultProject from 'assets/default-project.jpg';

type Props = {
  projects?: ProjectInfo[];
  sellOrders?: SellOrderInfoExtented[];
  geckoPrices?: GECKO_PRICES;
  limit?: number;
};

export interface ProjectsSellOrders {
  projectsWithOrderData: ProjectWithOrderData[];
  loading: boolean;
}

export const useProjectsSellOrders = ({
  projects,
  sellOrders,
  geckoPrices,
  limit,
}: Props): ProjectsSellOrders => {
  const [projectsWithOrderData, setProjectsWithOrderData] = useState<
    ProjectWithOrderData[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isFetchingRef = useRef(false);
  const { wallet } = useWallet();

  useEffect(() => {
    const normalize = async (): Promise<void> => {
      if (isFetchingRef.current || projectsWithOrderData.length > 0) {
        return;
      }
      if (projects && sellOrders) {
        try {
          isFetchingRef.current = true;
          const _projectsWithOrders = await getProjectDisplayData(
            projects,
            sellOrders,
            limit ?? projects.length,
            geckoPrices,
            wallet?.address,
          );
          if (_projectsWithOrders) {
            setProjectsWithOrderData(_projectsWithOrders);
          }
        } catch (err) {
          console.error(err); // eslint-disable-line no-console
        } finally {
          setLoading(false);
          isFetchingRef.current = false;
        }
      }
    };
    normalize();
  }, [
    projects,
    sellOrders,
    geckoPrices,
    limit,
    projectsWithOrderData,
    wallet?.address,
  ]);

  return { projectsWithOrderData, loading };
};

const getProjectDisplayData = async (
  projects: ProjectInfo[],
  sellOrders: SellOrderInfoExtented[],
  limit: number,
  geckoPrices?: GECKO_PRICES,
  userAddress?: string,
): Promise<ProjectWithOrderData[]> => {
  const projectsWithOrderData = await Promise.all(
    projects
      .sort(sortProjectsBySellOrdersAvailability(sellOrders))
      .slice(0, limit)
      .map(async (project: ProjectInfo) => {
        const sellOrdersNormalized = sellOrders
          .filter(sellOrder => sellOrder?.batchDenom?.startsWith(project.id))
          .map(normalizeToUISellOrderInfo);
        const purchaseInfo = getPurchaseInfo({
          projectId: project.id,
          sellOrders,
          geckoPrices,
          userAddress,
        });
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
          sellOrders: sellOrdersNormalized,
        } as ProjectWithOrderData;
      }),
  );
  return projectsWithOrderData;
};
