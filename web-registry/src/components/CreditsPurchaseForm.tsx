import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/react-hooks';

import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import CheckboxLabel from 'web-components/lib/components/inputs/CheckboxLabel';
import TextField from 'web-components/lib/components/inputs/TextField';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import SelectTextField, { Option } from 'web-components/lib/components/inputs/SelectTextField';
import { CreditPrice } from 'web-components/lib/components/buy-footer';

import { countries } from '../lib/countries';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY || '');

const CREATE_USER = loader('../graphql/ReallyCreateUser.graphql');
const CREATE_USER_ORGANIZATION = loader('../graphql/CreateUserOrganization.graphql');

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      fontSize: '2rem',
    },
  },
  submitButton: {
    textAlign: 'right',
  },
  subtitle: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(3.75),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(4),
    },
  },
  form: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(5.75),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(8.5),
    },
  },
  units: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 800,
    marginLeft: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.3125rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.125rem',
    },
  },
  currency: {
    marginLeft: theme.spacing(2),
  },
  unitsGrid: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(5.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3),
    },
  },
  textField: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10.75),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(8.5),
    },
  },
  cityTextField: {
    marginTop: theme.spacing(4),
  },
  stateCountryTextField: {
    marginTop: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      '&:first-of-type': {
        marginRight: theme.spacing(2.375),
      },
      '&:last-of-type': {
        marginLeft: theme.spacing(2.375),
      },
    },
  },
  orgCheckbox: {
    marginTop: theme.spacing(4.5),
  },
  updatesCheckbox: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(12.5),
      marginBottom: theme.spacing(12.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(8.75),
    },
  },
  green: {
    color: theme.palette.secondary.main,
  },
  otherTitle: {
    marginTop: theme.spacing(13),
  },
}));

interface CreditsPurchaseFormProps {
  creditPrice: CreditPrice;
  stripePrice: string;
}

export default function CreditsPurchaseForm({
  creditPrice,
  stripePrice,
}: CreditsPurchaseFormProps): JSX.Element {
  const classes = useStyles();
  const [units, setUnits] = useState<number>(2);
  const [orgType, setOrgType] = useState<boolean>(false);
  const [updates, setUpdates] = useState<boolean>(false);
  const [name, setName] = useState<string>('buyer1');
  const [orgName, setOrgName] = useState<string>('');
  const [email, setEmail] = useState<string>('buyer1@gmail.com');
  const [city, setCity] = useState<string>('AAA');
  const [state, setState] = useState<string>('Alaska');
  const [country, setCountry] = useState<string>('US');
  const [stateOptions, setStateOptions] = useState<Option[]>([]);

  const [createUser, { data: userData, error: userError }] = useMutation(CREATE_USER, {
    errorPolicy: 'ignore',
  });

  const [createUserOrganization, { data: userOrganizationData, error: userOrganizationError }] = useMutation(
    CREATE_USER_ORGANIZATION,
    {
      errorPolicy: 'ignore',
    },
  );

  const { projectId } = useParams();

  const searchState = async (countryId: string): Promise<void> => {
    const resp = await axios({
      url: 'https://geodata.solutions/api/api.php?type=getStates&countryId=' + countryId,
      method: 'POST',
    });
    const respOK = resp && resp.status === 200 && resp.statusText === 'OK';
    if (respOK) {
      const data = await resp.data;
      setStateOptions(Object.keys(data.result).map(key => ({ value: key, label: data.result[key] })));
    }
  };

  useEffect(() => {
    if (stateOptions.length === 0) {
      searchState(country);
    }
  });

  const total: number = units * creditPrice.unitPrice;
  const formattedTotal: string = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(total);

  const handleClick = async (e: any): Promise<void> => {
    e.preventDefault();
    // Create user or organization
    try {
      let clientReferenceId: string;
      let result;
      const address = {
        'place_type': ['place'],
        text: city,
        context: [
          { id: 'region', text: state },
          { id: 'country', text: countries.country },
        ]
      };
      if (orgType === true) {
        const result = await createUserOrganization({
          variables: {
            input: {
              roles: ['buyer'],
              email,
              name,
              orgName,
              orgAddress: address,
              walletAddr: name, // fake tmp wallet address (required for org)
            },
          },
        });
        clientReferenceId = result.data.createUserOrganization.uuid;
      } else {
        const result = await createUser({
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
        clientReferenceId = result.data.reallyCreateUser.user.id;
      }
      const stripe = await stripePromise;
      if (stripe) {
        // const { error } = await stripe.redirectToCheckout({
        await stripe.redirectToCheckout({
          items: [{ sku: stripePrice, quantity: units }],
          successUrl: `${window.location.origin}/post-purchase/${projectId}`,
          cancelUrl: window.location.href,
          customerEmail: email,
          clientReferenceId,
        });
        // TODO If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
      }
    } catch (e) {
    }
  };

  return (
    <div>
      <Title variant="h3" className={classes.title}>
        Buy Credit
      </Title>
      <form className={classes.form}>
        <Title className={classes.subtitle} variant="h5">
          Number of credits
        </Title>
        <Description>
          (${creditPrice.unitPrice} {creditPrice.currency}/each), includes 10% service fee
        </Description>
        <Grid container alignItems="center" className={classes.unitsGrid}>
          <Grid item xs={6}>
            <TextField type="number" value={units} onChange={e => setUnits(parseInt(e.target.value))} />
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <span className={classes.units}>= ${formattedTotal}</span>
              <span className={classes.currency}>{creditPrice.currency}</span>
            </Typography>
          </Grid>
        </Grid>

        <Title className={`${classes.subtitle} ${classes.otherTitle}`} variant="h5">
          Credit ownership
        </Title>
        <TextField label="Your full name" value={name} onChange={e => setName(e.target.value)} />
        <TextField
          className={classes.textField}
          type="email"
          label="Your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <div className={classes.orgCheckbox}>
          <CheckboxLabel
            checked={orgType}
            onChange={e => setOrgType(e.target.checked)}
            label="I am buying these credits on behalf of my organization"
          />
        </div>
        {orgType && (
          <TextField
            className={classes.textField}
            label="Organization name"
            value={orgName}
            onChange={e => setOrgName(e.target.value)}
          />
        )}

        <Title className={`${classes.subtitle} ${classes.otherTitle}`} variant="h5">
          Location of purchase
        </Title>
        <Description>
          Please enter a location for the retirement of these credits. This prevents{' '}
          <span className={classes.green}>double counting</span> of credits in different locations. These
          credits will auto-retire.
        </Description>
        <TextField
          className={classes.cityTextField}
          label="City"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <Grid container alignItems="center" wrap="nowrap">
          <Grid item xs={12} sm={6} className={classes.stateCountryTextField}>
            <SelectTextField
              options={stateOptions}
              value={state}
              onChange={e => setState(e.target.value)}
              label="State / Province / Region"
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.stateCountryTextField}>
            <SelectTextField
              options={Object.keys(countries).map(key => ({ value: key, label: countries[key] }))}
              value={country}
              onChange={async e => {
                setCountry(e.target.value);
                await searchState(e.target.value);
              }}
              label="Country"
            />
          </Grid>
        </Grid>

        <div className={classes.updatesCheckbox}>
          <CheckboxLabel
            checked={updates}
            onChange={e => setUpdates(e.target.checked)}
            label="Yes, I’d like to receive news and updates about this project!"
          />
        </div>
      </form>
      <div className={classes.submitButton}>
        <ContainedButton onClick={handleClick}>buy for ${formattedTotal}</ContainedButton>
      </div>
    </div>
  );
}
