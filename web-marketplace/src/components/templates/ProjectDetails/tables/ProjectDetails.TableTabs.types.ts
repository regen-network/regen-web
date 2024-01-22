import { SxProps } from '@mui/material';

import { SortCallbacksType } from 'web-components/src/components/table/ActionsTable';
import { Theme } from 'web-components/src/theme/muiTheme';

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
  sx?: SxProps<Theme>;
} & ProjectMiddleSectionProps;
