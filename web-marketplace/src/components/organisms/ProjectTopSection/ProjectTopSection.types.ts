import {
  ProjectInfo,
  QueryClassResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { Props as ActionCardProps } from 'web-components/src/components/molecules/ActionCard/ActionCard';
import { Account } from 'web-components/src/components/user/UserInfoCard';

import { Maybe, ProjectFieldsFragment } from 'generated/graphql';
import {
  AllCreditClassQuery,
  ProjectPrefinancing,
  SdgByIriQuery,
} from 'generated/sanity-graphql';
import {
  BatchInfoWithSupply,
  BatchTotalsForProject,
} from 'types/ledger/ecocredit';
import {
  CreditClassMetadataLD,
  ProjectMetadataLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

export type ProjectTopSectionProps = {
  offChainProject?: Maybe<ProjectFieldsFragment>;
  onChainProject?: ProjectInfo;
  projectMetadata?: ProjectMetadataLD;
  projectPageMetadata?: ProjectPageMetadataLD;
  creditClassSanity?: AllCreditClassQuery['allCreditClass'][0];
  geojson?: any;
  isGISFile?: boolean;
  onChainProjectId?: string;
  loading?: boolean;
  soldOutProjectsIds: string[];
  projectWithOrderData: NormalizeProject;
  batchData?: {
    batches?: BatchInfoWithSupply[];
    totals?: BatchTotalsForProject;
  };
  otcCard?: ActionCardProps;
  creditClassMetadata?: CreditClassMetadataLD;
  creditClassOnChain?: QueryClassResponse | null;
  onChainCreditClassId?: string;
  program?: Account;
  projectPrefinancing?: ProjectPrefinancing | null;
  isSoldOut: boolean;
};

export type SdgType = SdgByIriQuery['allSdg'][0];
