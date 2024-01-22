import {
  ClassInfo,
  ProjectInfo,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { Account } from 'web-components/src/components/user/UserInfo';

import { Maybe } from 'generated/graphql';
import { RetirementFieldsFragment } from 'generated/indexer-graphql';
import { CreditClass } from 'generated/sanity-graphql';
import {
  AnchoredProjectMetadataLD,
  CreditClassMetadataLD,
} from 'lib/db/types/json-ld';

import { getDataFromBatchDenomId } from 'pages/Dashboard/MyEcocredits/MyEcocredits.utils';

type Props = {
  retirement?: Maybe<RetirementFieldsFragment>;
  retirementData?: ReturnType<typeof getDataFromBatchDenomId>;
  project?: ProjectInfo;
  projectMetadata?: AnchoredProjectMetadataLD;
  creditClass?: ClassInfo;
  sanityCreditClass?: CreditClass;
  creditClassMetadata?: CreditClassMetadataLD;
  issuer?: Account;
  owner?: Account;
};

export type NormalizedRetirement = {
  nodeId?: string;
  amountRetired?: string;
  batchStartDate?: string;
  batchEndDate?: string;
  batchId?: string;
  retirementDate: string;
  creditClassId?: string;
  creditClassName?: string;
  creditClassType?: string;
  issuer?: Account;
  owner?: Account;
  projectId: string;
  projectName: string;
  projectLocation?: string;
  retirementLabel?: string;
  retirementIcon?: string;
  retirementLocation?: string;
  retirementReason?: string;
  retiredBy?: string;
  txHash?: string;
};

export const normalizeRetirement = ({
  project,
  projectMetadata,
  retirement,
  retirementData,
  creditClass,
  sanityCreditClass,
  creditClassMetadata,
  issuer,
  owner,
}: Props): NormalizedRetirement => ({
  amountRetired: retirement?.amount,
  batchStartDate: retirementData?.batchStartDate,
  batchEndDate: retirementData?.batchEndDate,
  batchId: retirement?.batchDenom,
  creditClassId: retirementData?.classId,
  creditClassName:
    creditClassMetadata?.['schema:name'] ?? retirementData?.classId,
  creditClassType: creditClass?.creditTypeAbbrev,
  issuer,
  owner,
  nodeId: retirement?.nodeId,
  projectId: retirementData?.projectId ?? '',
  projectName:
    projectMetadata?.['schema:name'] ?? retirementData?.projectId ?? '',
  projectLocation: project?.jurisdiction,
  retirementDate: retirement?.timestamp,
  retirementLabel: sanityCreditClass?.retirementLabel ?? '',
  retirementIcon: sanityCreditClass?.retirementIcon?.asset?.url ?? '',
  retirementLocation: retirement?.jurisdiction,
  retirementReason: retirement?.reason,
  retiredBy: retirement?.owner,
  txHash: retirement?.txHash,
});
