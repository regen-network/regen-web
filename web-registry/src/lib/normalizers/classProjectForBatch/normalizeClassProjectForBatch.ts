import {
  BatchInfo,
  ProjectInfo,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { ClassProjectInfo } from 'types/ledger/ecocredit';

import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

interface Params {
  project: ProjectInfo | null;
  metadata: any;
  sanityCreditClassData?: AllCreditClassQuery;
  batch: BatchInfo | null;
}

export const normalizeClassProjectForBatch = ({
  batch,
  metadata,
  project,
  sanityCreditClassData,
}: Params): ClassProjectInfo => {
  const creditClassSanity = findSanityCreditClass({
    sanityCreditClassData,
    creditClassIdOrUrl: project?.classId ?? '',
  });

  return {
    classId: project?.classId,
    className: creditClassSanity?.nameRaw,
    projectName: metadata?.['schema:name'] ?? batch?.projectId,
    projectLocation: project?.jurisdiction,
    icon: creditClassSanity?.icon?.asset?.url ?? '',
  };
};
