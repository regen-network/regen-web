import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles } from '@mui/styles';
import { Box, Grid, Link, styled } from '@mui/material';
import cx from 'clsx';
import LazyLoad from 'react-lazyload';

import { Theme } from 'web-components/lib/theme/muiTheme';
// import { getFontSize } from 'web-components/lib/theme/sizing';
import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';
import ProjectPlaceInfo from 'web-components/lib/components/place/ProjectPlaceInfo';
import GlanceCard from 'web-components/lib/components/cards/GlanceCard';
import Description from 'web-components/lib/components/description';
import ProjectTopCard from 'web-components/lib/components/cards/ProjectTopCard';
import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';
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
import { ProjectCreditBatchesTable } from '.';
import { ProjectBatchTotals } from '../molecules';

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
  description: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(5.5),
      paddingTop: theme.spacing(7.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4),
      paddingTop: theme.spacing(3.75),
    },
  },
  quotePersonName: {
    color: theme.palette.secondary.main,
    letterSpacing: '1px',
    fontWeight: 800,
    textTransform: 'uppercase',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(5.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
      paddingTop: theme.spacing(4),
    },
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
  creditClassDetail: {
    display: 'flex',
    alignItems: 'baseline',
    paddingTop: theme.spacing(1.75),
  },
  creditClass: {
    textTransform: 'uppercase',
    marginRight: theme.spacing(2),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 800,
  },
  darkText: {
    color: theme.palette.info.dark,
  },
  link: {
    position: 'relative',
  },
  creditClassName: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(16),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(14),
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

function ProjectTopLink({
  label,
  name,
  url,
  creditClassId,
}: {
  label: string;
  name?: string;
  url?: string | null;
  creditClassId?: string; // on-chain credit class id (e.g. "C01")
}): JSX.Element {
  const styles = useStyles();

  const text = (
    <span className={styles.darkText}>
      {name && ReactHtmlParser(name)}
      {creditClassId && name ? (
        <span> ({creditClassId})</span>
      ) : (
        <span>{creditClassId}</span>
      )}
    </span>
  );
  return (
    <div className={styles.creditClassDetail}>
      <Title className={styles.creditClass} variant="h5">
        {label}:
      </Title>
      <div className={styles.creditClassName}>
        {url ? (
          <Link
            className={styles.link}
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {text}
            <SmallArrowIcon sx={{ ml: 1, mb: 0.5, height: 9, width: 13 }} />
          </Link>
        ) : (
          <>{text}</>
        )}
      </div>
    </div>
  );
}

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
  const videoURL = metadata?.['http://regen.network/videoURL']?.['@value'];
  const landStewardPhoto =
    metadata?.['http://regen.network/landStewardPhoto']?.['@value'];
  const unit: qudtUnit | undefined =
    metadata?.['http://regen.network/size']?.[
      'http://qudt.org/1.1/schema/qudt#unit'
    ]?.['@value'];
  const creditClass = project?.creditClassByCreditClassId;
  const creditClassVersion = creditClass?.creditClassVersionsById?.nodes?.[0];
  const methodologyVersion =
    creditClass?.methodologyByMethodologyId?.methodologyVersionsById
      ?.nodes?.[0];
  const quote = metadata?.['http://regen.network/projectQuote'];
  const additionalCertification =
    metadata?.['http://regen.network/additionalCertification'];
  const glanceText = metadata?.['http://regen.network/glanceText']?.['@list'];
  const landStory = metadata?.['http://regen.network/landStory'];
  const landStewardStoryTitle =
    metadata?.['http://regen.network/landStewardStoryTitle'];
  const landStewardStory = metadata?.['http://regen.network/landStewardStory'];

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
          <Title variant="h1">{metadata?.['http://schema.org/name']}</Title>
          <Box sx={{ pt: { xs: 5, sm: 6 } }}>
            <ProjectPlaceInfo
              iconClassName={styles.icon}
              // TODO Format and show on-chain project location if no off-chain location
              place={metadata?.['http://schema.org/location']?.place_name}
              area={
                metadata?.['http://regen.network/size']?.[
                  'http://qudt.org/1.1/schema/qudt#numericValue'
                ]?.['@value']
              }
              areaUnit={unit && qudtUnitMap[unit]}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2.5 }}>
              {creditClass && creditClassVersion && (
                <>
                  <ProjectTopLink
                    label="credit class"
                    name={creditClassVersion.name}
                    url={
                      creditClassVersion.metadata?.['http://schema.org/url']?.[
                        '@value'
                      ]
                    }
                    creditClassId={
                      creditClassVersion?.metadata?.[
                        'http://regen.network/creditClassId'
                      ]
                    }
                  />
                  {metadata?.['http://regen.network/projectActivity']?.[
                    'http://schema.org/name'
                  ] && (
                    <ProjectTopLink
                      label="project activity"
                      name={
                        metadata?.['http://regen.network/projectActivity']?.[
                          'http://schema.org/name'
                        ]
                      }
                      url={
                        metadata?.['http://regen.network/projectActivity']?.[
                          'http://schema.org/url'
                        ]?.['@value']
                      }
                    />
                  )}
                  <ProjectTopLink
                    label="offset generation method"
                    name={
                      creditClassVersion.metadata?.[
                        'http://regen.network/offsetGenerationMethod'
                      ]
                    }
                  />
                </>
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
              {creditClass && additionalCertification && (
                <ProjectTopLink
                  label="additional certification"
                  name={additionalCertification?.['http://schema.org/name']}
                  url={
                    additionalCertification?.['http://schema.org/url']?.[
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
          {landStory && (
            <Description className={styles.description}>
              {landStory}
            </Description>
          )}
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
                  title={metadata?.['http://schema.org/name'] || 'project'}
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
                sx={{ ml: { xs: 4, sm: 4.5 } }}
                className={styles.tagline}
              >
                <QuoteMark sx={{ top: 16, left: { xs: -15, sm: -18 } }}>
                  “
                </QuoteMark>
                <Box component="span" sx={{ position: 'relative', zIndex: 1 }}>
                  {quote['http://regen.network/quote']}
                </Box>
                <QuoteMark sx={{ ml: -2.5, bottom: { xs: 14, sm: 16 } }}>
                  ”
                </QuoteMark>
              </Title>
              <Title variant="h6" className={styles.quotePersonName}>
                {quote['http://schema.org/name']}
              </Title>
              <Description className={styles.quotePersonRole}>
                {quote['http://schema.org/jobTitle']}
              </Description>
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
          {/* TODO uncomment code below and display on-chain project.metadata */}
          {/* <>
            <Box
              sx={theme => ({
                fontSize: { xs: theme.spacing(3), sm: theme.spacing(3.5) },
                color: theme.palette.primary.contrastText,
                fontWeight: 800,
                fontFamily: 'Muli',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                pt: { xs: 6.25, sm: 11.75 },
                pb: { xs: 2.75, sm: 5.5 },
              })}
            >
              additional metadata
            </Box>
            <Description fontSize={getFontSize('metadata')}>
              lorem ipsum
            </Description>
          </> */}
        </Grid>
        <Grid item xs={12} md={4} sx={{ pt: { xs: 10, sm: 'inherit' } }}>
          <ProjectTopCard
            projectDeveloper={getDisplayParty(
              'http://regen.network/projectDeveloper',
              metadata,
              project?.partyByDeveloperId,
            )}
            landSteward={getDisplayParty(
              'http://regen.network/landSteward',
              metadata,
              project?.partyByStewardId,
            )}
            landOwner={getDisplayParty(
              'http://regen.network/landOwner',
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
          <ProjectCreditBatchesTable batches={batchData.batches} />
        </Box>
      )}
    </Section>
  );
}

export { ProjectTopSection };
