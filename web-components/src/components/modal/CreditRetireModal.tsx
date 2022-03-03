import React from 'react';
import { makeStyles } from '@mui/styles';
import Modal, { RegenModalProps } from '.';
import Title from '../title';
import { CreditRetireForm } from '../form/CreditRetireForm';

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
    paddingBottom: theme.spacing(7.5),
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

interface CreditRetireModalProps extends RegenModalProps {
  holder: string;
  batchDenom: string;
}

const CreditRetireModal: React.FC<CreditRetireModalProps> = ({
  holder,
  batchDenom,
  open,
  onClose,
}) => {
  const styles = useStyles();

  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Title variant="h3" align="center" className={styles.mainTitle}>
        Retire Credits
      </Title>
      <CreditRetireForm
        holder={holder}
        availableTradableAmount={1000}
        batchDenom={batchDenom}
        onClose={() => null}
      />
    </Modal>
  );
};

export { CreditRetireModal };
