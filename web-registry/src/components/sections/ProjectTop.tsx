import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ReactHtmlParser from 'react-html-parser';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import LazyLoad from 'react-lazyload';

import { Project, ProjectDefault } from '../../mocks';
import { Media } from 'web-components/lib/components/sliders/ProjectMedia';
import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';
import ProjectPlaceInfo from 'web-components/lib/components/place/ProjectPlaceInfo';
import GlanceCard from 'web-components/lib/components/cards/GlanceCard';
import Description from 'web-components/lib/components/description';
import ProjectTopCard from 'web-components/lib/components/cards/ProjectTopCard';
import ReadMore from 'web-components/lib/components/read-more';

interface ProjectTopProps {
  project: Project;
  projectDefault: ProjectDefault;
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
  creditClassLink: {
    fontWeight: 700,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(16),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
}));

export default function ProjectTop({
  project,
  projectDefault,
  geojson,
  isGISFile,
}: ProjectTopProps): JSX.Element {
  const classes = useStyles();

  const videos: Media | Media[] | undefined = project.media.filter(item => item.type === 'video');
  const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
  const apiServerUrl = process.env.REACT_APP_API_URI;

  return (
    <Section className={classes.section}>
      <Grid container>
        <Grid item xs={12} md={8} className={classes.rightGrid}>
          <Title variant="h1">{project.name}</Title>
          <div className={classes.projectPlace}>
            <ProjectPlaceInfo
              iconClassName={classes.icon}
              place={project.place}
              area={project.area}
              areaUnit={project.areaUnit}
            />
            <div className={classes.creditClassInfo}>
              <div className={classes.creditClassDetail}>
                <Title className={classes.creditClass} variant="h5">
                  credit class:
                </Title>
                <Link
                  className={classes.creditClassLink}
                  href={project.creditClass.pdfUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  color="secondary"
                >
                  {ReactHtmlParser(project.creditClass.name)}
                </Link>
              </div>
              <div className={classes.creditClassDetail}>
                <Title className={classes.creditClass} variant="h5">
                  methodology:
                </Title>
                <Link
                  className={classes.creditClassLink}
                  href={project.methodology.pdfUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  color="secondary"
                >
                  {ReactHtmlParser(project.methodology.name)}
                </Link>
              </div>
            </div>
          </div>
          {project.glanceImgSrc && project.glanceText && (
            <LazyLoad offset={50} once>
              <div className={classes.glanceCard}>
                <GlanceCard
                  imgSrc={project.glanceImgSrc}
                  text={project.glanceText}
                  imageStorageBaseUrl={imageStorageBaseUrl}
                  apiServerUrl={apiServerUrl}
                  geojson={geojson}
                  isGISFile={isGISFile}
                />
              </div>
            </LazyLoad>
          )}
          <Title className={classes.story} variant="h2">
            {project.fieldsOverride && project.fieldsOverride.story
              ? project.fieldsOverride.story.title
              : projectDefault.story.title}
          </Title>
          <Description className={classes.description}>
            {ReactHtmlParser(project.shortDescription)}
          </Description>
          <LazyLoad offset={50}>
            {videos.length > 0 &&
              (/https:\/\/www.youtube.com\/embed\/[a-zA-Z0-9_.-]+/.test(videos[0].src) ? (
                <iframe
                  className={clsx(classes.iframe, classes.media)}
                  title={project.name}
                  src={videos[0].src}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              ) : (
                <video className={classes.media} controls poster={videos[0].preview}>
                  <source src={videos[0].src} />
                </video>
              ))}
            {/* Show latest image for now */}
            {project.media.length > 4 && project.media[4].type === 'image' && (
              <img className={classes.media} alt={project.media[4].src} src={project.media[4].src} />
            )}
          </LazyLoad>
          <Title variant="h4" className={classes.tagline}>
            {project.tagline}
          </Title>
          <ReadMore maxLength={450} restMinLength={300}>
            {project.longDescription}
          </ReadMore>
          {project.quote && (
            <div>
              <Title variant="h4" className={clsx(classes.quote, classes.tagline)}>
                <span className={clsx(classes.firstQuote, classes.quotes)}>“</span>
                <span className={classes.textQuote}>{project.quote.text}</span>
                <span className={clsx(classes.secondQuote, classes.quotes)}>”</span>
              </Title>
              <Title variant="h6" className={classes.quotePersonName}>
                {project.quote.person.name}
              </Title>
              <Description className={classes.quotePersonRole}>{project.quote.person.role}</Description>
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={4} className={classes.leftGrid}>
          <ProjectTopCard
            projectDeveloper={project.developer}
            landSteward={project.steward}
            landOwner={project.owner}
            broker={project.broker}
            sdgs={project.sdgs}
          />
        </Grid>
      </Grid>
    </Section>
  );
}
