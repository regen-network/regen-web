import React from 'react';
import { makeStyles } from '@mui/styles';
import Modal, { RegenModalProps } from '.';
import Title from '../title';
import { CreditRetireForm } from '../form/CreditRetireForm';

const useStyles = makeStyles(theme => ({
  modal: {
    padding: `${theme.spacing(10.75)} ${theme.spacing(7.5)} ${theme.spacing(
      12.5,
    )}`,
    maxWidth: theme.spacing(140),
  },
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

const CreditRetireModal: React.FC<RegenModalProps> = ({ open, onClose }) => {
  const styles = useStyles();
  // TODO Harcoded holder
  const holder = 'regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4';

  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Title variant="h3" align="center" className={styles.mainTitle}>
        Retire
      </Title>
      <CreditRetireForm
        holder={holder}
        availableTradableAmount={1000}
        batchDenom={'C01-20190101-20201010-02'}
        onClose={() => null}
      />
    </Modal>
  );
};

export { CreditRetireModal };
