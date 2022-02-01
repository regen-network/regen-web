import React from 'react';
import { makeStyles, useTheme, DefaultTheme as Theme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Card from './Card';

interface CreditCardProps {
  number: number;
  description: string;
  date?: Date | string;
  icon: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: theme.spacing(8.75),
    paddingBottom: theme.spacing(7.75),
    paddingRight: theme.spacing(4.5),
    paddingLeft: theme.spacing(4.5),
  },
  iconContainer: {
    backgroundColor: theme.palette.secondary.light,
    height: theme.spacing(22.25),
    width: theme.spacing(22.25),
    borderRadius: '50%',
    margin: '0 auto',
    textAlign: 'center',
  },
  icon: {
    height: '100%',
  },
  number: {
    fontWeight: 900,
    fontSize: '2rem',
    fontFamily: theme.typography.h1.fontFamily,
    textAlign: 'center',
    paddingTop: theme.spacing(4.5),
  },
  description: {
    fontWeight: 800,
    fontSize: '0.875rem',
    fontFamily: theme.typography.h1.fontFamily,
    textAlign: 'center',
    color: theme.palette.info.main,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    paddingTop: theme.spacing(2),
  },
  date: {
    textAlign: 'center',
    color: theme.palette.info.main,
    paddingTop: theme.spacing(0.75),
    fontSize: '0.875rem',
    fontWeight: 400,
  },
}));

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

export default function CreditCard({
  number,
  description,
  date,
  icon,
}: CreditCardProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();
  return (
    <Card
      borderRadius="10px"
      borderColor={theme.palette.grey[100]}
      elevation={1}
      height="100%"
    >
      <div className={classes.container}>
        <div className={classes.iconContainer}>
          <Grid
            className={classes.icon}
            container
            alignItems="center"
            justifyContent="center"
          >
            {icon}
          </Grid>
        </div>
        <div className={classes.number}>
          {new Intl.NumberFormat('en-US').format(number)}
        </div>
        <div className={classes.description}>{description}</div>
        {date && (
          <div className={classes.date}>
            {new Date(date).toLocaleDateString('en-US', options)}
          </div>
        )}
      </div>
    </Card>
  );
}
