import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';

import { ProjectDetailsDocumentationTable } from './documentation/ProjectDetails.Documentation';
import { ProjectDetailsTableTabsProps } from './ProjectDetails.TableTabs.types';

export const getProjectDetailsTabs = ({
  sortedDocuments,
  sortCallbacksDocuments,
}: ProjectDetailsTableTabsProps): IconTabProps[] => [
  {
    label: 'Project documentation',
    content: (
      <ProjectDetailsDocumentationTable
        documents={sortedDocuments}
        sortCallbacks={sortCallbacksDocuments}
      />
    ),
  },
];
