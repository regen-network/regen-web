import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';

import Section from 'web-components/src/components/section';
import { Title } from 'web-components/src/components/typography';

import { CreditBatches } from '../CreditBatches/CreditBatches';
import { useProjectTopSectionStyles } from './CreditBatchesSection.styles';
import { ProjectMiddleSectionProps } from './CreditBatchesSection.types';

function CreditBatchesSection({
  offChainProject,
  batchData,
  paginationParams,
  setPaginationParams,
}: ProjectMiddleSectionProps): JSX.Element | null {
  const { classes } = useProjectTopSectionStyles();

  return batchData?.batches && batchData.batches.length > 0 ? (
    <Section classes={{ root: classes.section }}>
      {/* spacing here based on padding-top for `<Section />` component */}
      <Box sx={{ mt: { xs: 17.75, sm: 22.25 } }}>
        <Title variant="h3" sx={{ pb: 8 }}>
          <Trans>Credit Batches</Trans>
        </Title>
        <CreditBatches
          creditClassId={offChainProject?.creditClassByCreditClassId?.onChainId}
          creditBatches={batchData.batches}
          filteredColumns={['projectLocation']}
          onTableChange={setPaginationParams}
          initialPaginationParams={paginationParams}
          isIgnoreOffset
        />
      </Box>
    </Section>
  ) : null;
}

export { CreditBatchesSection };
