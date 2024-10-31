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
  isOnChain?: boolean,
): IconTabProps[] {
  return [
    {
      label: _(msg`Tebu Credits`),
      content: projectPageMetadata && (
        <TebuInfo
          projectBatchTotals={projectBatchTotals}
          projectPageMetadata={projectPageMetadata}
          _={_}
        />
      ),
      hidden: !(projectPageMetadata && isOnChain),
    },
    {
      label: _(msg`Compliance Credits`),
      content: <ComplianceInfo />,
      hidden: true,
    },
  ].filter(tab => !tab.hidden);
}

export default function TerrasosCreditsInfo({
  _,
  projectBatchTotals,
  projectPageMetadata,
  isOnChain,
}: {
  _: TranslatorType;
  projectBatchTotals?: JSX.Element;
  projectPageMetadata: ProjectPageMetadataLD;
  isOnChain?: boolean;
}) {
  const tabs = getTabs(_, projectBatchTotals, projectPageMetadata, isOnChain);
  return tabs.length > 0 ? (
    <Box sx={{ mt: 0 }}>
      <TableTabs
        sx={{
          px: { xs: 0, sm: 0 },
          pt: { xs: '50px', sm: '50px' },
        }}
        tabs={tabs}
      />
    </Box>
  ) : null;
}
