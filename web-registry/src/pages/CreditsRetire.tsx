import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';

import { Theme } from 'web-components/lib/theme/muiTheme';
import { Title } from 'web-components/lib/components/typography';
import { pluralize } from 'web-components/lib/utils/pluralize';
import {
  useAllCreditVintagesQuery,
  useAllPartiesQuery,
  useRetireCreditsMutation,
} from '../generated/graphql';

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

function getUnits(
  vintagesData: any,
  walletId: string,
  vintageId: string,
): number {
  const vintage = vintagesData.allCreditVintages.nodes.find(
    (node: any) => node.id === vintageId,
  );
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

const CreditsRetire: React.FC<{
  addressId?: string;
  buyerWalletId?: string;
  creditVintageId?: string;
}> = ({
  addressId: passedAddressId = '',
  buyerWalletId: passedBuyerWalletId = '',
  creditVintageId: passedVintageId = '',
}) => {
  const styles = useStyles();

  const [retireCredits, { data, loading, error }] = useRetireCreditsMutation({
    errorPolicy: 'ignore',
  });
  const {
    data: vintagesData,
    loading: vintagesLoading,
    error: vintagesError,
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

  const [vintageId, setVintageId] = useState(passedVintageId);
  const [buyerWalletId, setBuyerWalletId] = useState(passedBuyerWalletId);
  const [buyerName, setBuyerName] = useState('');
  const [creditName, setCreditName] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [addressId, setAddressId] = useState(passedAddressId);
  const [units, setUnits] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [retireUrl, setRetireUrl] = useState<null | string>(null);

  useEffect(() => {
    if (vintagesData && vintagesData.allCreditVintages) {
      setUnits(getUnits(vintagesData, buyerWalletId, vintageId));
    }
  }, [vintageId, buyerWalletId, vintagesData]);

  const handleVintageChange = (event: SelectChangeEvent<string>): void => {
    if (showResult) {
      setShowResult(false);
    }
    setVintageId(event.target.value);
    if (vintagesData && vintagesData.allCreditVintages) {
      // TODO: the following shouldn't be type cast to `any` but changing throws an error
      // `creditClassVersionByCreditClassVersionIdAndCreditClassVersionCreatedAt`
      // doesn't seem to exist on vintages - possibly delete?
      const selectedVintage: any = vintagesData.allCreditVintages.nodes.find(
        vintage => vintage?.id === event.target.value,
      );
      if (
        selectedVintage?.creditClassVersionByCreditClassVersionIdAndCreditClassVersionCreatedAt
      ) {
        const selectedCredit =
          selectedVintage.creditClassVersionByCreditClassVersionIdAndCreditClassVersionCreatedAt;
        setCreditName(selectedCredit.name);
      }
    }
  };

  const handleBuyerWalletChange = (event: SelectChangeEvent<string>): void => {
    if (showResult) {
      setShowResult(false);
    }
    setBuyerWalletId(event.target.value);
    setUnits(getUnits(vintagesData, event.target.value, vintageId));
    if (partiesData && partiesData.allParties) {
      const selectedParty = partiesData.allParties.nodes.find(
        (party: any) => party.walletId === event.target.value,
      );
      setAddressId(selectedParty?.addressId);
      setBuyerName(selectedParty?.name || '');
      setBuyerAddress(selectedParty?.addressByAddressId?.feature.place_name);
    }
  };

  if (vintagesLoading || partiesLoading) return <div>Loading...</div>;
  if (vintagesError) return <div>Error! ${vintagesError.message}</div>;
  if (partiesError) return <div>Error! ${partiesError.message}</div>;

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
  }

  return (
    <div className={styles.root}>
      <Title variant="h1">Retire Credits</Title>
      <form
        className={styles.form}
        onSubmit={async e => {
          e.preventDefault();
          if (!units) {
            return;
          }
          const confirmAlert = window.confirm(
            'Are you sure you want to retire credits?',
          );
          if (confirmAlert) {
            try {
              await retireCredits({
                variables: {
                  input: {
                    vintageId,
                    buyerWalletId,
                    units,
                    addressId,
                    metadata: retireUrl
                      ? {
                          '@type': 'http://regen.network/Retirement',
                          'http://www.schema.org/url': retireUrl,
                        }
                      : null,
                  },
                },
              });
              setShowResult(true);
            } catch (e) {
              console.error('Error retiring credits: ', e); // eslint-disable-line no-console
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
                    {node.projectByProjectId.metadata?.['schema:name']} -{' '}
                    {dateFormat.format(new Date(node.createdAt))}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
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
                  node =>
                    node?.walletId &&
                    node?.addressId &&
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
          <FormControl>
            <InputLabel id="metadata-label">Retirement Link Url</InputLabel>
            <Input
              value={retireUrl}
              onChange={({ target: { value } }) => setRetireUrl(value)}
              id="retirement-link-input"
            />
          </FormControl>
          <Button
            disabled={!units}
            className={styles.button}
            variant="contained"
            type="submit"
          >
            Retire
          </Button>
        </Box>
      </form>
      {loading && <div>Loading...</div>}
      {!showResult && <div>Available credits to retire: {units}</div>}
      {data && data.retireCredits && showResult && (
        <div>
          <p>
            {units} {pluralize(units, 'credit')} successfully retired.
          </p>
          {buyerName && <p>Buyer: {buyerName}</p>}
          {buyerAddress && <p>Location: {buyerAddress}</p>}
          {creditName && <p>Credit: {creditName}</p>}
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
};

export { CreditsRetire };
