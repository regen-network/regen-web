import { SortCallbacksType } from 'web-components/lib/components/table/ActionsTable';

import { Document } from 'generated/graphql';

export type ProjectDetailsTableTabsProps = {
  sortedDocuments: Document[];
  sortCallbacksDocuments?: SortCallbacksType;
};
