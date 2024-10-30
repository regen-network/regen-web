import { msg } from '@lingui/macro';
import { Box } from '@mui/material';

import { IconTabProps } from 'web-components/src/components/tabs/IconTab';

import { ProjectPageMetadataLD } from 'lib/db/types/json-ld';
import { TranslatorType } from 'lib/i18n/i18n.types';

import { TableTabs } from 'components/organisms/TableTabs';

import ComplianceInfo from './TerrasosCreditsInfo.ComplianceInfo';
import TebuInfo from './TerrasosCreditsInfo.TebuInfo';

export function getTabs(
  _: TranslatorType,
  projectBatchTotals?: JSX.Element,
  projectPageMetadata?: ProjectPageMetadataLD,
): IconTabProps[] {
  return [
    {
      label: _(msg`Tebu Credits`),
      content: (
        <TebuInfo
          projectBatchTotals={projectBatchTotals}
          projectPageMetadata={projectPageMetadata}
          _={_}
        />
      ),
      hidden: false,
    },
    {
      label: _(msg`Compliance Credits`),
      content: <ComplianceInfo />,
      hidden: false,
    },
  ].filter(tab => !tab.hidden);
}

export default function TerrasosCreditsInfo({
  _,
  projectBatchTotals,
  projectPageMetadata,
}: {
  _: TranslatorType;
  projectBatchTotals?: JSX.Element;
  projectPageMetadata: ProjectPageMetadataLD;
}) {
  const tabs = getTabs(_, projectBatchTotals, projectPageMetadata);
  return tabs.length > 0 ? (
    <Box>
      <TableTabs sx={{ px: { xs: 0, sm: 0, md: 0, xl: 0 } }} tabs={tabs} />
    </Box>
  ) : null;
}
