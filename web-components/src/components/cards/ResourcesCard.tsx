import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Card from './Card';
import Img from 'gatsby-image';
import Title from '../title';
import Typography from '@material-ui/core/Typography';
import OutlinedButton from '../buttons/OutlinedButton';
import EyeIcon from '../icons/EyeIcon';

export interface ResourcesCardProps {
  image: any;
  title: string;
  updated: string;
  description: string;
  buttonText: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: theme.spacing(114.25),
    width: theme.spacing(91.75),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: `1px solid ${theme.palette.grey[100]}`,
  },
  text: {
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(6)} ${theme.spacing(5)} ${theme.spacing(10)}`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
      paddingBottom: theme.spacing(6),
      '& h4': {
        lineHeight: '145%',
        marginBottom: theme.spacing(1.75),
      },
    },
  },
  img: {
    width: '100%',
    height: '45%',
    display: 'block',
  },
  lastUpdatedLabel: {
    textTransform: 'capitalize',
    fontWeight: 800,
  },
  lastUpdated: {
    lineHeight: theme.spacing(3.75),
    color: theme.palette.info.main,
    fontSize: theme.spacing(3),
    letterSpacing: theme.spacing(0.25),
    marginBottom: theme.spacing(2),
  },
  description: {
    color: theme.palette.info.dark,
    lineHeight: '150%',
    marginBottom: theme.spacing(6),
  },
  button: {
    marginBottom: theme.spacing(7.5),
  },
  eyeIcon: {
    height: theme.spacing(3.455),
    marginRight: theme.spacing(1.25),
  },
}));

export default function ResourcesCard({
  image,
  title,
  updated,
  description,
  buttonText,
}: ResourcesCardProps): JSX.Element {
  const classes = useStyles();

  return (
    <Card width="350px" className={classes.root} borderRadius="10px" elevation={1}>
      <Img style={{ width: '100%', height: '45%', display: 'block' }} fixed={image} />
      <div className={classes.text}>
        <Title variant="h4" align="left">
          {title}
        </Title>
        <Typography className={classes.lastUpdated}>
          <span className={classes.lastUpdatedLabel}>Last Updated: </span>
          {updated}
        </Typography>
        <Typography className={classes.description}>{description}</Typography>
        <OutlinedButton className={classes.button} border="2px solid #4FB573">
          <EyeIcon className={classes.eyeIcon} />
          {buttonText}
        </OutlinedButton>
      </div>
    </Card>
  );
}
