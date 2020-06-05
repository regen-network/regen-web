import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/react-hooks';
import { Formik, Form, Field } from 'formik';

import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import CheckboxLabel from 'web-components/lib/components/inputs/CheckboxLabel';
import TextField from 'web-components/lib/components/inputs/TextField';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import SelectTextField, { Option } from 'web-components/lib/components/inputs/SelectTextField';
import { CreditPrice } from 'web-components/lib/components/buy-footer';

import { countries } from '../lib/countries';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY || '');

const CREATE_USER = loader('../graphql/ReallyCreateUserIfNeeded.graphql');
const CREATE_USER_ORGANIZATION = loader('../graphql/CreateUserOrganizationIfNeeded.graphql');
const CREATE_ADDRESS = loader('../graphql/CreateAddress.graphql');

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
      marginTop: theme.spacing(7.25),
      marginBottom: theme.spacing(12.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(5.25),
      marginBottom: theme.spacing(8.75),
    },
  },
  green: {
    color: theme.palette.secondary.main,
  },
  otherTitle: {
    marginTop: theme.spacing(13),
  },
  textFields: {
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
  },
  error: {
    color: theme.palette.error.main,
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
}));

interface CreditsPurchaseFormProps {
  creditPrice: CreditPrice;
  stripePrice: string;
}

interface Values {
  units: number;
  orgType: boolean;
  updates: boolean;
  email: string;
  name: string;
  orgName: string;
  city: string;
  state: string;
  country: string;
}

export default function CreditsPurchaseForm({
  creditPrice,
  stripePrice,
}: CreditsPurchaseFormProps): JSX.Element {
  const classes = useStyles();
  const initialCountry = 'US';
  const { projectId } = useParams();
  const [stateOptions, setStateOptions] = useState<Option[]>([]);

  const [createUser] = useMutation(CREATE_USER, {
    errorPolicy: 'ignore',
  });

  const [createUserOrganization] = useMutation(CREATE_USER_ORGANIZATION, {
    errorPolicy: 'ignore',
  });

  const [createAddress] = useMutation(CREATE_ADDRESS, {
    errorPolicy: 'ignore',
  });

  const searchState = async (countryId: string): Promise<void> => {
    const resp = await axios({
      url: 'https://geodata.solutions/api/api.php?type=getStates&countryId=' + countryId,
      method: 'POST',
    });
    const respOK = resp && resp.status === 200 && resp.statusText === 'OK';
    if (respOK) {
      const data = await resp.data;
      const options = Object.keys(data.result).map(key => ({ value: key, label: data.result[key] }));
      options.push({ value: '', label: 'Please choose a state' });
      setStateOptions(options);
    }
  };

  useEffect(() => {
    if (stateOptions.length === 0) {
      searchState(initialCountry);
    }
  });

  const requiredMessage: string = 'This field is required';

  return (
    <div>
      <Title variant="h3" className={classes.title}>
        Buy Credit
      </Title>
      <Formik
        initialValues={{
          units: 1,
          orgType: false,
          updates: false,
          name: '',
          orgName: '',
          email: '',
          city: '',
          state: '',
          country: initialCountry,
        }}
        validate={(values: Values) => {
          const errors: Partial<Values> = {};
          if (!values.email) {
            errors.email = requiredMessage;
          } else if (!/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,10})$/i.test(values.email)) {
            errors.email = 'Please enter a valid email address';
          }
          if (!values.name) {
            errors.name = requiredMessage;
          }
          if (values.orgType && !values.orgName) {
            errors.orgName = requiredMessage;
          }
          if (!values.city) {
            errors.city = requiredMessage;
          }
          if (!values.state) {
            errors.state = requiredMessage;
          }
          if (!values.country) {
            errors.country = requiredMessage;
          }
          return errors;
        }}
        onSubmit={async (
          { orgType, units, email, name, orgName, city, state, country, updates },
          { setSubmitting, setStatus },
        ) => {
          setSubmitting(true);
          try {
            let walletId: string;
            let addressId: string;
            let result;

            // Create address
            const feature = {
              place_type: ['place'],
              text: city,
              context: [
                { id: 'region', text: state },
                { id: 'country', text: countries[country] },
              ],
            };
            const addressResult = await createAddress({
              variables: {
                input: {
                  address: {
                    feature,
                  },
                },
              },
            });
            addressId = addressResult.data.createAddress.address.id;

            // Create user/org
            if (orgType === true) {
              result = await createUserOrganization({
                variables: {
                  input: {
                    roles: ['buyer'],
                    email,
                    name,
                    orgName,
                    walletAddr: name, // fake tmp wallet address (required for org),
                    updates,
                  },
                  q,
                },
              });
              walletId = result.data.createUserOrganizationIfNeeded.organization.walletId;
            } else {
              result = await createUser({
                variables: {
                  input: {
                    roles: ['buyer'],
                    userEmail: email,
                    name,
                    walletAddr: name, // fake tmp wallet address (to make user able to buy credits)
                    updates,
                  },
                },
              });
              walletId = result.data.reallyCreateUserIfNeeded.user.walletId;
            }

            // Redirect to Stripe Checkout page
            const stripe = await stripePromise;
            if (stripe) {
              const { error } = await stripe.redirectToCheckout({
                items: [{ sku: stripePrice, quantity: units }],
                successUrl: `${window.location.origin}/post-purchase/${projectId}`,
                cancelUrl: window.location.href,
                customerEmail: email,
                clientReferenceId: JSON.stringify({ walletId, addressId }),
              });
              if (error) {
                setStatus({ serverError: error.message });
              }
            }
            setSubmitting(false);
          } catch (e) {
            setStatus({ serverError: 'Server error' }); // TODO: display more explicit msg?
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, submitForm, isSubmitting, isValid, submitCount, status }) => {
          const formattedTotal: string = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(
            values.units * creditPrice.unitPrice,
          );

          return (
            <div>
              <Form className={classes.form} translate="yes">
                <Title className={classes.subtitle} variant="h5">
                  Number of credits
                </Title>
                <Description>
                  (${creditPrice.unitPrice} {creditPrice.currency}/each), includes 10% service fee
                </Description>
                <Grid container alignItems="center" className={classes.unitsGrid}>
                  <Grid item xs={6}>
                    <Field
                      component={TextField}
                      type="number"
                      name="units"
                      transformValue={(v: number): number => Math.max(1, v)}
                    />
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
                <div className={classes.textFields}>
                  <Field component={TextField} label="Your full name" name="name" />
                  <Field
                    component={TextField}
                    className={classes.textField}
                    type="email"
                    label="Your email address"
                    name="email"
                  />
                </div>
                <div className={classes.orgCheckbox}>
                  <Field
                    component={CheckboxLabel}
                    name="orgType"
                    label="I am buying these credits on behalf of my organization"
                    type="checkbox"
                  />
                </div>
                {values.orgType && (
                  <div className={classes.textFields}>
                    <Field
                      component={TextField}
                      name="orgName"
                      className={classes.textField}
                      label="Organization name"
                    />
                  </div>
                )}

                <Title className={`${classes.subtitle} ${classes.otherTitle}`} variant="h5">
                  Location of purchase
                </Title>
                <Description>
                  Please enter a location for the retirement of these credits. This prevents{' '}
                  <span className={classes.green}>double counting</span> of credits in different locations.
                  These credits will auto-retire.
                </Description>
                <Field component={TextField} className={classes.cityTextField} label="City" name="city" />
                <Grid container alignItems="center" wrap="nowrap">
                  <Grid item xs={12} sm={6} className={classes.stateCountryTextField}>
                    <Field
                      options={stateOptions}
                      component={SelectTextField}
                      label="State / Province / Region"
                      name="state"
                      errors
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.stateCountryTextField}>
                    <Field
                      component={SelectTextField}
                      options={Object.keys(countries).map(key => ({ value: key, label: countries[key] }))}
                      name="country"
                      label="Country"
                      triggerOnChange={searchState}
                      errors
                    />
                  </Grid>
                </Grid>

                <div className={classes.updatesCheckbox}>
                  <Field
                    component={CheckboxLabel}
                    type="checkbox"
                    name="updates"
                    label="Yes, I’d like to receive news and updates about this project!"
                  />
                </div>
              </Form>
              <Grid container direction="column" justify="flex-end" className={classes.submitButton}>
                <Grid item>
                  <ContainedButton
                    disabled={(submitCount > 0 && !isValid) || isSubmitting}
                    onClick={submitForm}
                  >
                    buy for ${formattedTotal}
                  </ContainedButton>
                </Grid>
                {submitCount > 0 && !isValid && (
                  <Grid item className={classes.error}>
                    Please correct the errors above
                  </Grid>
                )}
                {status && status.serverError && (
                  <Grid item className={classes.error}>
                    {status.serverError}
                  </Grid>
                )}
              </Grid>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
