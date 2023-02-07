import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { Party } from 'web-components/lib/components/modal/LedgerModal';
import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';

import { Maybe, ProjectFieldsFragment } from 'generated/graphql';
import { AllCreditClassQuery } from 'generated/sanity-graphql';
import {
  BatchInfoWithSupply,
  BatchTotalsForProject,
} from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import {
  AnchoredProjectMetadataLD,
  LegacyProjectMetadataLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';

import { ProjectWithOrderData } from 'pages/Projects/Projects.types';

export type ProjectTopSectionProps = {
  offChainProject?: Maybe<ProjectFieldsFragment>;
  onChainProject?: ProjectInfo;
  projectMetadata?: AnchoredProjectMetadataLD | LegacyProjectMetadataLD;
  projectPageMetadata?: ProjectPageMetadataLD;
  sanityCreditClassData?: AllCreditClassQuery;
  landSteward?: Party;
  projectDeveloper?: Party;
  landOwner?: Party;
  geojson?: any;
  isGISFile?: boolean;
  batchData?: {
    batches?: BatchInfoWithSupply[];
    totals?: BatchTotalsForProject;
  };
  paginationParams: TablePaginationParams;
  setPaginationParams: UseStateSetter<TablePaginationParams>;
  onChainProjectId?: string;
  loading?: boolean;
  soldOutProjectsIds: string[];
  projectWithOrderData: ProjectWithOrderData;
};
