import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { RadioGroup } from 'formik-material-ui';
import cx from 'clsx';

import Modal, { RegenModalProps } from 'web-components/lib/components/modal';
import Card from 'web-components/lib/components/cards/Card';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import SelectTextField, { Option } from 'web-components/lib/components/inputs/SelectTextField';
import Toggle from 'web-components/lib/components/inputs/Toggle';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import NumberTextField from 'web-components/lib/components/inputs/NumberTextField';
import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';
import { Label } from 'web-components/lib/components/label';
import { Image } from 'web-components/lib/components/image';

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

  thumbnailCard: {
    display: 'flex',
    alignItems: 'center',
    height: 107,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    '&:last-child': {
      paddingBottom: theme.spacing(4),
    },
  },
  projectThumbnail: {
    height: 50, //todo
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

  creditInput: {
    width: 170, //todo
  },
  regenPerCredit: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.info.main,
    marginBottom: theme.spacing(3),
  },

  creditWidget: {
    display: 'flex',
    alignItems: 'center',
  },
  regenDisplay: {
    display: 'flex',
    flexDirection: 'column',
  },
  regenCount: {
    display: 'flex',
    alignItems: 'baseline',
  },
  regenCountNumber: {
    marginRight: theme.spacing(2),
  },
  currencyEquivalent: {
    color: theme.palette.info.dark,
    fontSize: theme.typography.pxToRem(16),
  },
  icon: {
    height: theme.typography.pxToRem(26),
    alignSelf: 'flex-start',
    marginRight: theme.spacing(2),
  },
  regenLabel: {
    color: theme.palette.info.dark,
    fontSize: theme.typography.pxToRem(14),
    marginRight: theme.spacing(2),
    lineHeight: '18px',
  },
  marginRight: {
    marginRight: theme.spacing(4),
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
  creditCount: number;
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
              creditCount: 0,
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
            return (
              <>
                <Card className={cx(styles.thumbnailCard, styles.field)}>
                  <Image
                    className={styles.projectThumbnail}
                    src={''}
                    // alt={imageAlt}
                    // imageStorageBaseUrl={imageStorageBaseUrl}
                    // apiServerUrl={apiServerUrl}
                  />
                  <CardContent className={styles.cardContent}>
                    <Title variant="h5">CarbonPlus Grassland Credits</Title>
                    <Description>Wilmot</Description>
                  </CardContent>
                </Card>

                <Form translate="yes">
                  <div className={styles.field}>
                    <Title className={styles.groupTitle} variant="h5">
                      Number of credits
                    </Title>
                    <Description className={styles.regenPerCredit}>5 REGEN each</Description>
                    <div className={styles.creditWidget}>
                      <div className={styles.marginRight}>
                        <Field
                          className={cx(styles.creditInput)}
                          component={NumberTextField}
                          name="creditCount"
                        />
                      </div>
                      <Title className={styles.marginRight} variant="h6">
                        =
                      </Title>
                      <div className={cx(styles.regenDisplay, styles.marginRight)}>
                        <div className={styles.regenCount}>
                          <RegenTokenIcon className={styles.icon} />
                          <Title variant="h4" className={styles.regenCountNumber}>
                            500
                          </Title>
                          <Label className={styles.regenLabel}>REGEN</Label>
                        </div>
                        <div className={styles.currencyEquivalent}>($2345.00 USD)</div>
                      </div>
                    </div>
                  </div>
                  <Title variant="h5">Retirement of credits</Title>
                  <Field className={styles.field} component={RadioGroup} name="retirementAction">
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
                    Retirement beneficiary
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
                    Credit retirement location
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
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} className={styles.stateCountryTextField}>
                      <Field
                        component={SelectTextField}
                        options={Object.keys(countries).map(key => ({ value: key, label: countries[key] }))}
                        name="country"
                        label="Country"
                        triggerOnChange={searchState}
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
