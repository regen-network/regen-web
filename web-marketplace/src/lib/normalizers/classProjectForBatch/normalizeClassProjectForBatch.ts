import {
  BatchInfo,
  ProjectInfo,
} from '@regen-network/api/regen/ecocredit/v1/query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { ClassProjectInfo } from 'types/ledger/ecocredit';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';

import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

interface Params {
  project?: ProjectInfo | null;
  projectMetadata: any;
  sanityCreditClassData?: AllCreditClassQuery;
  batch?: BatchInfo | null;
  creditClassMetadata?: CreditClassMetadataLD;
}

export const normalizeClassProjectForBatch = ({
  batch,
  projectMetadata,
  project,
  sanityCreditClassData,
  creditClassMetadata,
}: Params): ClassProjectInfo => {
  const creditClassSanity = findSanityCreditClass({
    sanityCreditClassData,
    creditClassIdOrUrl: project?.classId ?? '',
  });

  return {
    classId: project?.classId,
    className:
      creditClassMetadata?.['schema:name'] || creditClassSanity?.nameRaw,
    projectName: projectMetadata?.['schema:name'] ?? batch?.projectId,
    projectLocation: project?.jurisdiction,
    icon: creditClassSanity?.icon?.asset?.url ?? '',
  };
};
