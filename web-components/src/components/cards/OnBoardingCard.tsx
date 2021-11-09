import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

import Card from './Card';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(9, 0, 12),
      padding: theme.spacing(13.5, 10, 12.5),
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(6.5, 0, 10),
      padding: theme.spacing(8.5, 2.5, 10),
    },
  },
}));

type Props = { className?: string };
const OnBoardingCard: React.FC<Props> = ({ children, className }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Card
      borderColor={theme.palette.grey[100]}
      className={clsx(classes.root, className)}
    >
      {children}
    </Card>
  );
};

export default OnBoardingCard;
