import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Title from '../title';
import CreditsIcon from '../icons/CreditsIcon';

interface CreditInfoProps {
  name: string;
  description: string;
  activities: string[];
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
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(14.5)} ${theme.spacing(8)} ${theme.spacing(18)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(14)} ${theme.spacing(5)} ${theme.spacing(11.5)}`,
    },
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
  description: {
    color: theme.palette.info.main,
    whiteSpace: 'pre-wrap',
    marginTop: theme.spacing(3.75),
    [theme.breakpoints.up('sm')]: {
      // marginRight: theme.spacing(11.75),
      fontSize: '1.375rem',
    },
  },
  activitiesContainer: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(7),
    },
    '& h3': {
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(3.5),
        height: '6.25rem',
      },
    },
  },
  activities: {
    color: theme.palette.info.main,
    margin: 0,
    paddingInlineStart: theme.spacing(4),
    listStyle: 'none',
    marginTop: theme.spacing(4.5),
  },
  activity: {
    fontSize: '0.875rem',
    paddingBottom: theme.spacing(1.5),
    '& li::before': {
      content: "'\\2022'",
      color: theme.palette.secondary.main,
      display: 'inline-block',
      width: '1em',
      marginLeft: '-1em',
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
  container: {
    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      gridTemplateColumns: '66% 33%',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  descriptionTitle: {
    [theme.breakpoints.up('sm')]: {
      gridColumnStart: 1,
      gridColumnEnd: 2,
      gridRowStart: 1,
      gridRownEnd: 2,
      paddingRight: theme.spacing(10),
      '& h2': {
        marginBottom: '0 !important',
      },
    },
  },
  descriptionItem: {
    [theme.breakpoints.up('sm')]: {
      gridColumnStart: 1,
      gridColumnEnd: 2,
      gridRowStart: 2,
      gridRownEnd: 3,
      paddingRight: theme.spacing(10),
    },
  },
  activitiesTitle: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(7),
    },
    '& h3': {
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(3.5),
      },
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
    <div className={classes.root}>
      <div className={classes.topBar} />
      <div className={classes.container}>
        <div className={classes.descriptionTitle}>
          <Title variant="h2">
            <span className={classes.icon}>
              <CreditsIcon color={theme.palette.secondary.main} />
            </span>
            {name}
          </Title>
        </div>
        <div className={classes.descriptionItem}>
          <Typography className={classes.description}>{description}</Typography>
        </div>
        <div className={classes.activitiesTitle}>
          <Title variant="h3">Key activities and outcomes</Title>
        </div>
        <div className={classes.activitiesItem}>
          <ul className={classes.activities}>
            {activities.map((activity, index) => (
              <Typography key={index} className={classes.activity}>
                <li>{activity}</li>
              </Typography>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
