import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import cx from 'clsx';
import { Field, Form, Formik } from 'formik';
import { RadioGroup } from 'formik-mui';

import Card from 'web-components/lib/components/cards/Card';
import Submit from 'web-components/lib/components/form/Submit';
import InfoIcon from 'web-components/lib/components/icons/InfoIcon';
import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';
import { Image } from 'web-components/lib/components/image';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import LocationCountryField from 'web-components/lib/components/inputs/LocationCountryField';
import LocationStateField from 'web-components/lib/components/inputs/LocationStateField';
import NumberTextField from 'web-components/lib/components/inputs/NumberTextField';
import SelectTextField from 'web-components/lib/components/inputs/SelectTextField';
import Toggle from 'web-components/lib/components/inputs/Toggle';
import Modal, { RegenModalProps } from 'web-components/lib/components/modal';
import Tooltip from 'web-components/lib/components/tooltip/InfoTooltip';
import {
  Body,
  Label,
  Subtitle,
  Title,
} from 'web-components/lib/components/typography';

import { useWallet } from '../../../lib/wallet';
import { BUY_CREDITS_MODAL_DEFAULT_VALUES } from './BuyCreditsModal.constants';
import { useBuyCreditsModalStyles } from './BuyCreditsModal.styles';
import { getSellOrderLabel } from './BuyCreditsModal.utils';

export interface Credits {
  purchased: number;
  issued: number; // total number of issued credits
}

interface BuyCreditsModalProps extends RegenModalProps {
  open: boolean;
  onClose: () => void;
  onTxQueued?: (txBytes: Uint8Array) => void;
  onSubmit?: (values: any) => Promise<void>;
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
  retirementNote: string;
  stateProvince: string;
  country: string;
  postalCode: string;
  retirementAction: string;
  creditCount: number;
  price: number;
  askDenom: string;
  batchDenom: string;
  sellOrderId: string;
}

const BuyCreditsModal: React.FC<BuyCreditsModalProps> = ({
  open,
  onSubmit,
  onClose,
  onTxQueued,
  initialValues,
  project,
  apiServerUrl,
  imageStorageBaseUrl,
}) => {
  const styles = useBuyCreditsModalStyles();
  const theme = useTheme();
  const walletContext = useWallet();

  const submit = async (values: BuyCreditsValues): Promise<void> => {
    const recipient = 'regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4'; // test account
    const amount = values.creditCount;
    if (onSubmit) {
      onSubmit(values);
    } else if (walletContext.signSend && walletContext.broadcast) {
      const txBytes = await walletContext.signSend(amount, recipient);
      onTxQueued && onTxQueued(txBytes);
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
          {'Buy Ecocredits'}
        </Title>
        {project.name && (
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
        )}
        <Formik
          enableReinitialize
          validateOnMount
          initialValues={initialValues || BUY_CREDITS_MODAL_DEFAULT_VALUES}
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
                  <Title variant="h5" sx={{ mb: 2, mr: 2 }}>
                    {'Sell order ID'}
                  </Title>
                  <Field
                    name="sellOrderId"
                    component={SelectTextField}
                    options={[
                      {
                        label: getSellOrderLabel(initialValues),
                        value: initialValues?.sellOrderId,
                      },
                    ]}
                    sx={{ mb: theme.spacing(10.5) }}
                    disabled
                  />
                  <div className={styles.field}>
                    <Title variant="h5" sx={{ mb: 2, mr: 2 }}>
                      Amount of credits
                    </Title>
                    <Body
                      size="md"
                      mobileSize="md"
                      sx={{
                        color: 'primary.contrastText',
                        fontWeight: 700,
                        mb: 3,
                      }}
                    >
                      {`${initialValues?.price} REGEN/per credit `}
                    </Body>
                    <Body
                      size="md"
                      sx={{ color: 'primary.light', fontWeight: 700, mb: 3 }}
                    >
                      Batch denom:{' '}
                      <Body
                        sx={{ fontWeight: 'normal', display: 'inline-block' }}
                      >
                        {initialValues?.batchDenom}
                      </Body>
                    </Body>
                    <div className={styles.creditWidget}>
                      <div className={styles.marginRight}>
                        <Field
                          className={cx(styles.creditInput)}
                          component={NumberTextField}
                          name="creditCount"
                          min={1}
                          max={initialValues?.creditCount}
                        />
                      </div>
                      <Title variant="h6" sx={{ mr: 4 }}>
                        =
                      </Title>
                      <div
                        className={cx(styles.flexColumn, styles.marginRight)}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'baseline',
                            flexWrap: 'wrap',
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                            <RegenTokenIcon className={styles.regenIcon} />
                            <Title variant="h4" sx={{ mr: 1.5 }}>
                              {values.creditCount * (initialValues?.price ?? 0)}
                            </Title>
                          </Box>
                          <Label size="sm" sx={{ color: 'info.dark' }}>
                            {'REGEN'}
                          </Label>
                        </Box>
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
                      description="These credits will be retired upon purchase and will not be tradeable. Retirement is permanent and non-reversible."
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
                      Retirement note
                    </Title>
                    <Field
                      className={styles.field}
                      component={ControlledTextField}
                      label="Add retirement transaction details (stored in the tx memo)"
                      name="retirementNote"
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
                    <Body sx={{ color: 'info.dark', mb: { xs: 0, sm: 3 } }}>
                      Please enter a location for the retirement of these
                      credits. This prevents double counting of credits in
                      different locations. These credits will auto-retire.
                    </Body>
                    <Grid container className={styles.stateCountryGrid}>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        className={styles.stateCountryTextField}
                      >
                        <LocationCountryField />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        className={styles.stateCountryTextField}
                      >
                        <LocationStateField country={values.country} optional />
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
