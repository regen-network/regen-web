import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';
import Modal, { RegenModalProps } from 'web-components/lib/components/modal';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import ShieldIcon from 'web-components/lib/components/icons/ShieldIcon';

interface Props extends RegenModalProps {
  txHash?: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      height: theme.spacing(114.5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  spinner: {
    marginTop: theme.spacing(4.75),
    marginBottom: theme.spacing(4),
  },
}));

const ProcessingModal: React.FC<Props> = ({ open, onClose, txHash }) => {
  const styles = useStyles();

  return (
    <Modal className={styles.root} open={open} onClose={onClose}>
      <img
        className={styles.spinner}
        src={require('../../assets/svgs/spinner.svg')}
        height={48}
        width={48}
        alt="processing"
      />
      <Title align="center" variant="h3">
        Please wait while transaction processes
      </Title>
      <Description align="center">
        This may take up to 10 minutes. Meanwhile, feel free to continue browsing the marketplace.
      </Description>
      {txHash && ( //TODO: CosmJs acutally doesn't return a transactionHash until the tx is complete, so this may never be seen.
        <OutlinedButton
          href={`${process.env.REACT_APP_LEDGER_EXPLORER}/txs/${txHash}`}
          target="_blank"
          startIcon={<ShieldIcon />}
        >
          view on regen ledger
        </OutlinedButton>
      )}
    </Modal>
  );
};

export { ProcessingModal };
