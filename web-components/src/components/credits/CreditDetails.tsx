import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import ReactHtmlParser from 'react-html-parser';
import Typography from '@material-ui/core/Typography';

import Title from '../title';
import CreditsIcon from '../icons/CreditsIcon';

export interface Methodology {
  name: string;
}

export interface CreditClass {
  name: string;
  description: string;
  methodology?: Methodology;
  tag: string;
  imgSrc?: string;
  keyOutcomesActivitiesDesc?: string;
}

interface CreditInfoProps {
  creditClass: CreditClass;
  activities: string[];
  background?: string;
  title: string;
}

interface StyleProps {
  background?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    backgroundImage: props.background ? `url("${props.background}")` : 'transparent',
    backgroundSize: 'cover',
    border: props.background ? `1px solid ${theme.palette.info.light}` : 'none',
    borderRadius: props.background ? '5px' : 'none',
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
    color: theme.palette.info.dark,
    whiteSpace: 'pre-wrap',
    marginTop: theme.spacing(3.75),
    [theme.breakpoints.up('sm')]: {
      marginRight: props => (props.background ? theme.spacing(11.75) : 0),
      fontSize: '1.375rem',
    },
  },
  activities: {
    color: theme.palette.info.dark,
    margin: 0,
    paddingInlineStart: theme.spacing(2.5),
    listStyle: 'none',
    marginTop: theme.spacing(4.5),
  },
  activity: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    },
    display: 'flex',
    paddingBottom: theme.spacing(1.5),
  },
  bullet: {
    color: theme.palette.secondary.main,
    display: 'inline-block',
    marginLeft: '-0.6rem',
    fontSize: theme.spacing(2),
    paddingRight: theme.spacing(1.25),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1.75),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(1.25),
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
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: '0 !important',
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
  activitiesTitleContainer: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(7),
    },
  },
  activitiesTitle: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.125rem',
    },
  },
  activitiesDesc: {
    marginLeft: theme.spacing(-2.5),
    fontSize: theme.spacing(3.5),
    marginBottom: theme.spacing(1.25),
  },
}));

export default function CreditInfo({
  creditClass,
  activities,
  background,
  title,
}: CreditInfoProps): JSX.Element {
  const classes = useStyles({ background });
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.descriptionTitle}>
          <Title className={classes.title} variant="h3">
            <span className={classes.icon}>
              <CreditsIcon color={theme.palette.secondary.main} />
            </span>
            {creditClass.name}
          </Title>
        </div>
        <div className={classes.descriptionItem}>
          <Typography component="div" className={classes.description}>
            {ReactHtmlParser(creditClass.description)}
          </Typography>
        </div>
        <div className={classes.activitiesTitleContainer}>
          <Title className={classes.activitiesTitle} variant="h4">
            {title}
          </Title>
        </div>
        <div className={classes.activitiesItem}>
          <ul className={classes.activities}>
            {creditClass.keyOutcomesActivitiesDesc && (
              <Typography className={classes.activitiesDesc}>
                {creditClass.keyOutcomesActivitiesDesc}
              </Typography>
            )}
            {activities.map((activity, index) => (
              <Typography component="div" key={index} className={classes.activity}>
                <div className={classes.bullet}>•</div>
                <li>{activity}</li>
              </Typography>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
