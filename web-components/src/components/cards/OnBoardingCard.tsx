import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Card from './Card';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      margin: `${theme.spacing(9)} 0 ${theme.spacing(12)}`,
      padding: `${theme.spacing(13.5)} ${theme.spacing(10)} ${theme.spacing(12.5)}`,
    },
    [theme.breakpoints.down('xs')]: {
      margin: `${theme.spacing(6.5)} 0 ${theme.spacing(10)}`,
      padding: `${theme.spacing(8.5)} ${theme.spacing(2.5)} ${theme.spacing(10)}`,
    },
  },
}));

const OnBoardingCard: React.FC = ({ children }) => {
  const classes = useStyles();
  return <Card className={classes.root}>{children}</Card>;
};

export default OnBoardingCard;
