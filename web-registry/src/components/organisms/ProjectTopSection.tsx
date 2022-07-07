import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Grid, styled } from '@mui/material';
import cx from 'clsx';
import LazyLoad from 'react-lazyload';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import { Body, Label, Title } from 'web-components/lib/components/typography';
import ProjectPlaceInfo from 'web-components/lib/components/place/ProjectPlaceInfo';
import GlanceCard from 'web-components/lib/components/cards/GlanceCard';
import ProjectTopCard from 'web-components/lib/components/cards/ProjectTopCard';
import ReadMore from 'web-components/lib/components/read-more';

import { ProjectByHandleQuery } from '../../generated/graphql';
import { useSdgByIriQuery } from '../../generated/sanity-graphql';
import { getParty, getDisplayParty } from '../../lib/transform';
import { getSanityImgSrc } from '../../lib/imgSrc';
import { qudtUnit, qudtUnitMap } from '../../lib/rdf';
import { client } from '../../sanity';
import {
  BatchInfoWithSupply,
  BatchTotalsForProject,
} from '../../types/ledger/ecocredit';
import { CreditBatches } from '.';
import { ProjectBatchTotals, AdditionalProjectMetadata } from '../molecules';
import { ProjectTopLink } from '../atoms';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(16),
      paddingBottom: theme.spacing(27.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(6.5),
      paddingBottom: theme.spacing(20.5),
    },
  },
  tagline: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    lineHeight: '150%',
    position: 'relative',
  },
  quotePersonRole: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
    },
  },
  media: {
    width: '100%',
    borderRadius: '5px',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(12.5),
      marginBottom: theme.spacing(12.5),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(8.5),
      marginBottom: theme.spacing(8.5),
    },
  },
  iframe: {
    border: 'none',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(109.5),
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(55.25),
    },
  },
  quotes: {
    color: theme.palette.secondary.main,
    lineHeight: 0,
    zIndex: 0,
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(9),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(12),
    },
  },
  icon: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(0.25),
    },
  },
}));

const QuoteMark = styled('span')(({ theme }) => ({
  color: theme.palette.secondary.main,
  lineHeight: 0,
  zIndex: 0,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.spacing(9),
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: theme.spacing(12),
  },
}));

function ProjectTopSection({
  data,
  geojson,
  isGISFile,
  batchData,
}: {
  data?: ProjectByHandleQuery;
  geojson?: any;
  isGISFile?: boolean;
  batchData?: {
    batches?: BatchInfoWithSupply[];
    totals?: BatchTotalsForProject;
  };
}): JSX.Element {
  const styles = useStyles();

  const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
  const apiServerUrl = process.env.REACT_APP_API_URI;

  const project = data?.projectByHandle;
  const metadata = project?.metadata;

  const registry = project?.partyByRegistryId;
  const videoURL = metadata?.['regen:videoURL']?.['@value'];
  const landStewardPhoto = metadata?.['regen:landStewardPhoto']?.['@value'];
  const area =
    metadata?.['regen:projectSize']?.['qudt:numericValue']?.['@value'];
  const unit: qudtUnit | undefined =
    metadata?.['regen:projectSize']?.['qudt:unit']?.['@value'];
  const creditClass = project?.creditClassByCreditClassId;
  const creditClassVersion = creditClass?.creditClassVersionsById?.nodes?.[0];
  const methodologyVersion =
    creditClass?.methodologyByMethodologyId?.methodologyVersionsById
      ?.nodes?.[0];
  const quote = metadata?.['regen:projectQuote'];
  const glanceText = metadata?.['regen:glanceText']?.['@list'];
  const primaryDescription =
    metadata?.['regen:landStory'] || metadata?.['schema:description'];
  const landStewardStoryTitle = metadata?.['regen:landStewardStoryTitle'];
  const landStewardStory = metadata?.['regen:landStewardStory'];
  const isVCSProject = !!metadata?.['regen:vcsProjectId'];

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
  return (
    <Section classes={{ root: styles.section }}>
      <Grid container>
        <Grid item xs={12} md={8} sx={{ pr: { md: 19 } }}>
          {/* TODO Show on-chain project id if no off-chain name */}
          <Title variant="h1">{metadata?.['schema:name']}</Title>
          <Box sx={{ pt: { xs: 5, sm: 6 } }}>
            <ProjectPlaceInfo
              iconClassName={styles.icon}
              // TODO Format and show on-chain project location if no off-chain location
              place={metadata?.['schema:location']?.['place_name']}
              area={area}
              areaUnit={unit && qudtUnitMap[unit]}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2.5 }}>
              {creditClass && creditClassVersion && (
                <>
                  <ProjectTopLink
                    label="credit class"
                    name={creditClassVersion.name}
                    url={
                      isVCSProject
                        ? `/credit-classes/${creditClass?.onChainId}`
                        : creditClassVersion?.metadata?.[
                            'http://schema.org/url'
                          ]?.['@value']
                    }
                    creditClassId={
                      creditClassVersion?.metadata?.[
                        'http://regen.network/creditClassId'
                      ]
                    }
                    target="_self"
                  />
                </>
              )}
              {!isVCSProject && (
                <ProjectTopLink
                  label="offset generation method"
                  name={
                    creditClassVersion?.metadata?.[
                      'http://regen.network/offsetGenerationMethod'
                    ]
                  }
                />
              )}
              {methodologyVersion && (
                <ProjectTopLink
                  label="methodology"
                  name={methodologyVersion.name}
                  url={
                    methodologyVersion.metadata?.['http://schema.org/url']?.[
                      '@value'
                    ]
                  }
                />
              )}
              {registry && (
                <ProjectTopLink
                  label="registry"
                  name={registry.name}
                  url={registry.organizationByPartyId?.website}
                />
              )}
            </Box>
          </Box>

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
          {landStewardStoryTitle && (
            <Title sx={{ pt: { xs: 11.75, sm: 14 } }} variant="h2">
              Story
            </Title>
          )}
          {primaryDescription && (
            <Body size="xl" mobileSize="md" pt={[3.75, 7.5]}>
              {primaryDescription}
            </Body>
          )}
          {isVCSProject && <AdditionalProjectMetadata metadata={metadata} />}
          <LazyLoad offset={50}>
            {videoURL &&
              (/https:\/\/www.youtube.com\/embed\/[a-zA-Z0-9_.-]+/.test(
                videoURL,
              ) ||
              /https:\/\/player.vimeo.com\/video\/[a-zA-Z0-9_.-]+/.test(
                videoURL,
              ) ? (
                <iframe
                  className={cx(styles.iframe, styles.media)}
                  title={metadata?.['schema:name'] || 'project'}
                  src={videoURL}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              ) : (
                <video className={styles.media} controls>
                  <source src={videoURL} />
                </video>
              ))}
            {landStewardPhoto && (
              <img
                className={styles.media}
                alt={landStewardPhoto}
                src={landStewardPhoto}
              />
            )}
          </LazyLoad>
          {landStewardStoryTitle && (
            <Title variant="h4" className={styles.tagline}>
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
                className={styles.tagline}
                sx={{ ml: { xs: 4, sm: 4.5 } }}
              >
                <QuoteMark sx={{ top: 16, left: { xs: -15, sm: -18 } }}>
                  “
                </QuoteMark>
                <Box component="span" sx={{ position: 'relative', zIndex: 1 }}>
                  {quote['regen:quote']}
                </Box>
                <QuoteMark sx={{ ml: -2.5, bottom: { xs: 14, sm: 16 } }}>
                  ”
                </QuoteMark>
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
            projectDeveloper={getDisplayParty(
              'regen:projectDeveloper',
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
            reseller={getParty(project?.partyByResellerId)}
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
            projectPage
          />
        </Box>
      )}
    </Section>
  );
}

export { ProjectTopSection };
