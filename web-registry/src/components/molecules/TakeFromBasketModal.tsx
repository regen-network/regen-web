import React from 'react';
import { makeStyles } from '@mui/styles';
import Modal, { RegenModalProps } from 'web-components/lib/components/modal';
import Title from 'web-components/lib/components/title';
import { CreditTakeForm } from 'web-components/lib/components/form/CreditTakeForm';
import useBasketTokens, { BasketTokens } from '../../hooks/useBasketTokens';
import { BasketCredit } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/types';

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

export interface TakeModalProps extends RegenModalProps {
  holder: string;
  batchDenom: string;
  availableTradableAmount: number;
}

const TakeFromBasketModal: React.FC<TakeModalProps> = ({
  holder,
  batchDenom,
  availableTradableAmount,
  open,
  onClose,
}) => {
  const styles = useStyles();
  if (!holder || !batchDenom) return null; //TODO

  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Title variant="h3" align="center" className={styles.mainTitle}>
        Take from Basket
      </Title>
      <CreditTakeForm
        holder={holder}
        availableTradableAmount={availableTradableAmount}
        batchDenom={batchDenom}
        onClose={onClose}
      />
    </Modal>
  );
};

export { TakeFromBasketModal };
