import { BatchInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';

import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';
import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

import { AllProjectsQuery } from '../../../generated/graphql';
import {
  NormalizedSellOrder,
  ProjectInfoWithMetadata,
} from './Storefront.types';

/* normalizeprojectsInfosByHandleMap */
type NormalizeprojectsInfosByHandleMapProps = {
  offChainProjects: AllProjectsQuery['allProjects'];
  onChainProjects?: ProjectInfoWithMetadata[];
  sanityCreditClassData?: AllCreditClassQuery;
  classesMetadata?: (CreditClassMetadataLD | undefined)[];
};

// eslint-disable-next-line
export const normalizeProjectsInfosByHandleMap = ({
  offChainProjects,
  onChainProjects = [],
  sanityCreditClassData,
  classesMetadata,
}: NormalizeprojectsInfosByHandleMapProps) => {
  const projectsMap = new Map<
    string,
    { name: string; classIdOrName: string; classId: string }
  >();

  offChainProjects?.nodes?.forEach(project => {
    const isVCSProject = !!project?.metadata?.['regen:vcsProjectId'];
    const creditClass = project?.creditClassByCreditClassId;
    const creditClassVersion = creditClass?.creditClassVersionsById?.nodes[0];

    if (project?.slug) {
      const creditClassSanity = findSanityCreditClass({
        sanityCreditClassData,
        creditClassIdOrUrl:
          creditClassVersion?.metadata?.['http://schema.org/url']?.['@value'],
      });

      projectsMap.set(project?.slug, {
        name: project?.slug,
        classIdOrName: creditClassSanity?.nameRaw ?? '',
        classId: isVCSProject
          ? creditClass?.onChainId
          : creditClassVersion?.metadata?.['http://schema.org/url']?.['@value'],
      });
    }
  });

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
