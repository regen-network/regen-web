import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useMutation } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { loader } from 'graphql.macro';

import Title from 'web-components/lib/components/title';
import Geocoder from 'web-components/lib/components/map/Geocoder';

const CREATE_USER = loader('../graphql/ReallyCreateUser.graphql');
const CREATE_USER_ORGANIZATION = loader('../graphql/CreateUserOrganization.graphql');

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
  textFields: {
    [theme.breakpoints.up('sm')]: {
      width: '33%',
    },
  },
}));

export default function BuyerCreate(): JSX.Element {
  const classes = useStyles();

  const [createUser, { data: userData, error: userError }] = useMutation(CREATE_USER, {
    errorPolicy: 'ignore',
  });

  const [createUserOrganization, { data: userOrganizationData, error: userOrganizationError }] = useMutation(
    CREATE_USER_ORGANIZATION,
    {
      errorPolicy: 'ignore',
    },
  );

  const [buyerType, setBuyerType] = useState<string>('organization');
  const [orgName, setOrgName] = useState<string>('');
  const [orgAddress, setOrgAddress] = useState<string | object>('');
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string | object>('');
  const [email, setEmail] = useState<string>('');
  const [walletId, setWalletId] = useState<string>('');
  const [addressId, setAddressId] = useState<string>('');

  return (
    <div className={classes.root}>
      <Title variant="h1">Create new buyer</Title>
      <form
        className={classes.form}
        onSubmit={async e => {
          e.preventDefault();
          let result;
          try {
            if (buyerType === 'organization') {
              result = await createUserOrganization({
                variables: {
                  input: {
                    roles: ['buyer'],
                    email,
                    name,
                    orgName,
                    orgAddress,
                    walletAddr: name, // fake tmp wallet address (required for org)
                  },
                },
              });
              setAddressId(result.data.createUserOrganization.organization.partyByPartyId.addressId);
              setWalletId(result.data.createUserOrganization.organization.partyByPartyId.walletId);
            } else {
              result = await createUser({
                variables: {
                  input: {
                    roles: ['buyer'],
                    email,
                    name,
                    address,
                    walletAddr: name, // fake tmp wallet address (to make user able to buy credits)
                  },
                },
              });
              setAddressId(result.data.reallyCreateUser.user.partyByPartyId.addressId);
              setWalletId(result.data.reallyCreateUser.user.partyByPartyId.walletId);
            }
          } catch (e) {}
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl>
          <FormLabel>Buyer type</FormLabel>
          <RadioGroup
            aria-label="buyer-type"
            name="type"
            value={buyerType}
            onChange={e => setBuyerType(e.target.value)}
          >
            <FormControlLabel value="organization" control={<Radio />} label="Organization" />
            <FormControlLabel value="user" control={<Radio />} label="Individual person" />
          </RadioGroup>
        </FormControl>
        {buyerType === 'organization' ? (
          <div className={classes.textFields}>
            <TextField
              fullWidth
              className={classes.input}
              required
              value={orgName}
              onChange={e => setOrgName(e.target.value)}
              label="Organization name"
            />
            <Geocoder
              types={[
                'address',
                'country',
                'region',
                'postcode',
                'district',
                'place',
                'locality',
                'neighborhood',
                'address',
              ]}
              className={classes.input}
              token={process.env.REACT_APP_MAPBOX_TOKEN}
              fullWidth
              setFeature={setOrgAddress}
              label="Organization address"
            />
            <TextField
              fullWidth
              className={classes.input}
              required
              value={name}
              onChange={e => setName(e.target.value)}
              label="Contact person full name"
            />
            <TextField
              fullWidth
              className={classes.input}
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              label="Contact person email address"
            />
          </div>
        ) : (
          <div className={classes.textFields}>
            <TextField
              fullWidth
              className={classes.input}
              required
              value={name}
              onChange={e => setName(e.target.value)}
              label="Full name"
            />
            <Geocoder
              types={[
                'address',
                'country',
                'region',
                'postcode',
                'district',
                'place',
                'locality',
                'neighborhood',
                'address',
              ]}
              className={classes.input}
              token={process.env.REACT_APP_MAPBOX_TOKEN}
              fullWidth
              setFeature={setAddress}
              label="Address"
            />
            <TextField
              fullWidth
              className={classes.input}
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              label="Email address"
            />
          </div>
        )}
        <Button className={classes.button} variant="contained" type="submit">
          Create buyer
        </Button>
      </form>
      {(userData || userOrganizationData) && (
        <div>
          Buyer successfully created:
          <pre>wallet_id: {walletId}</pre>
          <pre>address_id: {addressId}</pre>
        </div>
      )}
      {userError && (
        <div>
          Error:
          {userError.graphQLErrors.map(({ message }, i) => (
            <span key={i}> {message}</span>
          ))}
        </div>
      )}
      {userOrganizationError && (
        <div>
          Error:
          {userOrganizationError.graphQLErrors.map(({ message }, i) => (
            <span key={i}> {message}</span>
          ))}
        </div>
      )}
    </div>
  );
}
