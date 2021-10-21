import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { BroadcastTxResponse } from '@cosmjs/stargate';

import Card from 'web-components/lib/components/cards/Card';
import Title from 'web-components/lib/components/title';
import Modal, { RegenModalProps } from 'web-components/lib/components/modal';
import { Label } from 'web-components/lib/components/label';

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
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
      paddingBottom: theme.spacing(20),
      height: theme.spacing(139),
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  card: {
    display: 'flex',
    padding: '29px 21px',
    width: '100%',
    height: 177,
    justifyContent: 'space-between',
  },
  iconContainer: {
    background: theme.palette.secondary.contrastText,
    width: theme.typography.pxToRem(54),
    height: theme.typography.pxToRem(54),
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  creditDetails: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 4),
  },
  classId: {
    color: theme.palette.info.main,
    fontSize: theme.typography.pxToRem(12),
  },
  creditDescription: {
    fontSize: theme.typography.pxToRem(14),
  },
  hash: {
    display: 'flex',
    alignItems: 'baseline',
    marginTop: theme.spacing(2),
    '& a': {
      fontSize: theme.typography.pxToRem(14),
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      fontWeight: 700,
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  hashLabel: {
    fontSize: theme.typography.pxToRem(12),
    marginRight: theme.spacing(4),
  },
  creditCount: {
    height: theme.typography.pxToRem(54),
    display: 'flex',
    alignItems: 'center',
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
      <Card className={styles.card}>
        <Avatar className={styles.iconContainer}>
          <img
            className={styles.icon}
            src={require(`../../assets/svgs/carbon-credit-fruit.svg`)}
            alt="eco-credit"
          />
        </Avatar>
        <div className={styles.creditDetails}>
          <Title variant="h6">Regen - Ecocredits</Title>
          <Label className={styles.classId}>C01-20190101-20201010-02</Label>
          <span className={styles.creditDescription}>
            Wilmot, Carbon<i>Plus</i> Grasslands Credits
          </span>
          <div className={styles.hash}>
            <Label className={styles.hashLabel}>hash: </Label>
            <a
              href={`${process.env.REACT_APP_BLOCK_EXPLORER}/txs/${data?.transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data?.transactionHash?.substring(0, 13).toLowerCase()}...
            </a>
          </div>
        </div>
        <Title className={styles.creditCount} align="center" variant="h3">
          500
        </Title>
      </Card>
    </Modal>
  );
};

export { ConfirmationModal };
