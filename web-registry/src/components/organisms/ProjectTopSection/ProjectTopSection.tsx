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
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { BlockContent } from 'web-components/lib/components/block-content';
import Card from 'web-components/lib/components/cards/Card';
import CreditClassCard from 'web-components/lib/components/cards/CreditClassCard';
import GlanceCard from 'web-components/lib/components/cards/GlanceCard';
import ProjectTopCard from 'web-components/lib/components/cards/ProjectTopCard';
import ProjectPlaceInfo from 'web-components/lib/components/place/ProjectPlaceInfo';
import ReadMore from 'web-components/lib/components/read-more';
import Section from 'web-components/lib/components/section';
import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';
import { Body, Label, Title } from 'web-components/lib/components/typography';

import { ProjectMetadataIntersectionLD } from 'generated/json-ld';
import { UseStateSetter } from 'types/react/use-state';

import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

import {
  AllCreditClassQuery,
  useSdgByIriQuery,
} from '../../../generated/sanity-graphql';
import { getSanityImgSrc } from '../../../lib/imgSrc';
import { getAreaUnit, qudtUnit } from '../../../lib/rdf';
import { getDisplayParty, getParty } from '../../../lib/transform';
import { client } from '../../../sanity';
import {
  BatchInfoWithSupply,
  BatchTotalsForProject,
} from '../../../types/ledger/ecocredit';
import { ProjectTopLink } from '../../atoms';
import { ProjectBatchTotals, ProjectPageMetadata } from '../../molecules';
import { CreditBatches } from '../CreditBatches/CreditBatches';
import {
  ProjectTopSectionQuoteMark,
  useProjectTopSectionStyles,
} from './ProjectTopSection.styles';
import {
  getDisplayAdmin,
  getDisplayDeveloper,
} from './ProjectTopSection.utils';

function ProjectTopSection({
  data,
  onChainProject,
  metadata,
  sanityCreditClassData,
  geojson,
  isGISFile,
  batchData,
  setPaginationParams,
  projectId,
  loading,
}: {
  data?: any; // TODO: when all project are onchain, this can be ProjectByOnChainIdQuery
  onChainProject?: ProjectInfo;
  metadata?: Partial<ProjectMetadataIntersectionLD>;
  sanityCreditClassData?: AllCreditClassQuery;
  geojson?: any;
  isGISFile?: boolean;
  batchData?: {
    batches?: BatchInfoWithSupply[];
    totals?: BatchTotalsForProject;
  };
  setPaginationParams: UseStateSetter<TablePaginationParams>;
  projectId?: string;
  loading?: boolean;
}): JSX.Element {
  const { classes } = useProjectTopSectionStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
  const apiServerUrl = process.env.REACT_APP_API_URI;

  const project = data?.projectByOnChainId || data?.projectByHandle; // TODO: eventually just projectByOnChainId
  const videoURL = metadata?.['regen:videoURL']?.['@value'];
  const landStewardPhoto = metadata?.['regen:landStewardPhoto']?.['@value'];
  const projectSize = metadata?.['regen:projectSize'];
  const area = projectSize?.['qudt:numericValue']?.['@value'];
  const unit = projectSize?.['qudt:unit']?.['@value'];
  const areaUnit = getAreaUnit(unit as qudtUnit);
  const creditClass = project?.creditClassByCreditClassId;
  const creditClassVersion = creditClass?.creditClassVersionsById?.nodes?.[0];
  const quote = metadata?.['regen:projectQuote'];
  const glanceText: string[] | undefined =
    metadata?.['regen:glanceText']?.['@list'];
  const primaryDescription =
    metadata?.['regen:landStory'] || metadata?.['schema:description'];
  const landStewardStoryTitle = metadata?.['regen:landStewardStoryTitle'];
  const landStewardStory = metadata?.['regen:landStewardStory'];

  const sdgIris = creditClassVersion?.metadata?.['http://regen.network/SDGs']?.[
    '@list'
  ]?.map((sdg: { '@id': string }) => sdg['@id']);
  const { data: sdgData } = useSdgByIriQuery({
    client,
    variables: {
      iris: sdgIris,
    },
    skip: !sdgIris,
  });
  const sdgs = sdgData?.allSdg.map(s => ({
    title: s.title || '',
    imageUrl: getSanityImgSrc(s.image),
  }));

  const creditClassSanity = findSanityCreditClass({
    sanityCreditClassData,
    creditClassIdOrUrl:
      creditClass?.onChainId ||
      creditClassVersion?.metadata?.['http://schema.org/url']?.['@value'] ||
      projectId?.split('-')?.[0], // if no offChain credit class
  });

  return (
    <Section classes={{ root: classes.section }}>
      <Grid container>
        <Grid item xs={12} md={8} sx={{ pr: { md: 19 } }}>
          {/* TODO Show on-chain project id if no off-chain name */}
          <Title variant="h1">{metadata?.['schema:name']}</Title>
          <Box sx={{ pt: { xs: 5, sm: 6 } }}>
            <ProjectPlaceInfo
              iconClassName={classes.icon}
              // TODO Format and show on-chain project location if no off-chain location
              place={
                metadata?.['schema:location']?.['place_name'] ||
                metadata?.['schema:location']?.['geojson:place_name'] ||
                onChainProject?.jurisdiction
              }
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
              {!metadata && loading && <Skeleton variant="text" height={124} />}
              {!onChainProject && (
                <ProjectTopLink
                  label="offset generation method"
                  name={
                    creditClassVersion?.metadata?.[
                      'http://regen.network/offsetGenerationMethod'
                    ]
                  }
                />
              )}
            </Box>
          </Box>
          {/* Used to prevent layout shift */}
          {(!data || isGISFile === undefined || (isGISFile && !geojson)) &&
            loading && <Skeleton height={200} />}
          {geojson && isGISFile && glanceText && (
            <LazyLoad offset={50} once>
              <Box sx={{ pt: 6 }}>
                <GlanceCard
                  text={glanceText}
                  imageStorageBaseUrl={imageStorageBaseUrl}
                  apiServerUrl={apiServerUrl}
                  geojson={geojson}
                  isGISFile={isGISFile}
                  mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
                />
              </Box>
            </LazyLoad>
          )}
          {/* Used to prevent layout shift */}
          {!metadata && loading && <Skeleton height={200} />}
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
          <Link to={`/credit-classes/${creditClassSanity?.path}`}>
            <CreditClassCard
              title={<BlockContent content={creditClassSanity?.nameRaw} />}
              description={
                <BlockContent
                  content={creditClassSanity?.shortDescriptionRaw}
                />
              }
              imgSrc={getSanityImgSrc(creditClassSanity?.image)}
              sx={{ mt: [2, 4], py: [2, 6] }}
            />
          </Link>
          <ProjectPageMetadata metadata={metadata} projectId={projectId} />
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
                alt={landStewardPhoto}
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
          {batchData?.totals && (
            <ProjectBatchTotals
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
            projectAdmin={getDisplayAdmin(data?.admin || onChainProject?.admin)}
            projectDeveloper={getDisplayDeveloper(
              metadata,
              project?.partyByDeveloperId,
            )}
            landSteward={getDisplayParty(
              'regen:landSteward',
              metadata,
              project?.partyByStewardId,
            )}
            landOwner={getDisplayParty(
              'regen:landOwner',
              metadata,
              project?.partyByLandOwnerId,
            )}
            // TODO if no off-chain data, use on-chain project.issuer
            issuer={getParty(project?.partyByIssuerId)}
            reseller={
              !onChainProject ? getParty(project?.partyByResellerId) : undefined
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
            creditClassId={project?.creditClassByCreditClassId?.onChainId}
            creditBatches={batchData.batches}
            filteredColumns={['projectLocation']}
            onTableChange={setPaginationParams}
          />
        </Box>
      )}
    </Section>
  );
}

export { ProjectTopSection };
