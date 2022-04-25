import React from 'react';
import { makeStyles, DefaultTheme as Theme, useTheme } from '@mui/styles';
import ReactHtmlParser from 'react-html-parser';

import { Body, Title } from '../typography';
import CreditsIcon from '../icons/CreditsIcon';
import { Box } from '@mui/material';

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
            <Body
              size="xl"
              sx={{ mt: 3.75, mr: { sm: background ? 11.75 : 0 } }}
            >
              {ReactHtmlParser(creditClass.description)}
            </Body>
          </div>
        )}
        <div className={classes.activitiesTitleContainer}>
          <Title variant="h4" mobileVariant="h6" sx={{ mt: [null, 3.5] }}>
            {title}
          </Title>
        </div>
        <div className={classes.activitiesItem}>
          <Box component="ul" sx={{ m: 0, mt: 4.5, paddingInlineStart: 0 }}>
            {creditClass.keyOutcomesActivitiesDesc && (
              <Body
                size="xl"
                sx={theme => ({
                  ml: theme.spacing(-2.5),
                  mb: theme.spacing(1.25),
                })}
              >
                {creditClass.keyOutcomesActivitiesDesc}
              </Body>
            )}
            {activities.map((activity, index) => (
              <Body key={index} size="lg" mobileSize="sm">
                <li>{activity}</li>
              </Body>
            ))}
          </Box>
        </div>
      </div>
    </div>
  );
}
