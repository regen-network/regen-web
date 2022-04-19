import React from 'react';
import { makeStyles, DefaultTheme as Theme, useTheme } from '@mui/styles';
import ReactHtmlParser from 'react-html-parser';
import Typography from '@mui/material/Typography';

import { BodyText, Title } from '../typography';
import CreditsIcon from '../icons/CreditsIcon';

interface CreditInfoProps {
  creditClass: CreditClass;
  activities: string[];
  background?: string;
  title: string;
}

interface CreditClass {
  name: string;
  tag: string;
  description: string;
  keyOutcomesActivitiesDesc: string;
}

interface StyleProps {
  background?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    backgroundImage: props.background
      ? `url("${props.background}")`
      : 'transparent',
    backgroundSize: 'cover',
    border: props.background
      ? `1px solid ${theme.palette.secondary.contrastText}`
      : 'none',
    borderRadius: props.background ? '5px' : 'none',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(14.5)} ${theme.spacing(8)} ${theme.spacing(
        18,
      )}`,
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(14)} ${theme.spacing(5)} ${theme.spacing(
        11.5,
      )}`,
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
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(1.25),
    },
  },
  icon: {
    marginRight: theme.spacing(2.5),
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(7),
    },
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
          <Title variant="h3">
            <span className={classes.icon}>
              <CreditsIcon color={theme.palette.secondary.main} />
            </span>
            {creditClass.name}
          </Title>
        </div>
        {creditClass.description && (
          <div className={classes.descriptionItem}>
            <Typography component="div" className={classes.description}>
              {ReactHtmlParser(creditClass.description)}
            </Typography>
          </div>
        )}
        <div className={classes.activitiesTitleContainer}>
          <Title variant="h4" mobileVariant="h6" sx={{ mt: [null, 3.5] }}>
            {title}
          </Title>
        </div>
        <div className={classes.activitiesItem}>
          <ul className={classes.activities}>
            {creditClass.keyOutcomesActivitiesDesc && (
              <BodyText
                size="xl"
                sx={theme => ({
                  ml: theme.spacing(-2.5),
                  mb: theme.spacing(1.25),
                })}
              >
                {creditClass.keyOutcomesActivitiesDesc}
              </BodyText>
            )}
            {activities.map((activity, index) => (
              <Typography
                component="div"
                key={index}
                className={classes.activity}
              >
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
