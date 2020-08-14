import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import Img from 'gatsby-image';
import Typography from '@material-ui/core/Typography';

import OutlinedButton from '../buttons/OutlinedButton';
import EyeIcon from '../icons/EyeIcon';
import MediaCard from './MediaCard';
import Title from '../title';

export interface ResourcesCardProps {
  image: any;
  title: string;
  updated: string;
  description: string;
  buttonText: string;
  link: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: theme.spacing(91.75),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: `1px solid ${theme.palette.grey[100]}`,
  },
  text: {
    flex: '1 0 auto',
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
  lastUpdatedLabel: {
    textTransform: 'uppercase',
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
    display: 'inherit',
    marginBottom: theme.spacing(7.5),
    border: '2px solid #4FB573',
  },
  eyeIcon: {
    height: theme.spacing(3.455),
    marginRight: theme.spacing(1.25),
  },
  buttonWrapper: {},
}));

export default function ResourcesCard({
  image,
  title,
  updated,
  description,
  buttonText,
}: ResourcesCardProps): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <MediaCard
      className={classes.root}
      name={title}
      imgSrc={image.publicURL}
      borderRadius="10px"
      elevation={1}
    >
      <div className={classes.text}>
        <Typography className={classes.lastUpdated}>
          <span className={classes.lastUpdatedLabel}>Last Updated: </span>
          {updated}
        </Typography>
        {description && <Typography className={classes.description}>{description}</Typography>}
      </div>
      <div className={classes.buttonWrapper}>
        <OutlinedButton className={classes.button}>
          <EyeIcon className={classes.eyeIcon} />
          {buttonText}
        </OutlinedButton>
      </div>
    </MediaCard>
  );
}
