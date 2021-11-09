import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ReactHtmlParser from 'react-html-parser';
import Link from '@material-ui/core/Link';
import cx from 'clsx';
import LazyLoad from 'react-lazyload';

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
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(6.5),
      paddingBottom: theme.spacing(20.5),
    },
  },
  tagline: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4.5),
    },
    lineHeight: '150%',
    position: 'relative',
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(5.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
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
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
      paddingTop: theme.spacing(4),
    },
  },
  quotePersonRole: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
  projectPlace: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
    },
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(8.5),
      marginBottom: theme.spacing(8.5),
    },
  },
  iframe: {
    border: 'none',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(109.5),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(55.25),
    },
  },
  story: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(14),
      paddingBottom: theme.spacing(7.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(11.75),
      paddingBottom: theme.spacing(3.75),
    },
  },
  quote: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  quotes: {
    color: theme.palette.secondary.main,
    lineHeight: 0,
    zIndex: 0,
    position: 'absolute',
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
      left: theme.spacing(-3.75),
    },
    [theme.breakpoints.up('sm')]: {
      left: theme.spacing(-4.5),
    },
  },
  secondQuote: {
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(6.25),
    },
  },
  icon: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1),
    },
    [theme.breakpoints.down('xs')]: {
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
    position: 'relative',
  },
  creditClassName: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(16),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  creditClassLink: {
    fontWeight: 700,
  },
  arrowIcon: {
    height: theme.spacing(3.5),
  },
  arrowLink: {
    position: 'absolute',
    top: theme.spacing(0.5),
  },
}));

function ProjectTopLink({
  label,
  name,
  url,
  standard = false,
}: {
  label: string;
  name: string;
  url?: string;
  standard?: boolean;
}): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.creditClassDetail}>
      <Title className={classes.creditClass} variant="h5">
        {label}:
      </Title>
      {url ? (
        standard ? (
          <div className={cx(classes.creditClassName, classes.darkText)}>
            {ReactHtmlParser(name)}
            <Link
              className={classes.arrowLink}
              href={url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ArrowIcon
                className={classes.arrowIcon}
                direction="next"
                color={theme.palette.secondary.main}
              />
            </Link>
          </div>
        ) : (
          <Link
            className={cx(classes.creditClassName, classes.creditClassLink)}
            href={url}
            rel="noopener noreferrer"
            target="_blank"
            color="secondary"
          >
            {ReactHtmlParser(name)}
          </Link>
        )
      ) : (
        <div className={cx(classes.creditClassName, classes.darkText)}>
          {ReactHtmlParser(name)}
        </div>
      )}
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
  const unit: qudtUnit =
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
          <Title variant="h1">{metadata?.['http://schema.org/name']}</Title>
          <div className={classes.projectPlace}>
            <ProjectPlaceInfo
              iconClassName={classes.icon}
              place={metadata?.['http://schema.org/location']?.place_name}
              area={
                metadata?.['http://regen.network/size']?.[
                  'http://qudt.org/1.1/schema/qudt#numericValue'
                ]?.['@value']
              }
              areaUnit={qudtUnitMap[unit]}
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
                        standard={creditClass.standard}
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
                    standard={creditClass.standard}
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
                  standard={creditClass.standard}
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
                />
              </div>
            </LazyLoad>
          )}
          <Title className={classes.story} variant="h2">
            Story
          </Title>
          <Description className={classes.description}>
            {ReactHtmlParser(metadata?.['http://regen.network/landStory'])}
          </Description>
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
                  title={metadata?.['http://schema.org/name']}
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
          <Title variant="h4" className={classes.tagline}>
            {metadata?.['http://regen.network/landStewardStoryTitle']}
          </Title>
          <ReadMore maxLength={450} restMinLength={300}>
            {metadata?.['http://regen.network/landStewardStory'] || ''}
          </ReadMore>
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
            broker={getParty(data?.projectByHandle?.partyByBrokerId)}
            reseller={getParty(data?.projectByHandle?.partyByResellerId)}
            sdgs={sdgs}
          />
        </Grid>
      </Grid>
    </Section>
  );
}

export { ProjectTopSection };
