import { Box, Grid } from '@mui/material';
import { useSortResultWithIris } from 'utils/sanity/useSortResultWithIris';

import ProjectTopCard from 'web-components/lib/components/cards/ProjectTopCard';
import Section from 'web-components/lib/components/section';
import { Title } from 'web-components/lib/components/typography';

import { useSdgByIriQuery } from '../../../generated/sanity-graphql';
import { client } from '../../../lib/clients/sanity';
import { getSanityImgSrc } from '../../../lib/imgSrc';
import { getParty } from '../../../lib/transform';
import { ProjectBatchTotals } from '../../molecules';
import { CreditBatches } from '../CreditBatches/CreditBatches';
import { useProjectTopSectionStyles } from './ProjectMiddleSection.styles';
import {
  ProjectMiddleSectionProps,
  SdgType,
} from './ProjectMiddleSection.types';
import {
  getDisplayAdmin,
  parseOffChainProject,
} from './ProjectMiddleSection.utils';

function ProjectMiddleSection({
  offChainProject,
  onChainProject,
  projectDeveloper,
  landSteward,
  landOwner,
  batchData,
  paginationParams,
  setPaginationParams,
  projectWithOrderData,
  soldOutProjectsIds,
}: ProjectMiddleSectionProps): JSX.Element {
  const { classes } = useProjectTopSectionStyles();

  const { sdgIris } = parseOffChainProject(offChainProject);

  const { data: sdgData } = useSdgByIriQuery({
    client,
    variables: {
      iris: sdgIris,
    },
    skip: !sdgIris,
  });

  const sortedSdgData = useSortResultWithIris<SdgType>({
    dataWithIris: sdgData?.allSdg,
    iris: sdgIris,
  });

  const sdgs = sortedSdgData.map(sdg => ({
    title: sdg.title || '',
    imageUrl: getSanityImgSrc(sdg.image),
  }));

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
        <Grid item xs={12} md={4} sx={{ pt: { xs: 10, sm: 'inherit' } }}>
          <ProjectTopCard
            projectAdmin={getDisplayAdmin(onChainProject?.admin)}
            projectDeveloper={projectDeveloper}
            landSteward={landSteward}
            landOwner={landOwner}
            // TODO if no off-chain data, use on-chain project.issuer
            issuer={getParty(offChainProject?.partyByIssuerId)}
            reseller={
              !onChainProject
                ? getParty(offChainProject?.partyByResellerId)
                : undefined
            }
            sdgs={sdgs}
          />
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
