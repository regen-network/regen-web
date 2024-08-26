import { BatchInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';

import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';
import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

import {
  NormalizedSellOrder,
  ProjectInfoWithMetadata,
} from './Storefront.types';

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
