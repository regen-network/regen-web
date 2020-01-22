import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Title from '../title';
import CreditsIcon from '../icons/CreditsIcon';

interface CreditInfoProps {
  name: string;
  description: string;
  activities: string;
  background: string;
}

interface StyleProps {
  background: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    backgroundImage: `url("${props.background}")`,
    backgroundSize: 'cover',
    border: `1px solid ${theme.palette.info.light}`,
    borderRadius: '5px',
    padding: `${theme.spacing(11.5)} ${theme.spacing(5)}`,
    position: 'relative',
  }),
  topBar: {
    height: '10px',
    width: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    background: '#B9E1C7',
    borderRadius: '5px 5px 0px 0px',
  },
  descriptionContainer: {
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.375rem',
    },
  },
  description: {
    color: theme.palette.info.main,
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(11.75),
      fontSize: '1.375rem',
    },
    marginTop: theme.spacing(3.75),
  },
  activitiesContainer: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3.75),
    },
    '& h3': {
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(3.5),
      },
    },
  },
  activities: {
    fontSize: '0.875rem',
    color: theme.palette.info.main,
    marginTop: theme.spacing(4.5),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(9.5),
    },
  },
  icon: {
    marginRight: theme.spacing(2.5),
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      marginBottom: theme.spacing(2),
    },
    '& svg': {
      width: '3.125rem',
      height: '2.875rem',
      marginBottom: theme.spacing(-2),
    },
  },
}));

export default function CreditInfo({
  name,
  description,
  activities,
  background,
}: CreditInfoProps): JSX.Element {
  const classes = useStyles({ background });
  const theme = useTheme();

  return (
    <Grid container className={classes.root}>
      <div className={classes.topBar} />
      <Grid item xs={12} sm={8} className={classes.descriptionContainer}>
        <Title variant="h2">
          <span className={classes.icon}>
            <CreditsIcon color={theme.palette.secondary.main} />
          </span>
          {name}
        </Title>
        <Typography className={classes.description}>{description}</Typography>
      </Grid>
      <Grid item xs={12} sm={4} className={classes.activitiesContainer}>
        <Title variant="h3">Key activities and outcomes</Title>
        <Typography className={classes.activities}>{activities}</Typography>
      </Grid>
    </Grid>
  );
}
