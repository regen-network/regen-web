import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from './Card';
import Title from '../title';
import Image, { OptimizeImageProps } from '../image';

interface GlanceCardProps extends OptimizeImageProps {
  title?: string;
  text: string[];
  imgSrc: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textTransform: 'uppercase',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(5.25),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      fontSize: theme.spacing(3.5),
    },
    marginBottom: theme.spacing(2.75),
  },
  container: {
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4.5),
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
    // marginTop: theme.spacing(4.5),
  },
  text: {
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
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
      [theme.breakpoints.down('xs')]: {
        top: theme.spacing(1.25),
      },
    },
  },
  textContainer: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(8.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(4.5),
    },
  },
  image: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '5px',
    objectFit: 'cover',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      height: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(51),
    },
  },
  root: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      border: 'none',
    },
  },
}));

export default function GlanceCard({
  title = 'At a glance',
  text,
  imgSrc,
  imageStorageBaseUrl,
  apiServerUrl,
}: GlanceCardProps): JSX.Element {
  const classes = useStyles({});

  return (
    <Card className={classes.root}>
      <Grid className={classes.container} container>
        <Grid xs={12} sm={5} item>
          <Image
            className={classes.image}
            src={imgSrc}
            alt={imgSrc}
            imageStorageBaseUrl={imageStorageBaseUrl}
            apiServerUrl={apiServerUrl}
          />
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
