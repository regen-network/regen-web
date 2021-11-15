import React, { useState, useEffect } from 'react';
import { makeStyles, DefaultTheme as Theme, useTheme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/client';
import { Formik, Form, Field } from 'formik';
import useMediaQuery from '@mui/material/useMediaQuery';

import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import CheckboxLabel from 'web-components/lib/components/inputs/CheckboxLabel';
import TextField from 'web-components/lib/components/inputs/TextField';
import NumberTextField from 'web-components/lib/components/inputs/NumberTextField';
import SelectTextField, {
  Option,
} from 'web-components/lib/components/inputs/SelectTextField';
import { CreditPrice } from 'web-components/lib/components/buy-footer';
import {
  requiredMessage,
  validateEmail,
  invalidEmailMessage,
} from 'web-components/lib/components/inputs/validation';
import Submit from 'web-components/lib/components/form/Submit';

import { countries } from '../../lib/countries';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY || '');

const CREATE_USER = loader('../../graphql/ReallyCreateUserIfNeeded.graphql');
const CREATE_USER_ORGANIZATION = loader(
  '../../graphql/CreateUserOrganizationIfNeeded.graphql',
);
const CREATE_ADDRESS = loader('../../graphql/CreateAddress.graphql');

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      fontSize: '2rem',
    },
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
  stateCountryGrid: {
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap',
    },
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
}));

interface CreditsPurchaseFormProps {
  creditPrice: CreditPrice;
  stripePrice: string;
  onClose: () => void;
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

function CreditsPurchaseForm({
  creditPrice,
  stripePrice,
  onClose,
}: CreditsPurchaseFormProps): JSX.Element {
  const classes = useStyles();
  const initialCountry = 'US';
  const { projectId } = useParams<{ projectId: string }>();
  const [stateOptions, setStateOptions] = useState<Option[]>([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

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
      url:
        'https://geodata.solutions/api/api.php?type=getStates&countryId=' +
        countryId,
      method: 'POST',
    });
    const respOK = resp && resp.status === 200;
    if (respOK) {
      const data = await resp.data;
      const options = Object.keys(data.result).map(key => ({
        value: data.result[key],
        label: data.result[key],
      }));
      options.unshift({ value: '', label: 'Please choose a state' });
      setStateOptions(options);
    }
  };

  useEffect(() => {
    if (stateOptions.length === 0) {
      searchState(initialCountry);
    }
  });

  return (
    <div>
      <Title variant="h3" className={classes.title}>
        Buy Credits
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
          } else if (!validateEmail(values.email)) {
            errors.email = invalidEmailMessage;
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
          {
            orgType,
            units,
            email,
            name,
            orgName,
            city,
            state,
            country,
            updates,
          },
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
                },
              });
              walletId =
                result.data.createUserOrganizationIfNeeded.organization
                  .partyByPartyId.walletId;
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
              walletId =
                result.data.reallyCreateUserIfNeeded.user.partyByPartyId
                  .walletId;
            }

            // Redirect to Stripe Checkout page
            const response = axios.post(
              `${
                process.env.REACT_APP_API_URI || 'http://localhost:5000'
              }/create-checkout-session`,
              {
                price: stripePrice,
                units,
                cancelUrl: window.location.href,
                successUrl: `/post-purchase/${projectId}/${walletId}/${encodeURI(
                  name,
                )}`,
                customerEmail: email,
                clientReferenceId: JSON.stringify({
                  walletId,
                  addressId,
                  name,
                }),
              },
            );

            const { data } = await response;

            const stripe = await stripePromise;
            if (stripe) {
              const { error } = await stripe.redirectToCheckout({
                sessionId: data.id,
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
        {({
          values,
          errors,
          submitForm,
          isSubmitting,
          isValid,
          submitCount,
          status,
        }) => {
          const formattedUnitPrice: string = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
          }).format(creditPrice.unitPrice);
          const formattedTotal: string = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
          }).format(values.units * creditPrice.unitPrice);

          return (
            <div>
              <Form className={classes.form} translate="yes">
                <Title className={classes.subtitle} variant="h5">
                  Number of credits
                </Title>
                <Description>
                  (${formattedUnitPrice} {creditPrice.currency}/each), includes
                  10% service fee
                </Description>
                <Grid
                  container
                  alignItems="center"
                  className={classes.unitsGrid}
                >
                  <Grid item xs={6}>
                    <Field
                      component={NumberTextField}
                      name="units"
                      min={1}
                      transformValue={(v: number): number => Math.max(1, v)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <span className={classes.units}>= ${formattedTotal}</span>
                      <span className={classes.currency}>
                        {creditPrice.currency}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>

                <Title
                  className={`${classes.subtitle} ${classes.otherTitle}`}
                  variant="h5"
                >
                  Credit ownership
                </Title>
                <div className={classes.textFields}>
                  <Field
                    component={TextField}
                    label="Your full name"
                    name="name"
                  />
                  <Field
                    component={TextField}
                    className={classes.textField}
                    type="email"
                    label="Your email address"
                    name="email"
                  />
                </div>
                {/*<div className={classes.orgCheckbox}>
                  <Field
                    component={CheckboxLabel}
                    name="orgType"
                    label="I am buying these credits on behalf of my organization"
                    type="checkbox"
                  />
                </div>*/}
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

                <Title
                  className={`${classes.subtitle} ${classes.otherTitle}`}
                  variant="h5"
                >
                  Location of purchase
                </Title>
                <Description>
                  Please enter a location for the retirement of these credits.
                  This prevents double counting of credits in different
                  locations. Note, these credits will be retired upon purchase.
                </Description>
                <Field
                  component={TextField}
                  className={classes.cityTextField}
                  label="City"
                  name="city"
                />
                <Grid
                  container
                  alignItems="center"
                  className={classes.stateCountryGrid}
                >
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    className={classes.stateCountryTextField}
                  >
                    <Field
                      options={stateOptions}
                      component={SelectTextField}
                      label="State / Province / Region"
                      name="state"
                      errors={matches}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    className={classes.stateCountryTextField}
                  >
                    <Field
                      component={SelectTextField}
                      options={Object.keys(countries).map(key => ({
                        value: key,
                        label: countries[key],
                      }))}
                      name="country"
                      label="Country"
                      triggerOnChange={searchState}
                      errors={matches}
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
              <Submit
                isSubmitting={isSubmitting}
                onClose={onClose}
                status={status}
                isValid={isValid}
                submitCount={submitCount}
                submitForm={submitForm}
                label={`buy for $${formattedTotal}`}
              />
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export { CreditsPurchaseForm };
