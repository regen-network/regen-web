import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { Party } from 'web-components/lib/components/modal/LedgerModal';
import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';

import { Maybe, ProjectFieldsFragment } from 'generated/graphql';
import { SdgByIriQuery } from 'generated/sanity-graphql';
import {
  BatchInfoWithSupply,
  BatchTotalsForProject,
} from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';

import { ProjectWithOrderData } from 'pages/Projects/Projects.types';

export type ProjectMiddleSectionProps = {
  offChainProject?: Maybe<ProjectFieldsFragment>;
  onChainProject?: ProjectInfo;
  landSteward?: Party;
  projectDeveloper?: Party;
  landOwner?: Party;
  batchData?: {
    batches?: BatchInfoWithSupply[];
    totals?: BatchTotalsForProject;
  };
  paginationParams: TablePaginationParams;
  setPaginationParams: UseStateSetter<TablePaginationParams>;
  soldOutProjectsIds: string[];
  projectWithOrderData: ProjectWithOrderData;
};

export type SdgType = SdgByIriQuery['allSdg'][0];
