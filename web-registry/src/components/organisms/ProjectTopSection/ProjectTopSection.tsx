import LazyLoad from 'react-lazyload';
import ReactPlayerLazy from 'react-player/lazy';
import { Link } from 'react-router-dom';
import {
  Box,
  CardMedia,
  Grid,
  Skeleton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useSortResultWithIris } from 'utils/sanity/useSortResultWithIris';

import { BlockContent } from 'web-components/lib/components/block-content';
import Card from 'web-components/lib/components/cards/Card';
import CreditClassCard from 'web-components/lib/components/cards/CreditClassCard';
import GlanceCard from 'web-components/lib/components/cards/GlanceCard';
import ProjectTopCard from 'web-components/lib/components/cards/ProjectTopCard';
import ProjectPlaceInfo from 'web-components/lib/components/place/ProjectPlaceInfo';
import ReadMore from 'web-components/lib/components/read-more';
import Section from 'web-components/lib/components/section';
import { Body, Label, Title } from 'web-components/lib/components/typography';

import { useSdgByIriQuery } from 'generated/sanity-graphql';
import { getParty } from 'lib/transform';

import {
  API_URI,
  IMAGE_STORAGE_BASE_URL,
  MAPBOX_TOKEN,
} from 'components/templates/ProjectDetails/ProjectDetails.config';
import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

import { client } from '../../../lib/clients/sanity';
import { getSanityImgSrc } from '../../../lib/imgSrc';
import { ProjectTopLink } from '../../atoms';
import { ProjectBatchTotals, ProjectPageMetadata } from '../../molecules';
import {
  ProjectTopSectionQuoteMark,
  useProjectTopSectionStyles,
} from './ProjectTopSection.styles';
import { ProjectTopSectionProps, SdgType } from './ProjectTopSection.types';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { creditClass, creditClassVersion, offsetGenerationMethod, sdgIris } =
    parseOffChainProject(offChainProject);

  const { projectName, area, areaUnit, placeName } =
    parseProjectMetadata(projectMetadata);

  const {
    videoURL,
    glanceText,
    primaryDescription,
    quote,
    landStewardPhoto,
    landStewardStoryTitle,
    landStewardStory,
  } = parseProjectPageMetadata(projectPageMetadata);

  const creditClassSanity = findSanityCreditClass({
    sanityCreditClassData,
    creditClassIdOrUrl:
      creditClass?.onChainId ??
      creditClassVersion?.metadata?.['schema:url'] ??
      onChainProjectId?.split('-')?.[0], // if no offChain credit class
  });

  const displayName =
    projectName ?? (onChainProjectId && `Project ${onChainProjectId}`) ?? '';

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
          {landStewardStoryTitle && (
            <Title sx={{ pt: { xs: 11.75, sm: 14 } }} variant="h2">
              Story
            </Title>
          )}
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
          <LazyLoad offset={50}>
            {videoURL && (
              <Card className={classes.media}>
                <CardMedia
                  component={ReactPlayerLazy}
                  url={videoURL}
                  height={isMobile ? 221 : 438}
                  fallback={<Skeleton height={isMobile ? 221 : 438} />}
                  width="100%"
                />
              </Card>
            )}
            {landStewardPhoto && (
              <img
                className={classes.media}
                alt="land steward"
                src={landStewardPhoto}
              />
            )}
          </LazyLoad>
          {landStewardStoryTitle && (
            <Title variant="h4" className={classes.tagline}>
              {landStewardStoryTitle}
            </Title>
          )}
          {landStewardStory && (
            <ReadMore maxLength={450} restMinLength={300}>
              {landStewardStory}
            </ReadMore>
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
    </Section>
  );
}

export { ProjectTopSection };
