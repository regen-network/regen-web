import React from 'react';
import { makeStyles } from '@mui/styles';
import Modal, { RegenModalProps } from '../modal';
import Title from '../title';
import { CreditSendForm } from '../form/CreditSendForm';

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

interface CreditSendModalProps extends RegenModalProps {
  sender: string;
  batchDenom: string;
}

const CreditSendModal: React.FC<CreditSendModalProps> = ({
  sender,
  batchDenom,
  open,
  onClose,
}) => {
  const styles = useStyles();

  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Title variant="h3" align="center" className={styles.mainTitle}>
        Send
      </Title>
      <CreditSendForm
        sender={sender}
        availableTradableAmount={1000}
        batchDenom={batchDenom}
        onClose={() => null}
      />
    </Modal>
  );
};

export { CreditSendModal };
