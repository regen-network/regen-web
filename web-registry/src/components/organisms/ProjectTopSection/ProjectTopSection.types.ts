import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import {
  BatchInfoWithSupply,
  BatchTotalsForProject,
} from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { ProjectMetadataIntersectionLD } from 'lib/db/types/json-ld';

export type ProjectTopSectionProps = {
  data?: any; // TODO: when all project are onchain, this can be ProjectByOnChainIdQuery
  onChainProject?: ProjectInfo;
  metadata?: Partial<ProjectMetadataIntersectionLD>;
  sanityCreditClassData?: AllCreditClassQuery;
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
};
