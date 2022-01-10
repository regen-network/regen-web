import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Typography from '@mui/material/Typography';

import OutlinedButton from '../buttons/OutlinedButton';
import EyeIcon from '../icons/EyeIcon';
import MediaCard from './MediaCard';
import { parseText } from '../../utils/textParser';

export interface ResourcesCardProps {
  image: { publicURL: string };
  title: JSX.Element | string;
  updated?: string;
  description: JSX.Element | string;
  buttonText?: string | null;
  link: string;
  target?: string;
  backgroundGradient?: boolean;
  titleOverwrite?: boolean;
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
    [theme.breakpoints.down('sm')]: {
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
    letterSpacing: theme.spacing(0.25),
    fontWeight: 800,
  },
  lastUpdated: {
    lineHeight: theme.spacing(3.75),
    color: theme.palette.info.main,
    fontSize: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(1.25),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(2.75),
    },
  },
  description: {
    marginTop: theme.spacing(2),
    color: theme.palette.info.dark,
    lineHeight: '150%',
    '& p': {
      margin: 0,
    },
  },
  button: {
    display: 'inherit',
    border: '2px solid #4FB573',
    '& .MuiButton-label': {
      textAlign: 'center',
      display: 'flex',
    },
    [theme.breakpoints.up('sm')]: {
      width: 'fit-content',
      minWidth: theme.spacing(63.75),
      marginBottom: theme.spacing(7.5),
      marginTop: theme.spacing(5),
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      width: '100%',
      marginBottom: theme.spacing(7.5),
      marginTop: theme.spacing(3.5),
    },
  },
  eyeIcon: {
    height: theme.spacing(3.455),
    marginRight: theme.spacing(1.25),
    marginBottom: theme.spacing(-0.5),
  },
  buttonWrapper: {
    [theme.breakpoints.down('sm')]: {
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
  buttonText = 'view resource',
  link,
  target = '_blank',
  backgroundGradient = true,
  titleOverwrite = true,
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
      titleOverwrite={titleOverwrite}
    >
      <div className={classes.text}>
        {updated && (
          <Typography className={classes.lastUpdated}>
            <span className={classes.lastUpdatedLabel}>Last Updated: </span>
            {updated}
          </Typography>
        )}
        {description && (
          <Typography className={classes.description} component="div">
            {parseText(description)}
          </Typography>
        )}
      </div>
      <div className={classes.buttonWrapper}>
        <OutlinedButton target={target} href={link} className={classes.button}>
          <EyeIcon className={classes.eyeIcon} />
          <span>{buttonText}</span>
        </OutlinedButton>
      </div>
    </MediaCard>
  );
}
