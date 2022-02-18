import React from 'react';
import { makeStyles } from '@mui/styles';
import Modal, { RegenModalProps } from '../modal';
import Title from '../title';
import { CreditTransferForm } from '../form/CreditTransferForm';

const useStyles = makeStyles(theme => ({
  modal: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(10.75)} ${theme.spacing(7.5)} ${theme.spacing(
        12.5,
      )}`,
      maxWidth: theme.spacing(140),
    },
  },
  mainTitle: {
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(12.5),
    },
  },
  retireCheckbox: {
    paddingTop: theme.spacing(10.75),
  },
  retireWrapper: {
    paddingTop: theme.spacing(10.75),
  },
}));

const CreditTransferModal: React.FC<RegenModalProps> = ({ open, onClose }) => {
  const styles = useStyles();
  // TODO Harcoded sender
  const sender = 'regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4';

  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Title variant="h3" align="center" className={styles.mainTitle}>
        Transfer
      </Title>
      <CreditTransferForm
        sender={sender}
        availableTradableAmount={1000}
        batchDenom={'C01-20190101-20201010-02'}
        onClose={() => null}
      />
    </Modal>
  );
};

export { CreditTransferModal };
