import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { Party } from 'web-components/lib/components/modal/LedgerModal';

import { Maybe, ProjectFieldsFragment } from 'generated/graphql';
import { AllCreditClassQuery, SdgByIriQuery } from 'generated/sanity-graphql';
import {
  AnchoredProjectMetadataLD,
  LegacyProjectMetadataLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';

export type ProjectTopSectionProps = {
  offChainProject?: Maybe<ProjectFieldsFragment>;
  onChainProject?: ProjectInfo;
  projectMetadata?: AnchoredProjectMetadataLD | LegacyProjectMetadataLD;
  projectPageMetadata?: ProjectPageMetadataLD;
  sanityCreditClassData?: AllCreditClassQuery;
  geojson?: any;
  isGISFile?: boolean;
  onChainProjectId?: string;
  landSteward?: Party;
  landOwner?: Party;
  projectDeveloper?: Party;
  loading?: boolean;
};

export type SdgType = SdgByIriQuery['allSdg'][0];
