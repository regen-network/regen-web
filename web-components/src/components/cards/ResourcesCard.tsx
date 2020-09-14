import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import OutlinedButton from '../buttons/OutlinedButton';
import EyeIcon from '../icons/EyeIcon';
import MediaCard from './MediaCard';

export interface ResourcesCardProps {
  image: { publicURL: string };
  title: string;
  updated?: string;
  description: string;
  buttonText: string;
  link: string;
  target?: string;
  backgroundGradient?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: `1px solid ${theme.palette.grey[100]}`,
  },
  text: {
    flex: '1 0 auto',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      paddingTop: 'unset',
      paddingBottom: 'unset',
    },
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(5.25),
      paddingLeft: theme.spacing(5.25),
      paddingBottom: 'unset',
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
  },
  description: {
    marginTop: theme.spacing(2),
    color: theme.palette.info.dark,
    lineHeight: '150%',
  },
  button: {
    display: 'inherit',
    border: '2px solid #4FB573',
    '& .MuiButton-label': {
      textAlign: 'center',
    },
    [theme.breakpoints.up('sm')]: {
      width: 'fit-content',
      marginBottom: theme.spacing(7.5),
      marginTop: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0 auto',
      width: '100%',
      marginBottom: theme.spacing(3.5),
      marginTop: theme.spacing(3.5),
    },
  },
  eyeIcon: {
    height: theme.spacing(3.455),
    marginRight: theme.spacing(1.25),
  },
  buttonWrapper: {
    [theme.breakpoints.down('xs')]: {
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
  },
}));

export default function ResourcesCard({
  image,
  title,
  updated,
  description,
  buttonText,
  link,
  target = '_blank',
  backgroundGradient = true,
}: ResourcesCardProps): JSX.Element {
  const classes = useStyles();
  return (
    <MediaCard
      className={classes.root}
      name={title}
      imgSrc={image.publicURL}
      borderRadius="10px"
      elevation={1}
      backgroundGradient={backgroundGradient}
    >
      <div className={classes.text}>
        {updated && (
          <Typography className={classes.lastUpdated}>
            <span className={classes.lastUpdatedLabel}>Last Updated: </span>
            {updated}
          </Typography>
        )}
        {description && <Typography className={classes.description}>{description}</Typography>}
      </div>
      <div className={classes.buttonWrapper}>
        <OutlinedButton target={target} href={link} className={classes.button}>
          <EyeIcon className={classes.eyeIcon} />
          {buttonText}
        </OutlinedButton>
      </div>
    </MediaCard>
  );
}
