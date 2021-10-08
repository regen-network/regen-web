import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { RadioGroup } from 'formik-material-ui';
import cx from 'clsx';

import Modal, { RegenModalProps } from 'web-components/lib/components/modal';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import FormLabel from 'web-components/lib/components/inputs/FormLabel';
import SelectTextField, { Option } from 'web-components/lib/components/inputs/SelectTextField';
import Toggle from 'web-components/lib/components/inputs/Toggle';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';

import { countries } from '../../lib/countries';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    borderRadius: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: 0,
      paddingBottom: theme.spacing(7.5),
      paddingLeft: theme.spacing(7.5),
      paddingRight: theme.spacing(7.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(6),
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  btn: {
    marginTop: theme.spacing(4),
    width: '100%',
  },
  cardContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  description: {
    fontSize: theme.typography.pxToRem(16),
    '& a': {
      cursor: 'pointer',
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      // marginBottom: theme.spacing(10),
    },
  },
  field: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(12),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(10),
    },
  },
  groupTitle: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      // marginBottom: theme.spacing(10),
    },
  },
  error: {
    marginTop: 0,
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
}));

interface BuyCreditsModalProps extends RegenModalProps {
  onClose: () => void;
  initialValues?: BuyCreditsValues;
}

export interface BuyCreditsValues {
  retirementBeneficiary: string;
  city: string;
  state: string;
  country: string;
  retirementAction: string;
}

const BuyCreditsModal: React.FC<BuyCreditsModalProps> = ({ open, onClose, initialValues }) => {
  const styles = useStyles();
  const [stateOptions, setStateOptions] = useState<Option[]>([]);
  const initialCountry = 'US';

  const searchState = async (countryId: string): Promise<void> => {
    const resp = await axios({
      url: 'https://geodata.solutions/api/api.php?type=getStates&countryId=' + countryId,
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

  const submit = async (values: BuyCreditsValues): Promise<void> => {
    console.log('submit ', values);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.root}>
        <Title variant="h4" align="center" className={styles.title}>
          Buy Credits
        </Title>
        <Formik
          enableReinitialize
          validateOnMount
          initialValues={
            initialValues || {
              retirementBeneficiary: '',
              city: '',
              state: '',
              country: initialCountry,
              retirementAction: 'autoretire',
            }
          }
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              await submit(values);
              setSubmitting(false);
            } catch (e) {
              setSubmitting(false);
            }
          }}
        >
          {({ submitForm, isValid, isSubmitting, values }) => {
            console.log('values["retirementAction"]', values['retirementAction']);
            return (
              <>
                <Form translate="yes">
                  <Title variant="h5">Retirement of Credits</Title>
                  <Field className={cx(styles.field)} component={RadioGroup} name="retirementAction">
                    <Field
                      component={Toggle}
                      type="radio"
                      value="autoretire"
                      checked={values['retirementAction'] === 'autoretire'}
                      label="Auto-retire credits"
                      description="These credits will be retired upon purchase and will not be tradeable."
                    />
                    <Field
                      component={Toggle}
                      type="radio"
                      value="manual"
                      checked={values['retirementAction'] === 'manual'}
                      label="Retire credits manually"
                      description="These credits will be a tradeable asset. They can be retired later via Regen Registry."
                    />
                  </Field>
                  <Title className={styles.groupTitle} variant="h5">
                    Retirement Beneficiary
                  </Title>
                  <Field
                    className={styles.field}
                    component={ControlledTextField}
                    label="Your name or organization name"
                    description="Please note that this name will be publically viewable on the ledger."
                    name="retirementBeneficiary"
                    optional
                  />
                  <Title className={styles.groupTitle} variant="h5">
                    Credit Retirement Location
                  </Title>
                  <Description className={styles.description}>
                    Please enter a location for the retirement of these credits. This prevents{' '}
                    <a href="#">double counting</a> of credits in different locations. These credits will
                    auto-retire.
                  </Description>
                  <Field
                    // className={styles.cityTextField}
                    component={ControlledTextField}
                    label="City"
                    name="city"
                  />
                  <Grid container alignItems="center" className={cx(styles.stateCountryGrid, styles.field)}>
                    <Grid item xs={12} sm={6} className={styles.stateCountryTextField}>
                      <Field
                        options={stateOptions}
                        component={SelectTextField}
                        label="State / Province / Region"
                        name="state"
                        // errors={matches}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} className={styles.stateCountryTextField}>
                      <Field
                        component={SelectTextField}
                        options={Object.keys(countries).map(key => ({ value: key, label: countries[key] }))}
                        name="country"
                        label="Country"
                        triggerOnChange={searchState}
                        // errors={matches}
                      />
                    </Grid>
                  </Grid>
                </Form>
                <ContainedButton onClick={submitForm}>purchase</ContainedButton>
              </>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};

export { BuyCreditsModal };
