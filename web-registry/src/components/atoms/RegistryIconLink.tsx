import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

import RegenMarketIcon from 'web-components/lib/components/icons/RegenMarketIcon';

const useStyles = makeStyles(theme => {
  const { pxToRem } = theme.typography;
  return {
    icon: {
      height: 'auto',
      width: pxToRem(117),
      [theme.breakpoints.down('md')]: {
        width: pxToRem(70),
      },
      [theme.breakpoints.down('sm')]: {
        width: pxToRem(62),
      },
    },
  };
});

export const RegistryIconLink: React.FC<{ color: string }> = ({ color }) => {
  const styles = useStyles();
  return (
    <Link to="/">
      <RegenMarketIcon className={styles.icon} color={color} />
    </Link>
  );
};
