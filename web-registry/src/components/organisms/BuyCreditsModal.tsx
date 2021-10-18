import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { RadioGroup } from 'formik-material-ui';
import cx from 'clsx';
import ReactHtmlParser from 'react-html-parser';

import Modal, { RegenModalProps } from 'web-components/lib/components/modal';
import Card from 'web-components/lib/components/cards/Card';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import SelectTextField, { Option } from 'web-components/lib/components/inputs/SelectTextField';
import Toggle from 'web-components/lib/components/inputs/Toggle';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import NumberTextField from 'web-components/lib/components/inputs/NumberTextField';
import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';
import InfoIcon from 'web-components/lib/components/icons/InfoIcon';
import { Label } from 'web-components/lib/components/label';
import { Image } from 'web-components/lib/components/image';
import Submit from 'web-components/lib/components/form/Submit';
import Tooltip from 'web-components/lib/components/tooltip/InfoTooltip';

import { countries } from '../../lib/countries';
import { Project } from '../../mocks';
import fallbackImage from '../../assets/time-controlled-rotational-grazing.jpg'; //TODO: more generic fallback

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    borderRadius: theme.spacing(2),
  },
  flex: {
    display: 'flex',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  mainTitle: {
    paddingTop: 0,
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(7.5),
      paddingLeft: theme.spacing(7.5),
      paddingRight: theme.spacing(7.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(6),
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  formWrapper: {
    paddingBottom: theme.spacing(12),
  },
  thumbnailCard: {
    display: 'flex',
    alignItems: 'center',
    height: theme.spacing(26.75),
    '& a': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      fontWeight: 700,
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(18),
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.typography.pxToRem(12),
      },
    },
  },
  creditTitle: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    '&:last-child': {
      paddingBottom: theme.spacing(4),
    },
  },
  projectThumbnail: {
    height: theme.spacing(12.5),
    width: theme.spacing(12.5),
    borderRadius: 5,
  },
  description: {
    '& a': {
      cursor: 'pointer',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(16),
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: 0,
      fontSize: theme.typography.pxToRem(14),
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
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
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
  postalCodeField: {
    marginTop: theme.spacing(6),
  },
  creditInput: {
    width: theme.spacing(42.5),
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
  regenIcon: {
    height: theme.typography.pxToRem(26),
    alignSelf: 'flex-start',
    marginRight: theme.spacing(1.5),
  },
  regenCount: {
    display: 'flex',
    alignItems: 'baseline',
  },
  regenCountNumber: {
    marginRight: theme.spacing(1.5),
  },
  regenLabel: {
    [theme.breakpoints.up('sm')]: {
      lineHeight: '18px',
      fontSize: theme.typography.pxToRem(14),
    },
    [theme.breakpoints.down('xs')]: {
      lineHeight: '15.06px',
      letterSpacing: '1px',
      fontSize: theme.typography.pxToRem(12),
    },
  },
  currencyEquivalent: {
    color: theme.palette.info.dark,
    fontSize: theme.typography.pxToRem(16),
  },
  marginRight: {
    marginRight: theme.spacing(4),
  },
  info: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: theme.typography.pxToRem(16),
  },
  toggle: {
    backgroundColor: theme.palette.primary.main,
  },
}));

interface BuyCreditsModalProps extends RegenModalProps {
  onClose: () => void;
  initialValues?: BuyCreditsValues;
  project: Project;
  apiServerUrl?: string;
  imageStorageBaseUrl?: string;
}

export interface BuyCreditsValues {
  retirementBeneficiary: string;
  stateProvince: string;
  country: string;
  postalCode: string;
  retirementAction: string;
  creditCount: number;
}

const BuyCreditsModal: React.FC<BuyCreditsModalProps> = ({
  open,
  onClose,
  initialValues,
  project,
  apiServerUrl,
  imageStorageBaseUrl,
}) => {
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
    // console.log('submit ', values); TODO: purchase flow
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.root}>
        <Title variant="h3" align="center" className={styles.mainTitle}>
          Buy Credits
        </Title>
        <Card className={cx(styles.thumbnailCard, styles.field)}>
          <CardContent className={styles.cardContent}>
            <Image
              className={cx(styles.projectThumbnail, styles.marginRight)}
              src={project.creditClass?.imgSrc || fallbackImage}
              imageStorageBaseUrl={imageStorageBaseUrl}
              apiServerUrl={apiServerUrl}
              backgroundImage
            />
            <div className={styles.flexColumn}>
              <Title className={styles.creditTitle} variant="h5">
                {ReactHtmlParser(project.creditClass.name)} Credits
              </Title>
              <Link to={`/projects/${project.id}`} target="_blank">
                {project.name}
              </Link>
            </div>
          </CardContent>
        </Card>
        <Formik
          enableReinitialize
          validateOnMount
          initialValues={
            initialValues || {
              creditCount: 0,
              retirementBeneficiary: '',
              stateProvince: '',
              country: initialCountry,
              postalCode: '',
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
          {({ submitForm, isValid, isSubmitting, submitCount, values }) => {
            return (
              <div className={styles.formWrapper}>
                <Form translate="yes">
                  <div className={styles.field}>
                    <Title className={styles.groupTitle} variant="h5">
                      Number of credits
                    </Title>
                    <Description className={styles.regenPerCredit}>
                      {`5 REGEN each.  ${(project?.credits?.issued || 0) -
                        (project?.credits?.purchased || 0)} credits available`}
                    </Description>
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
                      <div className={cx(styles.flexColumn, styles.marginRight)}>
                        <div className={styles.regenCount}>
                          <RegenTokenIcon className={styles.regenIcon} />
                          <Title variant="h4" className={styles.regenCountNumber}>
                            500
                          </Title>
                          <Label className={styles.regenLabel}>REGEN</Label>
                        </div>
                        <div className={styles.currencyEquivalent}>($2345.00 USD)</div>
                      </div>
                    </div>
                  </div>
                  <Title className={styles.groupTitle} variant="h5">
                    Retirement of credits
                  </Title>
                  <Field className={styles.field} component={RadioGroup} name="retirementAction">
                    <Field
                      className={styles.toggle}
                      component={Toggle}
                      type="radio"
                      value="autoretire"
                      checked={values['retirementAction'] === 'autoretire'}
                      label="Auto-retire credits"
                      description="These credits will be retired upon purchase and will not be tradeable."
                    />
                    <Field
                      className={styles.toggle}
                      component={Toggle}
                      type="radio"
                      value="manual"
                      checked={values['retirementAction'] === 'manual'}
                      label="Retire credits manually"
                      description="These credits will be a tradeable asset. They can be retired later via Regen Registry."
                    />
                  </Field>
                  <Collapse in={values['retirementAction'] === 'autoretire'}>
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
                    <div className={styles.flex}>
                      <Title className={styles.groupTitle} variant="h5">
                        Credit retirement location
                      </Title>
                      <Tooltip
                        arrow
                        placement="top"
                        title="The retirement location can be where you live or your business operates."
                      >
                        <div>
                          <InfoIcon className={styles.info} />
                        </div>
                      </Tooltip>
                    </div>
                    <Description className={styles.description}>
                      Please enter a location for the retirement of these credits. This prevents double
                      counting of credits in different locations. These credits will auto-retire.
                    </Description>
                    <Grid container alignItems="center" className={styles.stateCountryGrid}>
                      <Grid item xs={12} sm={6} className={styles.stateCountryTextField}>
                        <Field
                          options={stateOptions}
                          component={SelectTextField}
                          label="State / Region"
                          name="stateProvince"
                          optional
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} className={styles.stateCountryTextField}>
                        <Field
                          component={SelectTextField}
                          options={Object.keys(countries).map(key => ({
                            value: key,
                            label: countries[key],
                          }))}
                          name="country"
                          label="Country"
                          triggerOnChange={searchState}
                        />
                      </Grid>
                    </Grid>
                    <Field
                      className={cx(styles.field, styles.postalCodeField)}
                      component={ControlledTextField}
                      label="Postal Code"
                      name="postalCode"
                      optional
                    />
                  </Collapse>
                </Form>
                <Submit
                  isSubmitting={isSubmitting}
                  onClose={onClose}
                  // status={status} TODO
                  isValid={isValid}
                  submitCount={submitCount}
                  submitForm={submitForm}
                  label="purchase"
                />
              </div>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};

export { BuyCreditsModal };
