import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { loader } from 'graphql.macro';

import Title from 'web-components/lib/components/title';
import { pluralize } from 'web-components/lib/components/credits/pluralize';

const ALL_CREDIT_VINTAGES = loader('../graphql/AllCreditVintages.graphql');
const ALL_PARTIES = loader('../graphql/AllParties.graphql');

const RETIRE_CREDITS = gql`
  mutation RetireCredits($input: RetireCreditsInput!) {
    retireCredits(input: $input) {
      retirement {
        id
      }
    }
  }
`;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(5),
  },
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
  },
}));

function getUnits(vintagesData: any, walletId: string, vintageId: string): number {
  const vintage = vintagesData.allCreditVintages.nodes.find((node: any) => node.id === vintageId);
  if (!vintage) {
    return 0;
  }
  const accountBalance = vintage.accountBalancesByCreditVintageId.nodes.find(
    (node: any) => node.walletId === walletId,
  );
  if (accountBalance) {
    return parseInt(accountBalance.liquidBalance);
  }
  return 0;
}

export default function CreditsRetire(): JSX.Element {
  const classes = useStyles();

  const [retireCredits, { data, loading, error }] = useMutation(RETIRE_CREDITS, {
    errorPolicy: 'ignore',
  });
  const {
    data: vintagesData,
    loading: vintagesLoading,
    error: vintagesError,
    refetch: refetchVintages,
  } = useQuery(ALL_CREDIT_VINTAGES, {
    errorPolicy: 'ignore',
  });

  const { data: partiesData, loading: partiesLoading, error: partiesError } = useQuery(ALL_PARTIES, {
    errorPolicy: 'ignore',
  });

  const dateFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'numeric', day: '2-digit' });

  const [vintageId, setVintageId] = useState('');
  const [buyerWalletId, setBuyerWalletId] = useState('');
  const [addressId, setAddressId] = useState('');
  const [units, setUnits] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleVintageChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    if (showResult) {
      setShowResult(false);
    }
    setVintageId(event.target.value as string);
    setUnits(getUnits(vintagesData, buyerWalletId, event.target.value as string));
  };

  const handleBuyerWalletChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    if (showResult) {
      setShowResult(false);
    }
    setBuyerWalletId(event.target.value as string);
    setUnits(getUnits(vintagesData, event.target.value as string, vintageId));
    if (partiesData && partiesData.allParties) {
      const selectedParty = partiesData.allParties.nodes.find(
        (party: any) => party.walletId === event.target.value,
      );
      setAddressId(selectedParty.addressId);
    }
  };

  if (vintagesLoading || partiesLoading) return <div>Loading...</div>;
  if (vintagesError) return <div>Error! ${vintagesError.message}</div>;
  if (partiesError) return <div>Error! ${partiesError.message}</div>;

  let vintage: any;
  if (partiesData && partiesData.allParties && vintagesData && vintagesData.allCreditVintages && vintageId) {
    vintage = vintagesData.allCreditVintages.nodes.find((node: any) => node.id === vintageId);
  }

  return (
    <div className={classes.root}>
      <Title variant="h1">Retire Credits</Title>
      <form
        className={classes.form}
        onSubmit={async e => {
          e.preventDefault();
          if (!units) {
            return;
          }
          const confirmAlert = window.confirm('Are you sure you want to retire credits?');
          if (confirmAlert) {
            try {
              await retireCredits({
                variables: {
                  input: {
                    vintageId,
                    buyerWalletId,
                    units,
                    addressId,
                  },
                },
              });
              await refetchVintages();
              setUnits(getUnits(vintagesData, buyerWalletId, vintageId));
              setShowResult(true);
            } catch (e) {}
          }
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl className={classes.formControl}>
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
                  {node.projectByProjectId.name} - {dateFormat.format(new Date(node.createdAt))}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
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
                      vintage.projectByProjectId.landOwnerId !== node.id)) && (
                    <MenuItem key={node.id} value={node.walletId}>
                      {node.name} ({node.type.toLowerCase()}){' '}
                    </MenuItem>
                  ),
              )}
          </Select>
        </FormControl>
        <Button disabled={!units} className={classes.button} variant="contained" type="submit">
          Retire
        </Button>
      </form>
      {loading && <div>Loading...</div>}
      {!showResult && <div>Available credits to retire: {units}</div>}
      {data && data.retireCredits && showResult && (
        <div>
          <p>
            {units} {pluralize(units, 'credit')} successfully retired.
          </p>
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
    </div>
  );
}
