import { Box, Grid } from '@mui/material';

import Section from 'web-components/lib/components/section';
import { Title } from 'web-components/lib/components/typography';

import { ProjectBatchTotals } from '../../molecules';
import { CreditBatches } from '../CreditBatches/CreditBatches';
import { useProjectTopSectionStyles } from './ProjectMiddleSection.styles';
import { ProjectMiddleSectionProps } from './ProjectMiddleSection.types';

function ProjectMiddleSection({
  offChainProject,
  batchData,
  paginationParams,
  setPaginationParams,
  projectWithOrderData,
  soldOutProjectsIds,
}: ProjectMiddleSectionProps): JSX.Element {
  const { classes } = useProjectTopSectionStyles();

  return (
    <Section classes={{ root: classes.section }}>
      <Grid container>
        <Grid item xs={12} md={8} sx={{ pr: { md: 19 } }}>
          {batchData?.totals && (
            <ProjectBatchTotals
              projectWithOrderData={projectWithOrderData}
              soldOutProjectsIds={soldOutProjectsIds}
              totals={batchData.totals}
              sx={{
                mt: { xs: 10, sm: 12, md: 16 },
                mb: { xs: 10, sm: 12, md: 0 },
              }}
            />
          )}
        </Grid>
      </Grid>
      {batchData?.batches && batchData.batches.length > 0 && (
        // spacing here based on paddding-top for `<Section />` component
        <Box sx={{ mt: { xs: 17.75, sm: 22.25 } }}>
          <Title variant="h3" sx={{ pb: 8 }}>
            Credit Batches
          </Title>
          <CreditBatches
            creditClassId={
              offChainProject?.creditClassByCreditClassId?.onChainId
            }
            creditBatches={batchData.batches}
            filteredColumns={['projectLocation']}
            onTableChange={setPaginationParams}
            initialPaginationParams={paginationParams}
            isIgnoreOffset
          />
        </Box>
      )}
    </Section>
  );
}

export { ProjectMiddleSection };
