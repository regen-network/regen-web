import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import Card from './Card';
import Title from '../title';
import Description from '../description';

export interface ProjectImpactCardProps {
  className?: string;
  name: string;
  description: string;
  imgSrc: string;
  monitored?: boolean;
}

interface StyleProps {
  imgSrc: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    minWidth: theme.spacing(73),
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(97.75), // TODO: temporary shorter height until extra content is added. Should be theme.spacing(110.25)
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(86.25), // TODO: temporary shorter height until extra content is added. Should be theme.spacing(101)
    },
  },
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
}));

export default function ProjectImpactCard({
  name,
  description,
  imgSrc,
  monitored = false,
  className,
}: ProjectImpactCardProps): JSX.Element {
  const classes = useStyles({ imgSrc });

  return (
    <Card className={clsx(classes.root, className)}>
      <div className={classes.background}>
        <div className={classes.tag}>{monitored ? 'primary impact' : 'co-benefit'}</div>
        <Title variant="h4" className={classes.title}>
          {name}
        </Title>
      </div>
      <div className={classes.text}>
        <Description className={classes.description}>{description}</Description>
      </div>
    </Card>
  );
}
