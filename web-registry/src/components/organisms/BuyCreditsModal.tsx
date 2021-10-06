import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Modal, { RegenModalProps } from 'web-components/lib/components/modal';

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

  return (
    <Modal open={open} onClose={onClose}>
      hi
    </Modal>
  );
};

export { BuyCreditsModal };
