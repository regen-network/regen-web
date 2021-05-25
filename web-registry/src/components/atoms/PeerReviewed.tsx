import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ReactComponent as Ribbon } from '../../assets/svgs/yellow-ribbon.svg';

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    fontFamily: theme.typography.h1.fontFamily,
    fontSize: '9px', // theme.spacing(4) TODO: calculate these values using spacing. Hard to troubleshoot with chrome because of the nav disappearing
    lineHeight: '11.3px',
    letterSpacing: '1px',
    fontWeight: 800,
    color: theme.palette.info.main,
    textTransform: 'uppercase',
    marginLeft: theme.spacing(2),
  },
}));

/**
 * Icon with yellow ribbon and 'Peer Reviewed' label
 */
const PeerReviewed: React.FC = () => {
  const styles = useStyles();

  return (
    <>
      <Ribbon />
      <label className={styles.label}>
        Peer <br />
        Reviewed
      </label>
    </>
  );
};

export { PeerReviewed };
