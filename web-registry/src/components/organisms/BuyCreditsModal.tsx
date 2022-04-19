import React from 'react';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import { Formik, Form, Field } from 'formik';
import { RadioGroup } from 'formik-mui';
import cx from 'clsx';
import ReactHtmlParser from 'react-html-parser';

import Modal, { RegenModalProps } from 'web-components/lib/components/modal';
import Card from 'web-components/lib/components/cards/Card';
import {
  BodyText,
  Subtitle,
  Title,
} from 'web-components/lib/components/typography';
import Toggle from 'web-components/lib/components/inputs/Toggle';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import NumberTextField from 'web-components/lib/components/inputs/NumberTextField';
import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';
import InfoIcon from 'web-components/lib/components/icons/InfoIcon';
import { Label } from 'web-components/lib/components/typography';
import { Image } from 'web-components/lib/components/image';
import Submit from 'web-components/lib/components/form/Submit';
import Tooltip from 'web-components/lib/components/tooltip/InfoTooltip';
import LocationCountryField from 'web-components/lib/components/inputs/LocationCountryField';
import LocationStateField from 'web-components/lib/components/inputs/LocationStateField';

import { useWallet } from '../../lib/wallet';
import { Box } from '@mui/material';

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
  thumbnailCard: {
    display: 'flex',
    alignItems: 'center',
    height: theme.spacing(26.75),
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
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
      fontSize: theme.typography.pxToRem(14),
    },
  },
  field: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(12),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(10),
    },
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
  creditWidget: {
    display: 'flex',
    alignItems: 'center',
  },
  regenIcon: {
    height: theme.typography.pxToRem(26),
    alignSelf: 'flex-start',
    marginRight: theme.spacing(1.5),
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

export interface Credits {
  purchased: number;
  issued: number; // total number of issued credits
}

interface BuyCreditsModalProps extends RegenModalProps {
  onTxQueued: (txBytes: Uint8Array) => void;
  initialValues?: BuyCreditsValues;
  project: {
    id: string;
    name?: string | null;
    image?: string;
    creditDenom?: string;
    credits?: Credits;
  };
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
  onTxQueued,
  initialValues,
  project,
  apiServerUrl,
  imageStorageBaseUrl,
}) => {
  const styles = useStyles();
  const walletContext = useWallet();

  const submit = async (values: BuyCreditsValues): Promise<void> => {
    const recipient = 'regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4'; // test account
    const amount = values.creditCount;
    if (walletContext.signSend && walletContext.broadcast) {
      const txBytes = await walletContext.signSend(amount, recipient);
      onTxQueued(txBytes);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.root}>
        <Title
          variant="h3"
          align="center"
          sx={{ pt: 0, pb: { xs: 6, sm: 7.5 }, px: { xs: 0, sm: 7.5 } }}
        >
          Buy Credits
        </Title>
        <Card className={cx(styles.thumbnailCard, styles.field)}>
          <CardContent className={styles.cardContent}>
            <Image
              className={cx(styles.projectThumbnail, styles.marginRight)}
              src={
                project.image ||
                'https://regen-registry.s3.amazonaws.com/projects/wilmot/time-controlled-rotational-grazing.jpg'
              } // TODO: more generic fallback
              imageStorageBaseUrl={imageStorageBaseUrl}
              apiServerUrl={apiServerUrl}
              backgroundImage
            />
            <div className={styles.flexColumn}>
              <Title sx={{ fontSize: { xs: 16, sm: 21 } }}>
                {project.creditDenom && ReactHtmlParser(project.creditDenom)}{' '}
                Credits
              </Title>
              <Subtitle size="lg" mobileSize="xs">
                <Link to={`/projects/${project.id}`} target="_blank">
                  {project.name}
                </Link>
              </Subtitle>
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
              country: '',
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
          {({ values, submitForm, isValid, isSubmitting, submitCount }) => {
            return (
              <div>
                <Form translate="yes">
                  <div className={styles.field}>
                    <Title variant="h5" sx={{ mb: 2, mr: 2 }}>
                      Number of credits
                    </Title>
                    <BodyText
                      size="md"
                      mobileSize="md"
                      sx={{ color: 'info.main', mb: 3 }}
                    >
                      {`5 REGEN each.  ${
                        (project?.credits?.issued || 0) -
                        (project?.credits?.purchased || 0)
                      } credits available`}
                    </BodyText>
                    <div className={styles.creditWidget}>
                      <div className={styles.marginRight}>
                        <Field
                          className={cx(styles.creditInput)}
                          component={NumberTextField}
                          name="creditCount"
                        />
                      </div>
                      <Title variant="h6" sx={{ mr: 4 }}>
                        =
                      </Title>
                      <div
                        className={cx(styles.flexColumn, styles.marginRight)}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                          <RegenTokenIcon className={styles.regenIcon} />
                          <Title variant="h4" sx={{ mr: 1.5 }}>
                            500
                          </Title>
                          <Label sx={{ fontSize: { xs: 12, sm: 14 } }}>
                            REGEN
                          </Label>
                        </Box>
                        <BodyText
                          size="md"
                          mobileSize="md"
                          sx={{ color: 'info.dark' }}
                        >
                          ($2345.00 USD)
                        </BodyText>
                      </div>
                    </div>
                  </div>
                  <Title variant="h5" sx={{ mb: 2, mr: 2 }}>
                    Retirement of credits
                  </Title>
                  <Field
                    className={styles.field}
                    component={RadioGroup}
                    name="retirementAction"
                  >
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
                    <Title variant="h5" sx={{ mb: 2, mr: 2 }}>
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
                      <Title variant="h5" sx={{ mb: 2, mr: 2 }}>
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
                    <BodyText sx={{ color: 'info.dark', mb: { xs: 0, sm: 3 } }}>
                      Please enter a location for the retirement of these
                      credits. This prevents double counting of credits in
                      different locations. These credits will auto-retire.
                    </BodyText>
                    <Grid container className={styles.stateCountryGrid}>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        className={styles.stateCountryTextField}
                      >
                        <LocationStateField country={values.country} optional />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        className={styles.stateCountryTextField}
                      >
                        <LocationCountryField />
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
