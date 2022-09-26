import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Grid from '@mui/material/Grid';
import { DefaultTheme as Theme, makeStyles, withStyles } from '@mui/styles';
import {
  GetTxResponse,
  ServiceClientImpl,
} from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import clsx from 'clsx';

import { parseText } from '../../utils/textParser';
import ContainedButton from '../buttons/ContainedButton';
import BreadcrumbIcon from '../icons/BreadcrumbIcon';
import DropdownIcon from '../icons/DropdownIcon';
import InfoIcon from '../icons/InfoIcon';
import RegenLedgerIcon from '../icons/RegenLedgerIcon';
import Tooltip from '../tooltip';
import { Title } from '../typography';
import { User } from '../user/UserInfo';
import Modal, { RegenModalProps } from './index';

export interface Party extends User {
  role: string;
  individual: string;
  address: string;
}

export interface Item {
  label: string;
  value?: JSX.Element | string;
}

interface LedgerModalProps extends RegenModalProps {
  summary: Item[];
  txClient?: ServiceClientImpl;
  txHash?: string;
  link?: string;
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
  root: {
    maxWidth: theme.spacing(175),
  },
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
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(2.75),
      lineHeight: theme.spacing(3.5),
    },
  },
  summaryItem: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(6.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(4.5),
    },
  },
  blockchainItem: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(6.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(5),
    },
  },
  blockchainLabel: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3),
      lineHeight: theme.spacing(3.75),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(2.5),
      lineHeight: theme.spacing(3.25),
    },
  },
  hr: {
    border: `1px solid ${theme.palette.grey[100]}`,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(6),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
    },
  },
  blockchain: {
    color: theme.palette.secondary.main,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
    },
  },
  ledgerIcon: {
    width: theme.spacing(34),
    height: theme.spacing(15.25),
    textAlign: 'center',
  },
  marginLeft: {
    marginLeft: theme.spacing(2.5),
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
    background:
      'linear-gradient(180deg, rgba(250, 250, 250, 0) 0%, #FAFAFA 100%)',
    height: theme.spacing(15.15),
  },
  ledgerIconContainer: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(9.25),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(6.25),
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(9.5),
    },
    [theme.breakpoints.down('sm')]: {
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
      paddingLeft: theme.spacing(7.5),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(-1),
      paddingLeft: theme.spacing(3.75),
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
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3.5),
    },
  },
  blockchainValue: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
    },
  },
  blockchainData: {
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(1),
    },
  },
  button: {
    float: 'right',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(12.5),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(7.5),
      fontSize: theme.spacing(3.5),
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
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(1.25),
      paddingBottom: theme.spacing(1.25),
    },
  },
  logs: {
    backgroundColor: theme.palette.primary.main,
    maxHeight: theme.spacing(88),
    fontSize: theme.spacing(3.5),
    padding: theme.spacing(4),
    marginTop: theme.spacing(3.5),
    border: `1px solid ${theme.palette.grey[600]}`,
    overflowY: 'scroll',
  },
}));

const numberFormat = new Intl.NumberFormat('en-US');

function SummaryItem({ item }: { item: Item }): JSX.Element {
  const classes = useStyles();

  return (
    <>
      {item.value ? (
        <Grid container className={classes.summaryItem}>
          <Grid
            className={clsx(classes.label, classes.summaryLabel)}
            xs={4}
            item
          >
            {item.label}
          </Grid>
          <Grid
            xs={8}
            className={clsx(classes.value, classes.summaryValue)}
            item
          >
            {parseText(item.value)}
          </Grid>
        </Grid>
      ) : null}
    </>
  );
}
export default function LedgerModal({
  summary,
  link,
  party,
  handleBack,
  txClient,
  txHash,
  ...props
}: LedgerModalProps): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [txRes, setTxRes] = useState<GetTxResponse | undefined>();

  useEffect(() => {
    if (txClient && txHash) {
      txClient
        .GetTx({
          hash: txHash,
        })
        .then(setTxRes)
        // eslint-disable-next-line no-console
        .catch(console.error);
    }
  }, [txClient, txHash]);

  const handleClick = (): void => {
    setOpen(prevOpen => !prevOpen);
  };

  return (
    <Modal {...props} className={classes.root}>
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
          <SummaryItem
            item={{ label: 'individual', value: party.individual }}
          />
          <SummaryItem item={{ label: 'role', value: party.role }} />
          <SummaryItem
            item={{ label: 'account address', value: party.address }}
          />
          <SummaryItem item={{ label: 'location', value: party.location }} />
          {party.description && (
            <SummaryItem
              item={{ label: 'description', value: party.description }}
            />
          )}
        </>
      ) : (
        <>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            className={classes.title}
          >
            <Title variant="h5" mr={2.5}>
              Summary
            </Title>
            <CustomTooltip
              arrow
              placement="top"
              title={ReactHtmlParser(
                'This summary section includes <b>off-chain data</b> (data residing in a centralized database) and <b>blockchain data</b> stored on the Regen Ledger. Blockchain data is only on devnet, see more details on devnet below.',
              )}
            >
              <span>
                <InfoIcon />
              </span>
            </CustomTooltip>
          </Grid>
          {summary.map((item: Item, index: number) => (
            <SummaryItem key={index} item={item} />
          ))}
          <hr className={classes.hr} />
          {txRes && txRes.tx && txRes.txResponse && (
            <>
              <Grid container wrap="nowrap" className={classes.blockchainTitle}>
                <Grid item container alignItems="center">
                  <div
                    className={clsx(
                      classes.label,
                      classes.blockchain,
                      classes.marginLeft,
                    )}
                  >
                    blockchain data (devnet)
                  </div>
                  <CustomTooltip
                    arrow
                    placement="top"
                    title={ReactHtmlParser(
                      '<b>Blockchain (Regen Ledger):</b> These credits exist only on our devnet and should not be treated as actual legal title to the credits. Credits subject to change until deployed on our Mainnet.',
                    )}
                  >
                    <span>
                      <InfoIcon />
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
                className={
                  open
                    ? classes.blockchainData
                    : clsx(classes.blockchainData, classes.collapsed)
                }
              >
                <Grid container className={classes.blockchainItem}>
                  <Grid
                    className={clsx(classes.label, classes.blockchainLabel)}
                    xs={4}
                    item
                  >
                    hash
                  </Grid>
                  <Grid
                    xs={8}
                    item
                    className={clsx(classes.value, classes.blockchainValue)}
                  >
                    {txRes.txResponse.txhash}
                  </Grid>
                </Grid>
                <Grid container className={classes.blockchainItem}>
                  <Grid
                    className={clsx(classes.label, classes.blockchainLabel)}
                    xs={4}
                    item
                  >
                    height
                  </Grid>
                  <Grid
                    xs={8}
                    item
                    className={clsx(classes.value, classes.blockchainValue)}
                  >
                    {numberFormat.format(txRes.txResponse.height.low)}
                  </Grid>
                </Grid>
                <Grid container className={classes.blockchainItem}>
                  <Grid
                    className={clsx(classes.label, classes.blockchainLabel)}
                    xs={4}
                    item
                  >
                    status
                  </Grid>
                  <Grid
                    xs={8}
                    item
                    className={clsx(classes.value, classes.blockchainValue)}
                  >
                    {txRes.txResponse.code === 0 && (
                      <span className={classes.success}>success</span>
                    )}
                  </Grid>
                </Grid>
                {txRes.txResponse.timestamp && (
                  <Grid container className={classes.blockchainItem}>
                    <Grid
                      className={clsx(classes.label, classes.blockchainLabel)}
                      xs={4}
                      item
                    >
                      timestamp
                    </Grid>
                    <Grid
                      xs={8}
                      item
                      className={clsx(classes.value, classes.blockchainValue)}
                    >
                      {txRes.txResponse.timestamp}
                    </Grid>
                  </Grid>
                )}
                <Grid container className={classes.blockchainItem}>
                  <Grid
                    className={clsx(classes.label, classes.blockchainLabel)}
                    xs={4}
                    item
                  >
                    memo
                  </Grid>
                  <Grid
                    xs={8}
                    item
                    className={clsx(classes.value, classes.blockchainValue)}
                  >
                    {(txRes.tx.body && txRes.tx.body.memo) || '-'}
                  </Grid>
                </Grid>
                <Grid container className={classes.blockchainItem}>
                  <Grid
                    className={clsx(classes.label, classes.blockchainLabel)}
                    xs={4}
                    item
                  >
                    transaction fee
                  </Grid>
                  <Grid
                    xs={8}
                    item
                    className={clsx(classes.value, classes.blockchainValue)}
                  >
                    {txRes.tx.authInfo &&
                    txRes.tx.authInfo.fee &&
                    txRes.tx.authInfo.fee.amount &&
                    txRes.tx.authInfo.fee.amount.length
                      ? `${numberFormat.format(
                          parseFloat(txRes.tx.authInfo.fee.amount[0].amount),
                        )} ${txRes.tx.authInfo.fee.amount[0].denom}`
                      : '0'}
                  </Grid>
                </Grid>
                <Grid container className={classes.blockchainItem}>
                  <Grid
                    className={clsx(classes.label, classes.blockchainLabel)}
                    xs={12}
                    sm={4}
                    item
                  >
                    transaction data
                  </Grid>
                  <Grid
                    xs={12}
                    sm={8}
                    item
                    className={clsx(
                      classes.logs,
                      classes.value,
                      classes.blockchainValue,
                    )}
                  >
                    {ReactHtmlParser(
                      JSON.stringify(txRes.txResponse.logs, null, 2)
                        .replace(/\n/g, '<br>')
                        .replace(/[ ]/g, '&nbsp;'),
                    )}
                  </Grid>
                </Grid>
                {open ? null : <div className={classes.gradient} />}
              </div>
              {link && (
                <ContainedButton
                  href={link}
                  target="_blank"
                  className={classes.button}
                >
                  review on regen ledger
                </ContainedButton>
              )}
            </>
          )}
        </>
      )}
    </Modal>
  );
}
