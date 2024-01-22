import { IconTabProps } from 'web-components/src/components/tabs/IconTab';

import { ProjectPageMetadata } from 'components/molecules';
import { CreditBatches } from 'components/organisms';
import { isAnchoredProjectMetadata } from 'components/organisms/ProjectTopSection/ProjectTopSection.utils';

import { ProjectDetailsDocumentationTable } from './documentation/ProjectDetails.Documentation';
import { ProjectDetailsTableTabsProps } from './ProjectDetails.TableTabs.types';

export const getProjectDetailsTabs = ({
  sortedDocuments,
  sortCallbacksDocuments,
  paginationParams,
  setPaginationParams,
  offChainProject,
  batchData,
  onChainProjectId,
  projectMetadata,
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
      label: 'Credit Issuance',
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
    {
      label: 'Additional Info',
      content: (
        <>
          {isAnchoredProjectMetadata(projectMetadata, onChainProjectId) && (
            <ProjectPageMetadata
              metadata={projectMetadata}
              onChainProjectId={onChainProjectId}
            />
          )}
        </>
      ),
      hidden: !isAnchoredProjectMetadata(projectMetadata, onChainProjectId),
    },
  ].filter(tab => tab.hidden !== true);
