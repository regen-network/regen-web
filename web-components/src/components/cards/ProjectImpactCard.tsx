import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Card from './Card';
import Title from '../title';
import Description from '../description';

export interface ProjectImpactCardProps {
  name: string;
  description: string;
  imgSrc: string;
  monitored?: boolean;
}

interface StyleProps {
  imgSrc: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  background: props => ({
    backgroundImage: `url(${props.imgSrc})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    backgroundPosition: 'center',
    textAlign: 'center',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(81),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(50),
    },
  }),
  title: {
    color: theme.palette.primary.main,
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      left: theme.spacing(7),
      bottom: theme.spacing(8),
    },
    [theme.breakpoints.down('xs')]: {
      left: theme.spacing(5),
      bottom: theme.spacing(6),
    },
  },
  text: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(7),
      paddingLeft: theme.spacing(7),
      paddingRight: theme.spacing(7),
      paddingBottom: theme.spacing(15),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(5),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      paddingBottom: theme.spacing(10),
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
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
  },
}));

export default function ProjectImpactCard({
  name,
  description,
  imgSrc,
  monitored = false,
}: ProjectImpactCardProps): JSX.Element {
  const classes = useStyles({ imgSrc });

  return (
    <Card>
      <div className={classes.background}>
        <div className={classes.tag}>{monitored ? 'primary impact' : 'co-benefit'}</div>
        <Title variant="h3" className={classes.title}>
          {name}
        </Title>
      </div>
      <div className={classes.text}>
        <Description className={classes.description}>{description}</Description>
      </div>
    </Card>
  );
}
