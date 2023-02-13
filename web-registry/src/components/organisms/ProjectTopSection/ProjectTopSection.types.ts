import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';

<<<<<<< HEAD
import { AllCreditClassQuery } from 'generated/sanity-graphql';
=======
import { Maybe, ProjectFieldsFragment } from 'generated/graphql';
import { AllCreditClassQuery, SdgByIriQuery } from 'generated/sanity-graphql';
>>>>>>> 22aa75a4 (feat: sort SDGs and Impacts based on initial ordering (#1785))
import {
  BatchInfoWithSupply,
  BatchTotalsForProject,
} from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { ProjectMetadataIntersectionLD } from 'lib/db/types/json-ld';

import { ProjectWithOrderData } from 'pages/Projects/Projects.types';

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
  soldOutProjectsIds: string[];
  projectWithOrderData: ProjectWithOrderData;
};

export type SdgType = SdgByIriQuery['allSdg'][0];
