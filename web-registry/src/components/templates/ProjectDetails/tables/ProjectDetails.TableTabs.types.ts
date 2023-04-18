import { SortCallbacksType } from 'web-components/lib/components/table/ActionsTable';

import { Document } from 'generated/graphql';

import { ProjectMiddleSectionProps } from 'components/organisms/CreditBatchesSection/CreditBatchesSection.types';

export type ProjectDetailsTableTabsProps = {
  sortedDocuments: Document[];
  sortCallbacksDocuments?: SortCallbacksType;
} & ProjectMiddleSectionProps;
