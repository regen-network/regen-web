import React, { useState } from 'react';
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import ReactHtmlParser from 'react-html-parser';
import { GetTxResponse } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';

import Modal, { RegenModalProps } from './index';
import RegenLedgerIcon from '../icons/RegenLedgerIcon';
import InfoIcon from '../icons/InfoIcon';
import DropdownIcon from '../icons/DropdownIcon';
import ContainedButton from '../buttons/ContainedButton';
import Title from '../title';
import { Party } from '../party/PartyAddress';
import Tooltip from '../tooltip';
import BreadcrumbIcon from '../icons/BreadcrumbIcon';

interface Item {
  label: string;
  value: JSX.Element | string;
}

interface LedgerModalProps extends RegenModalProps {
  summary: Item[];
  txRes: GetTxResponse;
  link: string;
  party: Party | null;
  handleBack: () => void;
}

const CustomTooltip: any = withStyles((theme: Theme) => ({
  tooltip: {
    background: theme.palette.primary.main,
    fontSize: theme.spacing(3.5),
    paddingTop: theme.spacing(6.25),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(8.5),
    paddingRight: theme.spacing(8.5),
  },
}))(Tooltip);

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    fontFamily: theme.typography.h1.fontFamily,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 800,
    color: theme.palette.info.dark,
  },
  summaryLabel: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
      lineHeight: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(2.75),
      lineHeight: theme.spacing(3.5),
    },
  },
  summaryItem: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(6.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(4.5),
    },
  },
  blockchainItem: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(6.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(5),
    },
  },
  blockchainLabel: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3),
      lineHeight: theme.spacing(3.75),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(2.5),
      lineHeight: theme.spacing(3.25),
    },
  },
  hr: {
    border: `1px solid ${theme.palette.grey[100]}`,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(6),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3),
    },
  },
  blockchain: {
    color: theme.palette.secondary.main,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
  ledgerIcon: {
    width: theme.spacing(34),
    height: theme.spacing(15.25),
    textAlign: 'center',
  },
  infoIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing(2.5),
    cursor: 'pointer',
  },
  dropdownIcon: {
    width: theme.spacing(3.25),
    height: theme.spacing(2.5),
    cursor: 'pointer',
  },
  collapsed: {
    overflow: 'hidden',
    maxHeight: theme.spacing(15.15),
  },
  gradient: {
    position: 'absolute',
    top: theme.spacing(4),
    width: '100%',
    background: 'linear-gradient(180deg, rgba(250, 250, 250, 0) 0%, #FAFAFA 100%)',
    height: theme.spacing(15.15),
  },
  ledgerIconContainer: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(9.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(6.25),
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(9.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(7.5),
    },
  },
  blockchainTitle: {
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(6.25),
  },
  value: {
    overflowWrap: 'break-word',
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.info.dark,
    lineHeight: '150%',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(-1.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(-1),
    },
  },
  back: {
    fontSize: theme.spacing(3),
    fontFamily: theme.typography.h1.fontFamily,
    color: theme.palette.secondary.main,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontWeight: 800,
    lineHeight: theme.spacing(4.5),
    position: 'absolute',
    top: theme.spacing(16),
    cursor: 'pointer',
  },
  icon: {
    height: theme.spacing(2.25),
    width: theme.spacing(3.75),
    marginRight: theme.spacing(2.25),
  },
  summaryValue: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    },
  },
  blockchainValue: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
  blockchainData: {
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(1),
    },
  },
  button: {
    float: 'right',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(12.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(7.5),
    },
  },
  success: {
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.secondary.contrastText,
    borderRadius: '5px',
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(1.25),
      paddingBottom: theme.spacing(1.25),
    },
  },
  logs: {
    backgroundColor: theme.palette.primary.main,
    maxHeight: theme.spacing(88),
    fontSize: theme.spacing(3.5),
    padding: theme.spacing(4),
    border: `1px solid ${theme.palette.grey[600]}`,
    overflow: 'scroll',
  },
}));

const numberFormat = new Intl.NumberFormat('en-US');

function SummaryItem({ item }: { item: Item }): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container className={classes.summaryItem}>
      <Grid className={clsx(classes.label, classes.summaryLabel)} xs={4} item>
        {item.label}
      </Grid>
      <Grid xs={8} className={clsx(classes.value, classes.summaryValue)} item>
        {item.value}
      </Grid>
    </Grid>
  );
}
export default function LedgerModal({
  summary,
  txRes,
  link,
  party,
  handleBack,
  ...props
}: LedgerModalProps): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClick = (): void => {
    setOpen(prevOpen => !prevOpen);
  };

  return (
    <Modal {...props}>
      <div className={classes.ledgerIconContainer}>
        <RegenLedgerIcon className={classes.ledgerIcon} />
      </div>
      {party ? (
        <>
          <div className={classes.back} onClick={handleBack}>
            <BreadcrumbIcon className={classes.icon} direction="prev" />
            back
          </div>
          <Title align="center" variant="h5" className={classes.title}>
            Entity Information
          </Title>
          <SummaryItem item={{ label: 'organization', value: party.name }} />
          <SummaryItem item={{ label: 'role', value: party.role }} />
          <SummaryItem item={{ label: 'individual', value: party.individual }} />
          <SummaryItem item={{ label: 'address', value: party.address }} />
          <SummaryItem item={{ label: 'location', value: party.location }} />
          <SummaryItem item={{ label: 'description', value: party.description }} />
        </>
      ) : (
        <>
          <Grid container alignItems="center" justify="center" className={classes.title}>
            <Title variant="h5">Summary</Title>
            <CustomTooltip
              arrow
              placement="top"
              title={ReactHtmlParser(
                'This summary section includes <b>off-chain data</b> (data residing in a centralized database) and <b>blockchain data</b> stored on the Regen Ledger.',
              )}
            >
              <span>
                <InfoIcon className={classes.infoIcon} />
              </span>
            </CustomTooltip>
          </Grid>
          {summary.map((item: Item, index: number) => (
            <SummaryItem key={index} item={item} />
          ))}
          <hr className={classes.hr} />
          {txRes.tx && txRes.txResponse && (
            <>
              <Grid container wrap="nowrap" className={classes.blockchainTitle}>
                <Grid item container alignItems="center">
                  <div className={clsx(classes.label, classes.blockchain)}>blockchain data</div>
                  <CustomTooltip
                    arrow
                    placement="top"
                    title={ReactHtmlParser('<b>Blockchain data:</b> data stored on the Regen Ledger.')}
                  >
                    <span>
                      <InfoIcon className={classes.infoIcon} />
                    </span>
                  </CustomTooltip>
                </Grid>
                <Grid item>
                  <DropdownIcon
                    onClick={handleClick}
                    direction={open ? 'up' : 'down'}
                    className={classes.dropdownIcon}
                  />
                </Grid>
              </Grid>
              <div
                className={open ? classes.blockchainData : clsx(classes.blockchainData, classes.collapsed)}
              >
                <Grid container className={classes.blockchainItem}>
                  <Grid className={clsx(classes.label, classes.blockchainLabel)} xs={4} item>
                    hash
                  </Grid>
                  <Grid xs={8} item className={clsx(classes.value, classes.blockchainValue)}>
                    {txRes.txResponse.txhash}
                  </Grid>
                </Grid>
                <Grid container className={classes.blockchainItem}>
                  <Grid className={clsx(classes.label, classes.blockchainLabel)} xs={4} item>
                    height
                  </Grid>
                  <Grid xs={8} item className={clsx(classes.value, classes.blockchainValue)}>
                    {numberFormat.format(txRes.txResponse.height.low)}
                  </Grid>
                </Grid>
                <Grid container className={classes.blockchainItem}>
                  <Grid className={clsx(classes.label, classes.blockchainLabel)} xs={4} item>
                    status
                  </Grid>
                  <Grid xs={8} item className={clsx(classes.value, classes.blockchainValue)}>
                    {txRes.txResponse.code === 0 && <span className={classes.success}>success</span>}
                  </Grid>
                </Grid>
                <Grid container className={classes.blockchainItem}>
                  <Grid className={clsx(classes.label, classes.blockchainLabel)} xs={4} item>
                    timestamp
                  </Grid>
                  <Grid xs={8} item className={clsx(classes.value, classes.blockchainValue)}>
                    {txRes.txResponse.timestamp}
                  </Grid>
                </Grid>
                <Grid container className={classes.blockchainItem}>
                  <Grid className={clsx(classes.label, classes.blockchainLabel)} xs={4} item>
                    memo
                  </Grid>
                  <Grid xs={8} item className={clsx(classes.value, classes.blockchainValue)}>
                    {(txRes.tx.body && txRes.tx.body.memo) || '-'}
                  </Grid>
                </Grid>
                <Grid container className={classes.blockchainItem}>
                  <Grid className={clsx(classes.label, classes.blockchainLabel)} xs={4} item>
                    transaction fee
                  </Grid>
                  <Grid xs={8} item className={clsx(classes.value, classes.blockchainValue)}>
                    {txRes.tx.authInfo &&
                    txRes.tx.authInfo.fee &&
                    txRes.tx.authInfo.fee.amount &&
                    txRes.tx.authInfo.fee.amount.length
                      ? `${numberFormat.format(parseFloat(txRes.tx.authInfo.fee.amount[0].amount))} ${
                          txRes.tx.authInfo.fee.amount[0].denom
                        }`
                      : '-'}
                  </Grid>
                </Grid>
                <Grid container className={classes.blockchainItem}>
                  <Grid className={clsx(classes.label, classes.blockchainLabel)} xs={4} item>
                    transaction data
                  </Grid>
                  <Grid xs={8} item className={clsx(classes.logs, classes.value, classes.blockchainValue)}>
                    {ReactHtmlParser(
                      JSON.stringify(txRes.txResponse.logs, null, 2)
                        .replace(/\n/g, '<br>')
                        .replace(/[ ]/g, '&nbsp;'),
                    )}
                  </Grid>
                </Grid>
                {open ? null : <div className={classes.gradient} />}
              </div>
              <ContainedButton href={link} target="_blank" className={classes.button}>
                review on regen ledger
              </ContainedButton>
            </>
          )}
        </>
      )}
    </Modal>
  );
}
