import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';

import { Theme } from 'web-components/lib/theme/muiTheme';

import { ReactComponent as Ribbon } from '../../assets/svgs/yellow-ribbon.svg';

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    fontFamily: theme.typography.h1.fontFamily,
    fontSize: '9px',
    lineHeight: '11.3px',
    letterSpacing: '1px',
    fontWeight: 800,
    color: theme.palette.info.main,
    textTransform: 'uppercase',
  },
}));

/**
 * Icon with yellow ribbon and 'Peer Reviewed' label
 */
const PeerReviewed: React.FC = () => {
  const styles = useStyles();

  return (
    <Box display="flex" flexWrap="nowrap" alignItems="center">
      <Box mr={1.5}>
        <Ribbon />
      </Box>
      <label className={styles.label}>
        Peer <br />
        Reviewed
      </label>
    </Box>
  );
};

export { PeerReviewed };
