import React from 'react';
import { makeStyles } from '@mui/styles';
import Modal, { RegenModalProps } from '../modal';
import Title from '../title';
import { CreditTransferForm } from '../form/CreditTransferForm';

const useStyles = makeStyles(theme => ({
  mainTitle: {
    paddingTop: 0,
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(12.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(6),
      paddingLeft: 0,
      paddingRight: 0,
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
  const sender = 'regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4';

  return (
    <Modal open={open} onClose={onClose}>
      <Title variant="h3" align="center" className={styles.mainTitle}>
        Transfer
      </Title>
      <CreditTransferForm
        sender={sender}
        tradableAmount={1000}
        batchDenom={'C01-20190101-20201010-02'}
        onClose={() => null}
      />
    </Modal>
  );
};

export { CreditTransferModal };
