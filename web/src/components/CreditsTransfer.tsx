import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Title from 'web-components/lib/components/title';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const TRANSFER_CREDITS = gql`
  mutation TransferCredits($input: TransferCreditsInput!) {
    transferCredits(input: $input) {
      accountBalance {
        id
        walletId
        liquidBalance
        creditVintageByCreditVintageId {
          createdAt
          creditClassByCreditClassId {
            creditClassVersionsById {
              nodes {
                name
              }
            }
          }
          projectByProjectId {
            name
          }
        }
      }
    }
  }
`;

const ALL_CREDIT_VINTAGES = gql`
  {
    allCreditVintages {
      nodes {
        id
        createdAt
        projectByProjectId {
          name
        }
      }
    }
  }
`;

const ALL_PARTIES = gql`
{
  allParties {
    nodes {
      id
      type
      usersByPartyId {
        nodes {
          name
          walletId
        }
      }
      organizationsByPartyId {
        nodes {
          name
          walletId
        }
      }
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

export default function CreditsTransfer(): JSX.Element {
  const classes = useStyles();

  const [transferCredits, { data, loading, error }] = useMutation(TRANSFER_CREDITS, { errorPolicy: 'ignore' });
  const { data: vintagesData, loading: vintagesLoading, error: vintagesError } = useQuery(ALL_CREDIT_VINTAGES, {
    errorPolicy: 'ignore',
  });
  const { data: partiesData, loading: partiesLoading, error: partiesError } = useQuery(ALL_PARTIES, {
    errorPolicy: 'ignore',
  });

  const dateFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'numeric', day: '2-digit' });

  const [vintageId, setVintageId] = useState('');
  const [buyerWalletId, setBuyerWalletId] = useState('');
  const [units, setUnits] = useState(0);
  const [creditPrice, setCreditPrice] = useState(0);

  const handleVintageChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setVintageId(event.target.value as string);
  };

  const handleBuyerWalletChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    console.log(event.target.value)
    setBuyerWalletId(event.target.value as string);
  };

  if (vintagesLoading || partiesLoading) return <div>'Loading...'</div>;
  if (vintagesError) return <div>`Error! ${vintagesError.message}`</div>;
  if (partiesError) return <div>`Error! ${partiesError.message}`</div>;

  return (
    <div className={classes.root}>
      <Title variant="h1">Transfer Credits</Title>
      <form
        className={classes.form}
        onSubmit={async e => {
          e.preventDefault();
          try {
            await transferCredits({
              variables: {
                input: {
                  vintageId,
                  buyerWalletId,
                  units,
                  creditPrice,
                  txState: 'SUCCEEDED',
                },
              },
            });
          } catch (e) {}
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl className={classes.formControl}>
          <InputLabel required id="credit-vintage-select-label">Credit Vintage</InputLabel>
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
          <InputLabel required id="buyer-wallet-select-label">Buyer</InputLabel>
          <Select
            required
            labelId="buyer-wallet-select-label"
            id="buyer-wallet-select"
            value={buyerWalletId}
            onChange={handleBuyerWalletChange}
          >
            {partiesData &&
              partiesData.allParties &&
              partiesData.allParties.nodes.map((node: any) => (
                ((node.type === 'USER' && node.usersByPartyId.nodes[0].walletId) ||
                (node.type === 'ORGANIZATION' && node.organizationsByPartyId.nodes[0].walletId))
                 && (node.type === 'USER' ? <MenuItem key={node.id} value={node.usersByPartyId.nodes[0].walletId}>
                   {node.usersByPartyId.nodes[0].name} ({node.type.toLowerCase()}) </MenuItem> :
                   <MenuItem key={node.id} value={node.organizationsByPartyId.nodes[0].walletId}>
                     {node.organizationsByPartyId.nodes[0].name} ({node.type.toLowerCase()}) </MenuItem>)
              ))}
          </Select>
        </FormControl>
        <TextField
          className={classes.input}
          required
          type="number"
          value={units}
          onChange={e => setUnits(parseInt(e.target.value))}
          label="Units"
        />
        <TextField
          className={classes.input}
          required
          type="number"
          value={creditPrice}
          onChange={e => setCreditPrice(parseInt(e.target.value))}
          label="Credit price"
        />
        <Button className={classes.button} variant="contained" type="submit">
          Transfer
        </Button>
      </form>
      {loading && <div>Loading...</div>}
      {data && <code>{JSON.stringify(data, null, 1)}</code>}
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
