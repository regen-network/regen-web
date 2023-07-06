import {
  ProjectInfo,
  QueryClassResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { Props as ActionCardProps } from 'web-components/lib/components/molecules/ActionCard/ActionCard';

import { Maybe, ProjectFieldsFragment } from 'generated/graphql';
import { AllCreditClassQuery, SdgByIriQuery } from 'generated/sanity-graphql';
import {
  BatchInfoWithSupply,
  BatchTotalsForProject,
} from 'types/ledger/ecocredit';
import {
  AnchoredProjectMetadataLD,
  CreditClassMetadataLD,
  LegacyProjectMetadataLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';

import { ProjectWithOrderData } from 'pages/Projects/Projects.types';

export type ProjectTopSectionProps = {
  offChainProject?: Maybe<ProjectFieldsFragment>;
  onChainProject?: ProjectInfo;
  projectMetadata?: AnchoredProjectMetadataLD | LegacyProjectMetadataLD;
  projectPageMetadata?: ProjectPageMetadataLD;
  creditClassSanity?: AllCreditClassQuery['allCreditClass'][0];
  geojson?: any;
  isGISFile?: boolean;
  onChainProjectId?: string;
  loading?: boolean;
  soldOutProjectsIds: string[];
  projectWithOrderData: ProjectWithOrderData;
  batchData?: {
    batches?: BatchInfoWithSupply[];
    totals?: BatchTotalsForProject;
  };
  otcCard?: ActionCardProps;
  creditClassMetadata?: CreditClassMetadataLD;
  creditClassOnChain?: QueryClassResponse | null;
  onChainCreditClassId?: string;
};

export type SdgType = SdgByIriQuery['allSdg'][0];
