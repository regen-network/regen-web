import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RegenIcon from '../icons/RegenIcon';

const useStyles = makeStyles(theme => {
  const { pxToRem } = theme.typography;
  return {
    icon: {
      height: 'auto',
      width: pxToRem(186),
      [theme.breakpoints.down('sm')]: {
        width: pxToRem(111),
      },
      [theme.breakpoints.down('xs')]: {
        width: pxToRem(104),
      },
    },
  };
});

export const HeaderLogoLink: React.FC<{ color: string }> = ({ color }) => {
  const styles = useStyles();
  return (
    <a href="/">
      <RegenIcon className={styles.icon} color={color} />
    </a>
  );
};
