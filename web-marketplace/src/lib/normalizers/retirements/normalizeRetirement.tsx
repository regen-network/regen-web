import {
  ClassInfo,
  ProjectInfo,
} from '@regen-network/api/regen/ecocredit/v1/query';
import { getDataFromBatchDenomId } from 'legacy-pages/Dashboard/MyEcocredits/MyEcocredits.utils';

import { Account } from 'web-components/src/components/user/UserInfo';

import { Maybe } from 'generated/graphql';
import { RetirementFieldsFragment } from 'generated/indexer-graphql';
import { CreditClass } from 'generated/sanity-graphql';
import {
  AnchoredProjectMetadataLD,
  CreditClassMetadataLD,
} from 'lib/db/types/json-ld';

import { SanityNextImage } from 'components/atoms/SanityNextImage';

type Props = {
  retirement?: Maybe<RetirementFieldsFragment>;
  retirementData?: ReturnType<typeof getDataFromBatchDenomId>[];
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
  batchStartDates?: string[];
  batchEndDates?: string[];
  batchIds: string[] | [];
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
  retirementIcon?: JSX.Element;
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
}: Props): NormalizedRetirement | undefined =>
  retirement
    ? {
        amountRetired: retirement.amount,
        batchStartDates: retirementData?.map(data => data.batchStartDate) ?? [],
        batchEndDates: retirementData?.map(data => data.batchEndDate) ?? [],
        batchIds: retirement.batchDenoms.filter(
          (id): id is string => id !== null && id !== undefined,
        ),
        creditClassId: retirementData?.[0]?.classId,
        creditClassName:
          creditClassMetadata?.['schema:name'] ?? retirementData?.[0]?.classId,
        creditClassType: creditClass?.creditTypeAbbrev,
        issuer,
        owner,
        nodeId: retirement.nodeId,
        projectId: retirementData?.[0]?.projectId ?? '',
        projectName:
          projectMetadata?.['schema:name'] ??
          retirementData?.[0]?.projectId ??
          '',
        projectLocation: project?.jurisdiction,
        retirementDate: retirement.timestamp,
        retirementLabel: sanityCreditClass?.retirementLabel ?? '',
        retirementIcon: (
          <SanityNextImage
            className="w-[91px] h-[91px] sm:w-[145px] sm:h-[145px] print:w-[75px] print:h-[75px]"
            image={sanityCreditClass?.retirementIcon}
          />
        ),
        retirementLocation: retirement.jurisdiction,
        retirementReason: retirement.reason,
        retiredBy: retirement.owner,
        txHash: retirement.txHash,
      }
    : undefined;
