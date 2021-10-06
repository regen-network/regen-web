import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Modal, { RegenModalProps } from 'web-components/lib/components/modal';
import { BuyCreditsForm, BuyCreditsValues } from './BuyCreditsForm';

interface BuyCreditsModalProps extends RegenModalProps {
  onClose: () => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    borderRadius: theme.spacing(2),
  },
  title: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 900,
  },
  btn: {
    marginTop: theme.spacing(4),
    width: '100%',
  },
  cardContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

const BuyCreditsModal: React.FC<BuyCreditsModalProps> = ({ open, onClose }) => {
  const styles = useStyles();

  const submit = async (values: BuyCreditsValues): Promise<void> => {
    console.log('submit ', values);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <BuyCreditsForm submit={submit} />
    </Modal>
  );
};

export { BuyCreditsModal };
