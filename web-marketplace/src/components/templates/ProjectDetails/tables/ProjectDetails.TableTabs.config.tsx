import { msg } from '@lingui/macro';

import { IconTabProps } from 'web-components/src/components/tabs/IconTab';

import { getProjectUnknownFields } from 'lib/rdf/rdf.unknown-fields';

import { ProjectPageMetadata } from 'components/molecules';
import { CreditBatches } from 'components/organisms';
import { isAnchoredProjectMetadata } from 'components/organisms/ProjectTopSection/ProjectTopSection.utils';

import { ProjectDetailsDocumentationTable } from './documentation/ProjectDetails.Documentation';
import { ProjectDetailsTableTabsProps } from './ProjectDetails.TableTabs.types';

export const getProjectDetailsTabs = ({
  sortedDocuments,
  sortCallbacksDocuments,
  paginationParams,
  offChainProject,
  batchData,
  onChainProjectId,
  projectMetadata,
  setPaginationParams,
  _,
}: ProjectDetailsTableTabsProps): IconTabProps[] =>
  [
    {
      label: _(msg`Project documentation`),
      content: (
        <ProjectDetailsDocumentationTable
          documents={sortedDocuments}
          sortCallbacks={sortCallbacksDocuments}
        />
      ),
      hidden: (sortedDocuments.length ?? 0) === 0,
    },
    {
      label: _(msg`Credit Issuance`),
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
      label: _(msg`Additional Info`),
      content: (
        <ProjectPageMetadata
          metadata={projectMetadata}
          onChainProjectId={onChainProjectId}
        />
      ),
      hidden:
        !isAnchoredProjectMetadata(projectMetadata, onChainProjectId) &&
        projectMetadata &&
        getProjectUnknownFields(projectMetadata).length === 0 &&
        projectMetadata['@type'] !== 'TerrasosProjectInfo',
    },
  ].filter(tab => tab.hidden !== true);
