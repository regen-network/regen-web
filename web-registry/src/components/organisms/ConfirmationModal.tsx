import React from 'react';
import { makeStyles } from '@mui/styles';
import { Avatar } from '@mui/material';
import { BroadcastTxResponse } from '@cosmjs/stargate';
import cx from 'clsx';

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
    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
      paddingBottom: theme.spacing(20),
      height: theme.spacing(139),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(8, 4),
    },
  },
  cows: {
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(20),
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      lineHeight: theme.typography.pxToRem(44.8),
    },
    [theme.breakpoints.down('sm')]: {
      lineHeight: theme.typography.pxToRem(34.8),
    },
  },
  card: {
    display: 'flex',
    padding: theme.spacing(7.25, 5.25),
    width: '100%',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(44.25),
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(57.5),
    },
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
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
      height: theme.typography.pxToRem(54),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
  verticalSpacing: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(6),
    },
  },
  hideIfMobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  hideIfDesktop: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

const ConfirmationModal: React.FC<Props> = ({ open, onClose, data }) => {
  const styles = useStyles();

  return (
    <Modal className={styles.root} open={open} onClose={onClose}>
      <img
        className={cx(styles.cows, styles.verticalSpacing)}
        src={require('../../assets/cow-illustration.png')}
        alt="cows celebrating"
      />
      <Title
        className={cx(styles.title, styles.verticalSpacing)}
        align="center"
        variant="h3"
      >
        Congrats! Your purchase was successful.
      </Title>
      <Card className={cx(styles.card, styles.verticalSpacing)}>
        <Avatar className={styles.iconContainer}>
          <img
            className={styles.icon}
            src={require(`../../assets/svgs/carbon-credit-fruit.svg`)}
            alt="eco-credit"
          />
        </Avatar>
        <div className={styles.creditDetails}>
          <Title
            className={(styles.creditCount, styles.hideIfDesktop)}
            variant="h3"
          >
            500
          </Title>
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
        <Title
          className={cx(styles.creditCount, styles.hideIfMobile)}
          align="center"
          variant="h3"
        >
          500
        </Title>
      </Card>
    </Modal>
  );
};

export { ConfirmationModal };
