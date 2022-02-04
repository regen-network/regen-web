import React from 'react';
import { makeStyles } from '@mui/styles';
import cx from 'clsx';

import Description from '../description';
import Title from '../title';
import Modal, { RegenModalProps } from '../modal';
import OutlinedButton from '../buttons/OutlinedButton';
import ShieldIcon from '../icons/ShieldIcon';
import CircularProgress from '@mui/material/CircularProgress';

// import Spinner from '../../theme/assets/svgs/spinner.svg';
// import { getHashUrl } from '../../lib/block-explorer';

// const Spinner = require('../../theme/assets/svgs/spinner.svg') as string;

interface Props extends RegenModalProps {
  txHash?: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      height: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4),
    },
  },
  spinner: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      lineHeight: theme.typography.pxToRem(44.8),
    },
    [theme.breakpoints.down('sm')]: {
      lineHeight: theme.typography.pxToRem(34.8),
    },
  },
  description: {
    padding: theme.spacing(0, 4),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16),
      marginBottom: theme.spacing(8),
    },
  },
  verticalSpacing: {
    marginBottom: theme.spacing(6),
  },
  button: {
    padding: theme.spacing(2, 6),
    fontSize: theme.typography.pxToRem(18),
  },
}));

const ProcessingModal: React.FC<Props> = ({ open, onClose, txHash }) => {
  const styles = useStyles();

  return (
    <Modal className={styles.root} open={open} onClose={onClose}>
      {/* <img
        className={cx(styles.verticalSpacing, styles.spinner)}
        src={Spinner}
        height={48}
        width={48}
        alt="processing"
      /> */}
      <CircularProgress
        className={cx(styles.verticalSpacing, styles.spinner)}
        sx={{ color: 'black' }}
      />
      <Title
        className={cx(styles.title, styles.verticalSpacing)}
        align="center"
        variant="h3"
      >
        Please wait while transaction processes
      </Title>
      <Description
        className={cx(styles.description, styles.verticalSpacing)}
        align="center"
      >
        This may take up to 10 minutes.
      </Description>
    </Modal>
  );
};

export { ProcessingModal };
