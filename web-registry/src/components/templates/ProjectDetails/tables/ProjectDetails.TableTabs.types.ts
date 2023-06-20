import { SortCallbacksType } from 'web-components/lib/components/table/ActionsTable';

import { Document } from 'generated/graphql';
import {
  AnchoredProjectMetadataLD,
  LegacyProjectMetadataLD,
} from 'lib/db/types/json-ld';

import { ProjectMiddleSectionProps } from 'components/organisms/CreditBatchesSection/CreditBatchesSection.types';

export type ProjectDetailsTableTabsProps = {
  sortedDocuments: Document[];
  sortCallbacksDocuments?: SortCallbacksType;
  projectMetadata?: AnchoredProjectMetadataLD | LegacyProjectMetadataLD;
  onChainProjectId?: string;
} & ProjectMiddleSectionProps;
