import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import { Box, Grid, Skeleton } from '@mui/material';

import { BlockContent } from 'web-components/lib/components/block-content';
import CreditClassCard from 'web-components/lib/components/cards/CreditClassCard';
import GlanceCard from 'web-components/lib/components/cards/GlanceCard';
import ProjectTopCard from 'web-components/lib/components/cards/ProjectTopCard';
import ProjectPlaceInfo from 'web-components/lib/components/place/ProjectPlaceInfo';
import Section from 'web-components/lib/components/section';
import { Body, Label, Title } from 'web-components/lib/components/typography';

import {
  API_URI,
  IMAGE_STORAGE_BASE_URL,
  MAPBOX_TOKEN,
} from 'components/templates/ProjectDetails/ProjectDetails.config';
import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

import { getSanityImgSrc } from '../../../lib/imgSrc';
import { ProjectTopLink } from '../../atoms';
import { ProjectBatchTotals, ProjectPageMetadata } from '../../molecules';
import {
  ProjectTopSectionQuoteMark,
  useProjectTopSectionStyles,
} from './ProjectTopSection.styles';
import { ProjectTopSectionProps } from './ProjectTopSection.types';
import {
  getDisplayAdmin,
  isAnchoredProjectMetadata,
  parseOffChainProject,
  parseProjectMetadata,
  parseProjectPageMetadata,
} from './ProjectTopSection.utils';

function ProjectTopSection({
  offChainProject,
  onChainProject,
  projectMetadata,
  projectPageMetadata,
  sanityCreditClassData,
  geojson,
  isGISFile,
  onChainProjectId,
  loading,
  landOwner,
  landSteward,
  projectDeveloper,
  projectWithOrderData,
  soldOutProjectsIds,
  batchData,
}: ProjectTopSectionProps): JSX.Element {
  const { classes } = useProjectTopSectionStyles();

  const { creditClass, creditClassVersion, offsetGenerationMethod } =
    parseOffChainProject(offChainProject);

  const { projectName, area, areaUnit, placeName } =
    parseProjectMetadata(projectMetadata);

  const { glanceText, primaryDescription, quote } =
    parseProjectPageMetadata(projectPageMetadata);

  const creditClassSanity = findSanityCreditClass({
    sanityCreditClassData,
    creditClassIdOrUrl:
      creditClass?.onChainId ??
      creditClassVersion?.metadata?.['schema:url'] ??
      onChainProjectId?.split('-')?.[0], // if no offChain credit class
  });

  const displayName =
    projectName ?? (onChainProjectId && `Project ${onChainProjectId}`) ?? '';

  return (
    <Section classes={{ root: classes.section }}>
      <Grid container>
        <Grid item xs={12} md={8} sx={{ pr: { md: 19 } }}>
          {loading ? (
            <Skeleton height={124} />
          ) : (
            <Title variant="h1">{displayName}</Title>
          )}
          <Box sx={{ pt: { xs: 5, sm: 6 } }}>
            <ProjectPlaceInfo
              iconClassName={classes.icon}
              // TODO Format on-chain jurisdiction if no anchored location
              place={placeName ?? onChainProject?.jurisdiction ?? ''}
              area={Number(area)}
              areaUnit={areaUnit}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: 2.5,
              }}
            >
              {onChainProjectId ? (
                projectName && (
                  <Label sx={{ pt: 1.75 }} size="xs" color="info.main">
                    project id: {onChainProjectId}
                  </Label>
                )
              ) : (
                <ProjectTopLink
                  label="offset generation method"
                  name={offsetGenerationMethod?.[0]}
                />
              )}
            </Box>
          </Box>
          {/* Used to prevent layout shift */}
          {(!offChainProject ||
            isGISFile === undefined ||
            (isGISFile && !geojson)) &&
            loading && <Skeleton height={200} />}
          {geojson && isGISFile && glanceText && (
            <LazyLoad offset={50} once>
              <Box sx={{ pt: 6 }}>
                <GlanceCard
                  text={glanceText}
                  imageStorageBaseUrl={IMAGE_STORAGE_BASE_URL}
                  apiServerUrl={API_URI}
                  geojson={geojson}
                  isGISFile={isGISFile}
                  mapboxToken={MAPBOX_TOKEN}
                />
              </Box>
            </LazyLoad>
          )}
          {/* Used to prevent layout shift */}
          {loading && <Skeleton height={200} />}
          {primaryDescription && (
            <Body size="xl" mobileSize="md" py={[3.75, 6]}>
              {primaryDescription}
            </Body>
          )}
          {creditClassSanity && (
            <Link to={`/credit-classes/${creditClassSanity.path}`}>
              <CreditClassCard
                title={<BlockContent content={creditClassSanity.nameRaw} />}
                description={
                  <BlockContent
                    content={creditClassSanity.shortDescriptionRaw}
                  />
                }
                imgSrc={getSanityImgSrc(creditClassSanity.image)}
                sx={{ mt: [2, 4], py: [2, 6] }}
              />
            </Link>
          )}
          <Box>
            {batchData?.totals && (
              <ProjectBatchTotals
                projectWithOrderData={projectWithOrderData}
                soldOutProjectsIds={soldOutProjectsIds}
                totals={batchData.totals}
                sx={{
                  mt: { xs: 10, sm: 12, md: 16 },
                  mb: { xs: 10, sm: 12, md: 25 },
                }}
              />
            )}
          </Box>
          {isAnchoredProjectMetadata(projectMetadata, onChainProjectId) && (
            <ProjectPageMetadata metadata={projectMetadata} />
          )}
          {quote && (
            <div>
              <Title
                variant="h4"
                className={classes.tagline}
                sx={{ ml: { xs: 4, sm: 4.5 } }}
              >
                <ProjectTopSectionQuoteMark
                  sx={{ top: 16, left: { xs: -15, sm: -18 } }}
                >
                  “
                </ProjectTopSectionQuoteMark>
                <Box component="span" sx={{ position: 'relative', zIndex: 1 }}>
                  {quote['regen:quote']}
                </Box>
                <ProjectTopSectionQuoteMark
                  sx={{ ml: -2.5, bottom: { xs: 14, sm: 16 } }}
                >
                  ”
                </ProjectTopSectionQuoteMark>
              </Title>
              <Label mobileSize="xs" color="secondary.main" pt={[4, 5.5]}>
                {quote['schema:name']}
              </Label>
              <Body mobileSize="xs">{quote['schema:jobTitle']}</Body>
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={4} sx={{ pt: { xs: 10, sm: 'inherit' } }}>
          <ProjectTopCard
            projectAdmin={getDisplayAdmin(onChainProject?.admin)}
            projectDeveloper={projectDeveloper}
            landSteward={landSteward}
            landOwner={landOwner}
          />
        </Grid>
      </Grid>
    </Section>
  );
}

export { ProjectTopSection };
