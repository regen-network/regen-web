import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';
import Modal, { RegenModalProps } from 'web-components/lib/components/modal';

import spinner from './spinner.svg';

interface Props extends RegenModalProps {
  pendingTx?: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      height: 458, //todo
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  spinner: {
    marginTop: 19,
    marginBottom: theme.spacing(4),
  },
}));

const ProcessingModal: React.FC<Props> = ({ open, onClose, pendingTx }) => {
  const styles = useStyles();

  return (
    <Modal className={styles.root} open={open} onClose={onClose}>
      <img className={styles.spinner} src={spinner} height={48} width={48} alt="processing" />
      <span>Pending Tx: {pendingTx}</span>
    </Modal>
  );
};

export { ProcessingModal };
