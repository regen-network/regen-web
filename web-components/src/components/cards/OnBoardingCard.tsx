import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

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

type Props = { className?: string };
const OnBoardingCard: React.FC<Props> = ({ children, className }) => {
  const classes = useStyles();
  return <Card className={clsx(classes.root, className)}>{children}</Card>;
};

export default OnBoardingCard;
