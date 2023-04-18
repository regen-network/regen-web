import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';

import { CreditBatches } from 'components/organisms';

import { ProjectDetailsDocumentationTable } from './documentation/ProjectDetails.Documentation';
import { ProjectDetailsTableTabsProps } from './ProjectDetails.TableTabs.types';

export const getProjectDetailsTabs = ({
  sortedDocuments,
  sortCallbacksDocuments,
  paginationParams,
  setPaginationParams,
  offChainProject,
  batchData,
}: ProjectDetailsTableTabsProps): IconTabProps[] =>
  [
    {
      label: 'Project documentation',
      content: (
        <ProjectDetailsDocumentationTable
          documents={sortedDocuments}
          sortCallbacks={sortCallbacksDocuments}
        />
      ),
      hidden: (sortedDocuments.length ?? 0) === 0,
    },
    {
      label: 'Credit issuance',
      content: (
        <CreditBatches
          creditClassId={offChainProject?.creditClassByCreditClassId?.onChainId}
          creditBatches={batchData?.batches}
          filteredColumns={['projectLocation']}
          onTableChange={setPaginationParams}
          initialPaginationParams={paginationParams}
          sx={{ root: { borderRadius: '0 0 8px 8px' } }}
          isIgnoreOffset
        />
      ),
      hidden: (batchData?.batches?.length ?? 0) === 0,
    },
  ].filter(tab => tab.hidden !== true);
