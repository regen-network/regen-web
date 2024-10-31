import { SxProps } from '@mui/material';

import { SortCallbacksType } from 'web-components/src/components/table/ActionsTable';
import { Theme } from 'web-components/src/theme/muiTheme';

import { Document } from 'generated/graphql';
import { ProjectMetadataLD } from 'lib/db/types/json-ld';
import { TranslatorType } from 'lib/i18n/i18n.types';

import { ProjectMiddleSectionProps } from 'components/organisms/CreditBatchesSection/CreditBatchesSection.types';

export type ProjectDetailsTableTabsProps = {
  sortedDocuments: Document[];
  sortCallbacksDocuments?: SortCallbacksType;
  projectMetadata?: ProjectMetadataLD;
  onChainProjectId?: string;
  sx?: SxProps<Theme>;
  _: TranslatorType;
} & ProjectMiddleSectionProps;
