import { QueryBatchInfoResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';
import { MoreProjectsQuery } from '../../../generated/graphql';
import { NormalizedSellOrder, SellOrder } from './Storefront.types';

/* normalizeProjectsNameByHandle */

type NormalizeProjectsNameByHandleProps = {
  projects: MoreProjectsQuery['allProjects'];
};

export const normalizeProjectsNameByHandle = ({
  projects,
}: NormalizeProjectsNameByHandleProps) => {
  const projectsMap = new Map<string, string>();
  projects?.nodes?.forEach(project => {
    if (project?.handle) {
      projectsMap.set(project?.handle, project?.metadata['schema:name']);
    }
  });

  return projectsMap;
};

type NormalizedSellOrderProps = {
  sellOrders: SellOrder[];
  batchInfos: QueryBatchInfoResponse[];
  projectsNameByHandleMap: Map<string, string>;
};

/* normalizeSellOrders */

export const normalizeSellOrders = ({
  batchInfos,
  sellOrders,
  projectsNameByHandleMap,
}: NormalizedSellOrderProps): NormalizedSellOrder[] =>
  sellOrders.map(
    (
      { ask_amount, ask_denom, batch_denom, id, quantity, seller, expiration },
      index,
    ) => ({
      id,
      expiration,
      project: {
        name: projectsNameByHandleMap.get('wilmot'),
        handle: 'wilmot',
      },
      status: 'Partially filled',
      askAmount: ask_amount,
      askDenom: ask_denom,
      amountAvailable: quantity,
      amountSold: undefined,
      creditClass: batchInfos[index]?.info?.classId,
      batchDenom: batch_denom,
      batchStartDate: batchInfos[index]?.info?.startDate,
      batchEndDate: batchInfos[index]?.info?.endDate,
      seller,
    }),
  );
