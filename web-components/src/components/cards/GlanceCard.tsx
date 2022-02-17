import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from './Card';
import Title from '../title';
import StaticMap from '../map/StaticMap';
import { Image, OptimizeImageProps } from '../image';

interface GlanceCardProps extends OptimizeImageProps {
  title?: string;
  text: string[];
  imgSrc?: string;
  geojson?: any;
  isGISFile?: Boolean;
  mapboxToken?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textTransform: 'uppercase',
    marginBottom: theme.spacing(2.75),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3.5),
    },
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap-reverse',
      padding: theme.spacing(6, 4.5),
    },
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap',
      padding: 0,
    },
  },
  texts: {
    color: theme.palette.info.dark,
    margin: 0,
    paddingInlineStart: theme.spacing(2),
    listStyle: 'none',
  },
  text: {
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    '& li': {
      position: 'relative',
    },
    '& li::before': {
      content: "'\\2022'",
      fontSize: '0.5rem',
      color: theme.palette.secondary.main,
      display: 'inline-block',
      width: '1em',
      marginLeft: '-1em',
      position: 'absolute',
      [theme.breakpoints.up('sm')]: {
        top: theme.spacing(2),
      },
      [theme.breakpoints.down('sm')]: {
        top: theme.spacing(1.25),
      },
    },
  },
  textContainer: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(8.25),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(4.5),
    },
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      height: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(51),
    },
  },
  root: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      border: 'none',
    },
  },
  mapWrapper: {
    height: theme.spacing(49.25),
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '5px',
    overflow: 'hidden',
  },
}));

export default function GlanceCard({
  title = 'At a glance',
  text,
  imgSrc,
  imageStorageBaseUrl,
  apiServerUrl,
  geojson,
  isGISFile,
  mapboxToken,
}: GlanceCardProps): JSX.Element {
  const classes = useStyles({});

  return (
    <Card className={classes.root}>
      <Grid className={classes.container} container>
        <Grid xs={12} sm={5} item>
          <div className={classes.mapWrapper}>
            {geojson && isGISFile ? (
              <StaticMap geojson={geojson} mapboxToken={mapboxToken} />
            ) : (
              imgSrc && (
                <Image
                  className={classes.image}
                  src={imgSrc}
                  alt={imgSrc}
                  imageStorageBaseUrl={imageStorageBaseUrl}
                  apiServerUrl={apiServerUrl}
                />
              )
            )}
          </div>
        </Grid>
        <Grid xs={12} sm={7} item className={classes.textContainer}>
          <Title variant="h6" className={classes.title}>
            {title}
          </Title>
          <ul className={classes.texts}>
            {text.map((p, i) => (
              <Typography key={i} className={classes.text}>
                <li>{p}</li>
              </Typography>
            ))}
          </ul>
        </Grid>
      </Grid>
    </Card>
  );
}
