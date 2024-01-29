import { TablePaginationParams } from 'web-components/src/components/table/ActionsTable';

import { Maybe, ProjectFieldsFragment } from 'generated/graphql';
import { SdgByIriQuery } from 'generated/sanity-graphql';
import {
  BatchInfoWithSupply,
  BatchTotalsForProject,
} from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';

export type ProjectMiddleSectionProps = {
  offChainProject?: Maybe<ProjectFieldsFragment>;
  batchData?: {
    batches?: BatchInfoWithSupply[];
    totals?: BatchTotalsForProject;
  };
  paginationParams: TablePaginationParams;
  setPaginationParams: UseStateSetter<TablePaginationParams>;
};

export type SdgType = SdgByIriQuery['allSdg'][0];
