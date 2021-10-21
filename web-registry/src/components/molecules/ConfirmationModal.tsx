import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BroadcastTxResponse } from '@cosmjs/stargate';

import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';
import Modal, { RegenModalProps } from 'web-components/lib/components/modal';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import ShieldIcon from 'web-components/lib/components/icons/ShieldIcon';

interface Props extends RegenModalProps {
  data?: BroadcastTxResponse;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      height: theme.spacing(139),
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
}));

const ConfirmationModal: React.FC<Props> = ({ open, onClose, data }) => {
  const styles = useStyles();

  return (
    <Modal className={styles.root} open={open} onClose={onClose}>
      <img src={require('../../assets/cow-illustration.png')} alt="cows celebrating" />
      <Title align="center" variant="h3">
        Congrats! Your purchase was successful.
      </Title>
      <Description align="center">{data?.transactionHash}</Description>
      {data?.transactionHash && (
        <OutlinedButton
          href={`${process.env.REACT_APP_LEDGER_EXPLORER}/txs/${data?.transactionHash}`}
          target="_blank"
          startIcon={<ShieldIcon />}
        >
          view on regen ledger
        </OutlinedButton>
      )}
    </Modal>
  );
};

export { ConfirmationModal };
