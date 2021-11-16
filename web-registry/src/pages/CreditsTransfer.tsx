import React, { useState } from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Title from 'web-components/lib/components/title';
import { pluralize } from 'web-components/lib/utils/pluralize';
import {
  Party,
  // AccountBalance,
  TransactionState,
  useAllCreditVintagesQuery,
  useAllPartiesQuery,
  useGetAvailableCreditsQuery,
  useTransferCreditsMutation,
} from '../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    padding: theme.spacing(1),
  },
  form: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  button: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(87),
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

interface Balance {
  liquidBalance: string;
  id: string;
  walletId: string;
}

interface Result {
  oldBalance: string;
  newBalance: string;
  name: string;
  walletId: string;
}

const CreditsTransfer: React.FC<{
  addressId?: string;
  buyerWalletId?: string;
  onTransfer?: (vintageId: string) => void;
}> = ({
  onTransfer,
  addressId: passedAddressId,
  buyerWalletId: passedBuyerWalletId = '',
}) => {
  const styles = useStyles();

  const [transferCredits, { data, loading, error }] =
    useTransferCreditsMutation({
      errorPolicy: 'ignore',
    });
  const {
    data: vintagesData,
    loading: vintagesLoading,
    error: vintagesError,
    refetch: refetchVintages,
  } = useAllCreditVintagesQuery({
    errorPolicy: 'ignore',
  });

  const {
    data: partiesData,
    loading: partiesLoading,
    error: partiesError,
  } = useAllPartiesQuery({
    errorPolicy: 'ignore',
  });

  const dateFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'numeric',
    day: '2-digit',
  });

  const [vintageId, setVintageId] = useState('');
  const [oldBalances, setOldBalances] = useState<Balance[]>([]);
  const [buyerWalletId, setBuyerWalletId] = useState(passedBuyerWalletId);
  const [addressId, setAddressId] = useState(passedAddressId);
  const [partyId, setPartyId] = useState('');
  const [userId, setUserId] = useState('');
  const [units, setUnits] = useState(1);
  const [creditPrice, setCreditPrice] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const { data: availableCreditsData, refetch: refetchAvailableCredits } =
    useGetAvailableCreditsQuery({
      errorPolicy: 'ignore',
      variables: { vintageId },
    });

  const handleVintageChange = (event: SelectChangeEvent<string>): void => {
    if (showResult) {
      setShowResult(false);
    }
    const vintageId = event.target.value;
    setVintageId(vintageId);
    refetchAvailableCredits({ vintageId });
    const vintages = vintagesData?.allCreditVintages?.nodes?.find(
      node => node?.id === event.target.value,
    );
    const balances = vintages?.accountBalancesByCreditVintageId?.nodes;
    if (balances && balances.length > 0) {
      setOldBalances(balances as Balance[]);
    }
  };

  const handleBuyerWalletChange = (event: SelectChangeEvent<string>): void => {
    if (showResult) {
      setShowResult(false);
    }
    setBuyerWalletId(event.target.value);
    if (partiesData && partiesData.allParties) {
      const selectedParty = partiesData.allParties.nodes.find(
        (party: any) => party.walletId === event.target.value,
      );
      setAddressId(selectedParty?.addressId);
    }
  };

  const handlePartyIdChange = (event: SelectChangeEvent<string>): void => {
    if (showResult) {
      setShowResult(false);
    }
    setPartyId(event.target.value);
  };

  const handleUserIdChange = (event: SelectChangeEvent<string>): void => {
    if (showResult) {
      setShowResult(false);
    }
    setUserId(event.target.value);
  };

  if (vintagesLoading || partiesLoading) return <div>Loading...</div>;
  if (vintagesError) return <div>Error! ${vintagesError.message}</div>;
  if (partiesError) return <div>Error! ${partiesError.message}</div>;

  let newBalances: Balance[];
  let sendersBalances: Result[] = [];
  let receiverBalance: Result | undefined;
  let vintage: any;
  if (
    partiesData &&
    partiesData.allParties &&
    vintagesData &&
    vintagesData.allCreditVintages &&
    vintageId
  ) {
    vintage = vintagesData.allCreditVintages.nodes.find(
      (node: any) => node.id === vintageId,
    );
    newBalances = vintage.accountBalancesByCreditVintageId.nodes;

    // TODO: type coersion below shouldn't be necessary, but there's some discrepency between our
    // generated types. This is just adding TS types to the existing code and
    // shouldn't create new bugs, but might bet worth removing the type coersion and
    // fixing in the future
    const findOldBalance = (i: number): Balance | undefined =>
      oldBalances.find(oldBalance => oldBalance.id === newBalances[i].id);
    const findParty = (i: number): Party | undefined =>
      partiesData?.allParties?.nodes.find(
        party => party?.walletId === newBalances[i].walletId,
      ) as Party;

    // Build response list of senders/buyer old/new balance
    for (var i: number = 0; i < newBalances.length; i++) {
      const oldBalance = findOldBalance(i);
      const party = findParty(i);
      if (party) {
        if (
          oldBalance &&
          parseFloat(oldBalance.liquidBalance) >
            parseFloat(newBalances[i].liquidBalance)
        ) {
          // sender
          sendersBalances.push({
            walletId: party.walletId,
            name: party.name,
            oldBalance: oldBalance.liquidBalance,
            newBalance: newBalances[i].liquidBalance,
          });
        } else if (party.walletId === buyerWalletId) {
          // buyer
          receiverBalance = {
            walletId: party.walletId,
            name: party.name,
            oldBalance:
              oldBalance && oldBalance.liquidBalance
                ? oldBalance.liquidBalance
                : '0',
            newBalance: newBalances[i].liquidBalance,
          };
        }
      }
    }
  }

  return (
    <Box p={5}>
      <Title variant="h1">Transfer Credits</Title>
      <form
        className={styles.form}
        onSubmit={async e => {
          e.preventDefault();
          const confirmAlert = window.confirm(
            'Are you sure you want to transfer credits?',
          );
          if (confirmAlert) {
            try {
              await transferCredits({
                variables: {
                  input: {
                    addressId,
                    buyerWalletId,
                    creditPrice,
                    partyId,
                    units,
                    userId,
                    vintageId,
                    autoRetire: false,
                    txState: TransactionState.Succeeded,
                  },
                },
              });
              await refetchVintages();
              await refetchAvailableCredits();
              if (onTransfer) {
                onTransfer(vintageId);
              }
              setShowResult(true);
              const vintage = vintagesData?.allCreditVintages?.nodes?.find(
                node => node?.id === vintageId,
              );
              const balances = vintage?.accountBalancesByCreditVintageId?.nodes;
              if (balances) {
                setOldBalances(balances as Balance[]);
              }
            } catch (e) {
              console.error('Error transferring credits: ', e); // eslint-disable-line no-console
            }
          }
        }}
        noValidate
        autoComplete="off"
      >
        <Box display="flex" flexDirection="column">
          <FormControl className={styles.formControl}>
            <InputLabel required id="credit-vintage-select-label">
              Credit Vintage
            </InputLabel>
            <Select
              required
              labelId="credit-vintage-select-label"
              id="credit-vintage-select"
              value={vintageId}
              onChange={handleVintageChange}
            >
              {vintagesData &&
                vintagesData.allCreditVintages &&
                vintagesData.allCreditVintages.nodes.map((node: any) => (
                  <MenuItem key={node.id} value={node.id}>
                    {
                      node.projectByProjectId.metadata?.[
                        'http://schema.org/name'
                      ]
                    }{' '}
                    - {dateFormat.format(new Date(node.createdAt))}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {!passedBuyerWalletId && (
            <FormControl className={styles.formControl}>
              <InputLabel required id="buyer-wallet-select-label">
                Buyer
              </InputLabel>
              <Select
                required
                labelId="buyer-wallet-select-label"
                id="buyer-wallet-select"
                value={buyerWalletId}
                onChange={handleBuyerWalletChange}
              >
                {partiesData &&
                  partiesData.allParties &&
                  partiesData.allParties.nodes.map(
                    (node: any) =>
                      node.walletId &&
                      node.addressId &&
                      (!vintage ||
                        (vintage &&
                          vintage.projectByProjectId.developerId !== node.id &&
                          vintage.projectByProjectId.stewardId !== node.id &&
                          vintage.projectByProjectId.landOwnerId !==
                            node.id)) && (
                        <MenuItem key={node.id} value={node.walletId}>
                          {node.name} ({node.type.toLowerCase()}){' '}
                        </MenuItem>
                      ),
                  )}
              </Select>
            </FormControl>
          )}

          <FormControl className={styles.formControl}>
            <InputLabel required id="party-id-select-label">
              Entity doing this transfer
            </InputLabel>
            <Select
              required
              labelId="party-id-select-label"
              id="party-id-select"
              value={partyId}
              onChange={handlePartyIdChange}
            >
              {partiesData &&
                partiesData.allParties &&
                partiesData.allParties.nodes.map(
                  (node: any) =>
                    node.type === 'ORGANIZATION' && // only show organization for now
                    (!vintage ||
                      (vintage &&
                        vintage.projectByProjectId.developerId !== node.id &&
                        vintage.projectByProjectId.stewardId !== node.id &&
                        vintage.projectByProjectId.landOwnerId !==
                          node.id)) && (
                      <MenuItem key={node.id} value={node.id}>
                        {node.name}
                      </MenuItem>
                    ),
                )}
            </Select>
          </FormControl>
          <FormControl className={styles.formControl}>
            <InputLabel required id="user-id-select-label">
              User doing this transfer on behalf of the entity
            </InputLabel>
            <Select
              required
              labelId="user-id-select-label"
              id="user-id-select"
              value={userId}
              onChange={handleUserIdChange}
            >
              {partiesData &&
                partiesData.allParties &&
                partiesData.allParties.nodes.map(
                  (node: any) =>
                    node.type === 'USER' &&
                    node.userByPartyId &&
                    (!vintage ||
                      (vintage &&
                        vintage.projectByProjectId.developerId !== node.id &&
                        vintage.projectByProjectId.stewardId !== node.id &&
                        vintage.projectByProjectId.landOwnerId !==
                          node.id)) && (
                      <MenuItem key={node.id} value={node.userByPartyId.id}>
                        {node.name}
                      </MenuItem>
                    ),
                )}
            </Select>
          </FormControl>
          <TextField
            className={styles.input}
            required
            type="number"
            value={units}
            onChange={e => {
              if (showResult) {
                setShowResult(false);
              }
              setUnits(Math.max(0.01, parseFloat(e.target.value)));
            }}
            label="Units"
          />
          <TextField
            className={styles.input}
            required
            type="number"
            value={creditPrice}
            onChange={e => {
              if (showResult) {
                setShowResult(false);
              }
              setCreditPrice(Math.max(0.01, parseFloat(e.target.value)));
            }}
            label="Credit price"
          />
          <Button className={styles.button} variant="contained" type="submit">
            Transfer
          </Button>
        </Box>
      </form>
      {loading && <div>Loading...</div>}
      {vintage &&
        vintage.projectByProjectId &&
        vintage.projectByProjectId.partyByLandOwnerId && (
          <div>
            Project land owner:{' '}
            {vintage.projectByProjectId.partyByLandOwnerId.name}
          </div>
        )}
      {vintage &&
        vintage.initialDistribution &&
        vintage.projectByProjectId &&
        !passedBuyerWalletId && (
          <div>
            Ownership breakdown (%):
            <ul>
              {vintage.projectByProjectId.partyByLandOwnerId && (
                <li>
                  Land Owner (
                  {vintage.projectByProjectId.partyByLandOwnerId.name}):{' '}
                  {100 *
                    vintage.initialDistribution[
                      'http://regen.network/landOwnerDistribution'
                    ] || 0}
                </li>
              )}
              {vintage.projectByProjectId.partyByDeveloperId && (
                <li>
                  Project Developer (
                  {vintage.projectByProjectId.partyByDeveloperId.name}):{' '}
                  {100 *
                    vintage.initialDistribution[
                      'http://regen.network/projectDeveloperDistribution'
                    ] || 0}
                </li>
              )}
              {vintage.projectByProjectId.partyByStewardId && (
                <li>
                  Land Steward (
                  {vintage.projectByProjectId.partyByStewardId.name}):{' '}
                  {100 *
                    vintage.initialDistribution[
                      'http://regen.network/landStewardDistribution'
                    ] || 0}
                </li>
              )}
            </ul>
          </div>
        )}
      {availableCreditsData && availableCreditsData.getAvailableCredits && (
        <div>
          Available credits to transfer:{' '}
          {availableCreditsData.getAvailableCredits}
        </div>
      )}
      {data && data.transferCredits && receiverBalance && showResult && (
        <div>
          <p>Transaction id: {data.transferCredits.json.purchaseId}</p>
          <p>
            {units} {pluralize(units, 'credit')} successfully transfered.
          </p>
          <Title variant="h4">Senders:</Title>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Wallet id</TableCell>
                  <TableCell align="right">Old balance</TableCell>
                  <TableCell align="right">New balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sendersBalances.map(row => (
                  <TableRow key={row.name}>
                    <TableCell scope="row">{row.name}</TableCell>
                    <TableCell>{row.walletId}</TableCell>
                    <TableCell align="right">{row.oldBalance}</TableCell>
                    <TableCell align="right">{row.newBalance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Title variant="h4">Buyer:</Title>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Wallet id</TableCell>
                  <TableCell align="right">Old balance</TableCell>
                  <TableCell align="right">New balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={receiverBalance.name}>
                  <TableCell scope="row">{receiverBalance.name}</TableCell>
                  <TableCell>{receiverBalance.walletId}</TableCell>
                  <TableCell align="right">
                    {receiverBalance.oldBalance}
                  </TableCell>
                  <TableCell align="right">
                    {receiverBalance.newBalance}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {error && (
        <div>
          Error:
          {error.graphQLErrors.map(({ message }, i) => (
            <span key={i}> {message}</span>
          ))}
        </div>
      )}
    </Box>
  );
};
export { CreditsTransfer };
