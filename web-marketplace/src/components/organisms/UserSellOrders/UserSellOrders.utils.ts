import {
  BatchInfo,
  ProjectInfo,
} from '@regen-network/api/regen/ecocredit/v1/query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { SellOrderInfoExtented } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.types';
import {
  createAscSortHandler,
  createDescSortHandler,
} from 'lib/sort/createSortHandler';
import { transformToNum } from 'lib/sort/transforms';

import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

import { NormalizedSellOrder } from './hooks/useNormalizedSellOrders';

type ProjectInfoWithMetadata = Omit<ProjectInfo, 'metadata'> & {
  metadata: any;
};

/* normalizeprojectsInfosByHandleMap */
type NormalizeprojectsInfosByHandleMapProps = {
  onChainProjects?: ProjectInfoWithMetadata[];
  sanityCreditClassData?: AllCreditClassQuery;
  classesMetadata?: (CreditClassMetadataLD | undefined)[];
};

// eslint-disable-next-line
export const normalizeProjectsInfosByHandleMap = ({
  onChainProjects = [],
  sanityCreditClassData,
  classesMetadata,
}: NormalizeprojectsInfosByHandleMapProps) => {
  const projectsMap = new Map<
    string,
    { name: string; classIdOrName: string; classId: string }
  >();

  onChainProjects.forEach((project, index) => {
    const creditClassSanity = findSanityCreditClass({
      sanityCreditClassData,
      creditClassIdOrUrl: project?.classId,
    });
    const classMetadata = classesMetadata?.[index];

    projectsMap.set(project?.id, {
      name: project.metadata?.['schema:name'] || project.id,
      classIdOrName:
        (classMetadata?.['schema:name'] || creditClassSanity?.nameRaw) ??
        project?.classId,
      classId: project?.classId,
    });
  });

  return projectsMap;
};

/* normalizeSellOrders */

type NormalizedSellOrderProps = {
  sellOrders?: SellOrderInfoExtented[];
  batchInfos: (BatchInfo | undefined)[];
  projectsInfosByHandleMap: Map<
    string,
    { name: string; classIdOrName: string; classId: string }
  >;
};

export const normalizeSellOrders = ({
  batchInfos,
  sellOrders = [],
  projectsInfosByHandleMap,
}: NormalizedSellOrderProps): NormalizedSellOrder[] =>
  sellOrders.map(
    ({
      askAmount,
      askUsdAmount,
      askDenom,
      askBaseDenom,
      batchDenom,
      id,
      quantity,
      seller,
      expiration,
      disableAutoRetire,
    }) => {
      const currentBatch = batchInfos?.find(
        batch => batch?.denom === batchDenom,
      );
      const projectId = currentBatch?.projectId ?? '';
      const isLoading =
        currentBatch === undefined || projectsInfosByHandleMap.size === 0;

      return {
        id: String(id),
        expiration,
        project: {
          name: isLoading
            ? undefined
            : projectsInfosByHandleMap.get(projectId)?.name ?? null,
          id: projectId,
          classIdOrName: isLoading
            ? undefined
            : projectsInfosByHandleMap.get(projectId)?.classIdOrName ?? null,
          classId: isLoading
            ? undefined
            : projectsInfosByHandleMap.get(projectId)?.classId ?? null,
        },
        // eslint-disable-next-line lingui/no-unlocalized-strings
        status: 'Partially filled',
        askAmount,
        askUsdAmount,
        askDenom,
        askBaseDenom,
        amountAvailable: quantity,
        amountSold: undefined,
        batchDenom,
        batchStartDate: isLoading ? undefined : currentBatch?.startDate ?? null,
        batchEndDate: isLoading ? undefined : currentBatch?.endDate ?? null,
        seller,
        disableAutoRetire,
      };
    },
  );

export type SellOrdersSortType =
  | 'default'
  | 'price-asc'
  | 'price-desc'
  | 'price-asc'
  | 'price-desc'
  | 'id-asc'
  | 'id-desc'
  | 'amount-asc'
  | 'amount-desc'
  | 'currency-denom-asc'
  | 'currency-denom-desc'
  | 'batch-denom-asc'
  | 'batch-denom-desc';

const asc = createAscSortHandler<SellOrderInfoExtented>();
const desc = createDescSortHandler<SellOrderInfoExtented>();

export const sortSellOrders = (
  sellOrders: SellOrderInfoExtented[],
  sort: SellOrdersSortType,
): SellOrderInfoExtented[] => {
  switch (sort) {
    case 'price-asc':
      return sellOrders.sort(asc('askUsdAmount'));
    case 'price-desc':
      return sellOrders.sort(desc('askUsdAmount'));
    case 'id-asc':
      return sellOrders.sort(asc('id', transformToNum));
    case 'id-desc':
      return sellOrders.sort(desc('id', transformToNum));
    case 'amount-asc':
      return sellOrders.sort(asc('quantity', transformToNum));
    case 'amount-desc':
      return sellOrders.sort(desc('quantity', transformToNum));
    case 'currency-denom-asc':
      return sellOrders.sort(asc('askBaseDenom'));
    case 'currency-denom-desc':
      return sellOrders.sort(desc('askBaseDenom'));
    case 'batch-denom-asc':
      return sellOrders.sort(asc('batchDenom'));
    case 'batch-denom-desc':
      return sellOrders.sort(desc('batchDenom'));
    default:
      return sellOrders;
  }
};
