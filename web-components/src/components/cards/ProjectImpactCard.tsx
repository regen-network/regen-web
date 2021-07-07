import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Card from './Card';
import Title from '../title';
import Description from '../description';
import { Image } from '../image';

export interface ProjectImpactCardProps {
  className?: string;
  name: string;
  description: string;
  imgSrc: string;
  monitored?: boolean;
  standard?: string;
  apiServerUrl?: string;
  imageStorageBaseUrl?: string;
}

interface StyleProps {
  imgSrc: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  background: props => ({
    backgroundImage: `url(${props.imgSrc})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(59),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(50),
    },
  }),
  title: {
    color: theme.palette.primary.main,
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      left: theme.spacing(5),
      bottom: theme.spacing(6),
    },
    [theme.breakpoints.down('xs')]: {
      left: theme.spacing(4),
      bottom: theme.spacing(5),
    },
  },
  text: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4),
    },
  },
  tag: {
    position: 'absolute',
    top: theme.spacing(7.5),
    left: 0,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    fontWeight: 800,
    letterSpacing: '1px',
    fontFamily: theme.typography.h1.fontFamily,
    padding: theme.spacing(3),
    borderRadius: '0px 2px 2px 0px',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
  description: {
    fontSize: theme.typography.pxToRem(14),
  },
  image: {
  },
}));

export default function ProjectImpactCard({
  name,
  description,
  imgSrc,
  monitored = false,
  className,
  standard,
  imageStorageBaseUrl,
  apiServerUrl,
}: ProjectImpactCardProps): JSX.Element {
  const classes = useStyles({ imgSrc });

  return (
    <Card className={className}>
      <div className={classes.background}>
        <div className={classes.tag}>{monitored ? 'primary impact' : 'co-benefit'}</div>
        <Title variant="h4" className={classes.title}>
          {name}
        </Title>
      </div>
      <div className={classes.text}>
        <Description className={classes.description}>{description}</Description>
        {standard && (
          <Image
            className={classes.image}
            src={standard}
            alt={standard}
            imageStorageBaseUrl={imageStorageBaseUrl}
            apiServerUrl={apiServerUrl}
            width={140}
          />
        )}
      </div>
    </Card>
  );
}
