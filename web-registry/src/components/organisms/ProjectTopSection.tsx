import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, useTheme } from '@mui/styles';
import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
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
import ArrowIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import ReadMore from 'web-components/lib/components/read-more';
import { ProjectByHandleQuery } from '../../generated/graphql';
import { useSdgByIriQuery } from '../../generated/sanity-graphql';
import { getParty, getDisplayParty } from '../../lib/transform';
import { getSanityImgSrc } from '../../lib/imgSrc';
import { qudtUnit, qudtUnitMap } from '../../lib/rdf';
import { client } from '../../sanity';

interface ProjectTopProps {
  data?: ProjectByHandleQuery;
  geojson?: any;
  isGISFile?: boolean;
}

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
  projectPlace: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(5),
    },
  },
  glanceCard: {
    paddingTop: theme.spacing(6),
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
  story: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(14),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(11.75),
    },
  },
  quote: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4.5),
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(4),
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
  textQuote: {
    position: 'relative',
    zIndex: 1,
  },
  firstQuote: {
    top: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      left: theme.spacing(-3.75),
    },
    [theme.breakpoints.up('sm')]: {
      left: theme.spacing(-4.5),
    },
  },
  secondQuote: {
    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(3.5),
    },
    [theme.breakpoints.up('sm')]: {
      bottom: theme.spacing(4),
    },
    marginLeft: theme.spacing(-2.5),
  },
  rightGrid: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(19),
    },
  },
  leftGrid: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(6.25),
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
  creditClassInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2.5),
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
  arrowIcon: {
    height: theme.spacing(3.5),
    position: 'absolute',
    top: theme.spacing(0.85),
  },
}));

function ProjectTopLink({
  label,
  name,
  url,
  onChainId,
}: {
  label: string;
  name?: string;
  url?: string;
  onChainId?: string;
}): JSX.Element {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  const text = (
    <span className={classes.darkText}>
      {name && ReactHtmlParser(name)}
      {onChainId && name ? (
        <span> ({onChainId})</span>
      ) : (
        <span>{onChainId}</span>
      )}
    </span>
  );
  return (
    <div className={classes.creditClassDetail}>
      <Title className={classes.creditClass} variant="h5">
        {label}:
      </Title>
      <div className={classes.creditClassName}>
        {url ? (
          <Link
            className={classes.link}
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {text}
            <ArrowIcon
              className={classes.arrowIcon}
              direction="next"
              color={theme.palette.secondary.main}
            />
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
}: ProjectTopProps): JSX.Element {
  const classes = useStyles();

  const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
  const apiServerUrl = process.env.REACT_APP_API_URI;

  const metadata = data?.projectByHandle?.metadata;
  const videoURL = metadata?.['http://regen.network/videoURL']?.['@value'];
  const landStewardPhoto =
    metadata?.['http://regen.network/landStewardPhoto']?.['@value'];
  const unit: qudtUnit | undefined =
    metadata?.['http://regen.network/size']?.[
      'http://qudt.org/1.1/schema/qudt#unit'
    ]?.['@value'];
  const creditClass = data?.projectByHandle?.creditClassByCreditClassId;
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
    <Section classes={{ root: classes.section }}>
      <Grid container>
        <Grid item xs={12} md={8} className={classes.rightGrid}>
          {/* TODO Show on-chain project id if no off-chain name */}
          <Title variant="h1">{metadata?.['http://schema.org/name']}</Title>
          <div className={classes.projectPlace}>
            <ProjectPlaceInfo
              iconClassName={classes.icon}
              // TODO Format and show on-chain project location if no off-chain location
              place={metadata?.['http://schema.org/location']?.place_name}
              area={
                metadata?.['http://regen.network/size']?.[
                  'http://qudt.org/1.1/schema/qudt#numericValue'
                ]?.['@value']
              }
              areaUnit={unit && qudtUnitMap[unit]}
            />
            <div className={classes.creditClassInfo}>
              {creditClass && creditClassVersion && (
                <>
                  {creditClass.standard &&
                    creditClassVersion?.metadata?.[
                      'http://regen.network/standard'
                    ]?.['http://schema.org/name'] &&
                    creditClassVersion?.metadata?.[
                      'http://regen.network/standard'
                    ]?.['http://schema.org/url']?.['@value'] && (
                      <ProjectTopLink
                        label="standard"
                        name={
                          creditClassVersion?.metadata?.[
                            'http://regen.network/standard'
                          ]?.['http://schema.org/name']
                        }
                        url={
                          creditClassVersion?.metadata?.[
                            'http://regen.network/standard'
                          ]?.['http://schema.org/url']?.['@value']
                        }
                        onChainId={
                          creditClassVersion?.metadata?.[
                            'http://regen.network/standard'
                          ]?.['http://regen.network/onChainId']
                        }
                      />
                    )}
                  <ProjectTopLink
                    label={`credit class${
                      creditClass.standard ? ' (type)' : ''
                    }`}
                    name={creditClassVersion.name}
                    url={
                      creditClassVersion.metadata?.['http://schema.org/url']?.[
                        '@value'
                      ]
                    }
                    onChainId={
                      creditClassVersion?.metadata?.[
                        'http://regen.network/onChainId'
                      ]
                    }
                  />
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
            </div>
          </div>
          {geojson && isGISFile && glanceText && (
            <LazyLoad offset={50} once>
              <div className={classes.glanceCard}>
                <GlanceCard
                  text={glanceText}
                  imageStorageBaseUrl={imageStorageBaseUrl}
                  apiServerUrl={apiServerUrl}
                  geojson={geojson}
                  isGISFile={isGISFile}
                  mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
                />
              </div>
            </LazyLoad>
          )}
          {landStewardStoryTitle && (
            <Title className={classes.story} variant="h2">
              Story
            </Title>
          )}
          {landStory && (
            <Description className={classes.description}>
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
                  className={cx(classes.iframe, classes.media)}
                  title={metadata?.['http://schema.org/name'] || 'project'}
                  src={videoURL}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              ) : (
                <video className={classes.media} controls>
                  <source src={videoURL} />
                </video>
              ))}
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
                className={cx(classes.quote, classes.tagline)}
              >
                <span className={cx(classes.firstQuote, classes.quotes)}>
                  “
                </span>
                <span className={classes.textQuote}>
                  {quote['http://regen.network/quote']}
                </span>
                <span className={cx(classes.secondQuote, classes.quotes)}>
                  ”
                </span>
              </Title>
              <Title variant="h6" className={classes.quotePersonName}>
                {quote['http://schema.org/name']}
              </Title>
              <Description className={classes.quotePersonRole}>
                {quote['http://schema.org/jobTitle']}
              </Description>
            </div>
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
        <Grid item xs={12} md={4} className={classes.leftGrid}>
          <ProjectTopCard
            projectDeveloper={getDisplayParty(
              'http://regen.network/projectDeveloper',
              metadata,
              data?.projectByHandle?.partyByDeveloperId,
            )}
            landSteward={getDisplayParty(
              'http://regen.network/landSteward',
              metadata,
              data?.projectByHandle?.partyByStewardId,
            )}
            landOwner={getDisplayParty(
              'http://regen.network/landOwner',
              metadata,
              data?.projectByHandle?.partyByLandOwnerId,
            )}
            // TODO update graphql schema and change to use partyByIssuerId once registry-server PR merged
            issuer={getParty(data?.projectByHandle?.partyByBrokerId)}
            // TODO if no off-chain data, use on-chain project.issuer
            // issuer={getParty(data?.projectByHandle?.partyByIssuerId)}
            reseller={getParty(data?.projectByHandle?.partyByResellerId)}
            sdgs={sdgs}
          />
        </Grid>
      </Grid>
    </Section>
  );
}

export { ProjectTopSection };
