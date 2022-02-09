import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal, { RegenModalProps } from '../modal';
import Title from '../title';
import { CreditTransferForm } from '../form/CreditTransferForm';
import { CreditRetireForm } from '../form/CreditRetireForm';

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
  const [showRetire, setShowRetire] = useState<boolean>(false);

  const retireHandler = (): void => setShowRetire(prev => !prev);

  return (
    <Modal open={open} onClose={onClose}>
      <Title variant="h3" align="center" className={styles.mainTitle}>
        Transfer
      </Title>
      <CreditTransferForm
        sender={sender}
        available={{ amount: 1000, type: 'C01-20190101-20201010-02' }}
        onClose={() => null}
      >
        <FormControlLabel
          className={styles.retireCheckbox}
          control={
            <MuiCheckbox checked={showRetire} onChange={retireHandler} />
          }
          label={'Retire credits upon transfer'}
        />
      </CreditTransferForm>

      {showRetire && (
        <div className={styles.retireWrapper}>
          <CreditRetireForm
            sender={sender}
            available={{ amount: 1000, type: 'C01-20190101-20201010-02' }}
            onClose={() => null}
          />
        </div>
      )}
    </Modal>
  );
};

export { CreditTransferModal };
