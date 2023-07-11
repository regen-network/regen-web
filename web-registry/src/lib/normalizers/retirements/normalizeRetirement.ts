import {
  ClassInfo,
  QueryProjectResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { Party } from 'web-components/lib/components/user/UserInfo';

import { Maybe } from 'generated/graphql';
import { RetirementFieldsFragment } from 'generated/indexer-graphql';
import {
  AnchoredProjectMetadataLD,
  CreditClassMetadataLD,
} from 'lib/db/types/json-ld';

import { getDataFromBatchDenomId } from 'pages/Dashboard/MyEcocredits/MyEcocredits.utils';

type Props = {
  retirement?: Maybe<RetirementFieldsFragment>;
  retirementData?: ReturnType<typeof getDataFromBatchDenomId>;
  project?: QueryProjectResponse | null;
  projectMetadata?: AnchoredProjectMetadataLD;
  creditClass?: ClassInfo;
  creditClassMetadata?: CreditClassMetadataLD;
  issuer?: Party;
  owner?: Party;
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
  issuer?: Party;
  owner?: Party;
  projectId: string;
  projectName: string;
  projectLocation?: string;
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
  projectLocation: project?.project?.jurisdiction,
  retirementDate: retirement?.timestamp,
  retirementLocation: retirement?.jurisdiction,
  retirementReason: retirement?.reason,
  retiredBy: retirement?.owner,
  txHash: retirement?.txHash,
});
