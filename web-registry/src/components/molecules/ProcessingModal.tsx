import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';
import Modal, { RegenModalProps } from 'web-components/lib/components/modal';

interface Props extends RegenModalProps {
  pendingTx?: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      height: 458, //todo
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
}));

const ProcessingModal: React.FC<Props> = ({ open, onClose, pendingTx }) => {
  const styles = useStyles();

  return (
    <Modal className={styles.root} open={open} onClose={onClose}>
      Pending Tx: {pendingTx}
    </Modal>
  );
};

export { ProcessingModal };
