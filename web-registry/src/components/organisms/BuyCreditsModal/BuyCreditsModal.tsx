import React, { lazy, Suspense, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link, useLocation } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import { QueryAllowedDenomsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import cx from 'clsx';
import { Field, Form, Formik, FormikErrors } from 'formik';
import { RadioGroup } from 'formik-mui';
import { useAnalytics } from 'use-analytics';

import { Flex } from 'web-components/lib/components/box';
import Card from 'web-components/lib/components/cards/Card';
import Submit from 'web-components/lib/components/form/Submit';
import { Image } from 'web-components/lib/components/image';
import AgreeErpaCheckbox from 'web-components/lib/components/inputs/AgreeErpaCheckbox';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import NumberTextField from 'web-components/lib/components/inputs/NumberTextField';
import SelectFieldFallback from 'web-components/lib/components/inputs/SelectFieldFallback';
import SelectTextField from 'web-components/lib/components/inputs/SelectTextField';
import TextField from 'web-components/lib/components/inputs/TextField';
import Toggle from 'web-components/lib/components/inputs/Toggle';
import {
  invalidMemoLength,
  requirementAgreement,
  validateMemoLength,
} from 'web-components/lib/components/inputs/validation';
import Modal, { RegenModalProps } from 'web-components/lib/components/modal';
import InfoTooltipWithIcon from 'web-components/lib/components/tooltip/InfoTooltipWithIcon';
import {
  Body,
  Subtitle,
  Title,
} from 'web-components/lib/components/typography';
import { getFormattedNumber } from 'web-components/lib/utils/format';

import { microToDenom } from 'lib/denom.utils';

import { UISellOrderInfo } from 'pages/Projects/Projects.types';
import { Link as DynamicLink } from 'components/atoms/Link';
import DenomIcon from 'components/molecules/DenomIcon';
import DenomLabel from 'components/molecules/DenomLabel';
import { findDisplayDenom } from 'components/molecules/DenomLabel/DenomLabel.utils';
import useMarketplaceQuery from 'hooks/useMarketplaceQuery';

import { BUY_CREDITS_MODAL_DEFAULT_VALUES } from './BuyCreditsModal.constants';
import { SetSelectedSellOrderElement } from './BuyCreditsModal.SetSelectedSellOrderElement';
import { useBuyCreditsModalStyles } from './BuyCreditsModal.styles';
import {
  amountToSpend,
  getCreditCountValidation,
  getOptions,
  handleBuyCreditsSubmit,
} from './BuyCreditsModal.utils';

const LocationCountryField = lazy(
  () => import('web-components/lib/components/inputs/LocationCountryField'),
);
const LocationStateField = lazy(
  () => import('web-components/lib/components/inputs/LocationStateField'),
);

export interface Credits {
  purchased: number;
  issued: number; // total number of issued credits
}

interface BuyCreditsModalProps extends RegenModalProps {
  open: boolean;
  onClose: () => void;
  onTxQueued?: (txBytes: Uint8Array) => void;
  onSubmit?: (values: BuyCreditsValues) => Promise<void>;
  initialValues?: BuyCreditsValues;
  project: BuyCreditsProject;
  apiServerUrl?: string;
  imageStorageBaseUrl?: string;
}

export interface BuyCreditsProject {
  id: string;
  name?: string | null;
  image?: string;
  creditDenom?: string;
  credits?: Credits;
  sellOrders?: UISellOrderInfo[];
}

export interface BuyCreditsValues {
  retirementNote?: string;
  stateProvince?: string;
  country: string;
  postalCode?: string;
  retirementAction?: string;
  creditCount: number;
  price?: number;
  askDenom?: string;
  batchDenom?: string;
  sellOrderId: string;
  agreeErpa: boolean;
}

const BuyCreditsModal: React.FC<BuyCreditsModalProps> = ({
  open,
  onSubmit,
  onClose,
  initialValues,
  project,
  apiServerUrl,
  imageStorageBaseUrl,
}) => {
  const styles = useBuyCreditsModalStyles();
  const theme = useTheme();
  const location = useLocation();
  const [selectedSellOrder, setSelectedSellOrder] = useState<
    UISellOrderInfo | undefined
  >(undefined);
  const { track } = useAnalytics();

  const validationHandler = (
    values: BuyCreditsValues,
  ): FormikErrors<BuyCreditsValues> => {
    let errors: FormikErrors<BuyCreditsValues> = {};

    if (values.retirementNote && !validateMemoLength(values.retirementNote)) {
      errors.retirementNote = invalidMemoLength;
    }

    if (!values.agreeErpa) errors.agreeErpa = requirementAgreement;

    return errors;
  };

  const allowedDenomsResponse = useMarketplaceQuery<QueryAllowedDenomsResponse>(
    {
      query: 'allowedDenoms',
      params: {},
    },
  );

  const sellOrdersOptions = getOptions({
    project,
    allowedDenomsData: allowedDenomsResponse?.data,
  });

  const isDisableAutoRetire = selectedSellOrder?.disableAutoRetire;

  const handleClose = (): void => {
    setSelectedSellOrder(undefined);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
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
          validate={validationHandler}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            if (location.pathname.includes('projects')) {
              const track_data: any = {
                price: selectedSellOrder?.askAmount,
                batchDenom: selectedSellOrder?.batchDenom,
                projectName: project.name,
                creditClassName: project.id.split('-')[0],
              };
              if (values.retirementAction === 'manual') {
                track_data['amountTradable'] = getFormattedNumber(
                  values.creditCount,
                );
                track_data['amountRetired'] = getFormattedNumber(0);
              } else if (values.retirementAction === 'autoretire') {
                track_data['amountTradable'] = getFormattedNumber(
                  values.creditCount,
                );
                track_data['amountRetired'] = getFormattedNumber(0);
              }
              track('buy2', track_data);
            }
            try {
              await handleBuyCreditsSubmit(values, onSubmit, selectedSellOrder);
              setSubmitting(false);
              setSelectedSellOrder(undefined);
            } catch (e) {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            submitForm,
            isValid,
            isSubmitting,
            status,
            submitCount,
          }) => {
            return (
              <div>
                <Form translate="yes">
                  <Title variant="h5" sx={{ mb: 2, mr: 2 }}>
                    {'Sell order'}
                  </Title>
                  <Field
                    name="sellOrderId"
                    component={SelectTextField}
                    options={sellOrdersOptions}
                    sx={{ mb: theme.spacing(10.5) }}
                    disabled={
                      !!initialValues?.sellOrderId ||
                      sellOrdersOptions?.length === 1
                    }
                    native={false}
                  />
                  <SetSelectedSellOrderElement
                    project={project}
                    selectedSellOrder={selectedSellOrder}
                    setSelectedSellOrder={setSelectedSellOrder}
                  />
                  <Collapse in={!!selectedSellOrder}>
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
                        {`${microToDenom(
                          selectedSellOrder?.askAmount || '',
                        )} ${findDisplayDenom({
                          allowedDenomsData: allowedDenomsResponse?.data,
                          denom: selectedSellOrder?.askDenom ?? '',
                        })}/credit`}
                      </Body>
                      <Body
                        size="md"
                        sx={{ color: 'primary.light', fontWeight: 700, mb: 3 }}
                      >
                        {'Batch denom: '}
                        <Body
                          sx={{ fontWeight: 'normal', display: 'inline-block' }}
                        >
                          {selectedSellOrder?.batchDenom}
                        </Body>
                      </Body>
                      <div className={styles.creditWidget}>
                        <div className={styles.marginRight}>
                          <Field
                            className={styles.creditInput}
                            component={NumberTextField}
                            name="creditCount"
                            min={1}
                            max={selectedSellOrder?.quantity}
                            validate={getCreditCountValidation(
                              Number(selectedSellOrder?.quantity),
                            )}
                          />
                        </div>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: 60,
                          }}
                        >
                          <Title variant="h6" sx={{ mr: 4 }}>
                            =
                          </Title>
                          <div
                            className={cx(
                              styles.flexColumn,
                              styles.marginRight,
                            )}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'baseline',
                              }}
                            >
                              <DenomIcon
                                denom={selectedSellOrder?.askBaseDenom ?? ''}
                                sx={{ mr: 1.5, mt: 1, alignSelf: 'flex-start' }}
                                iconSx={{ height: 26 }}
                              />
                              <Title variant="h4" sx={{ mr: 1.5 }}>
                                {amountToSpend({
                                  askAmount: selectedSellOrder?.askAmount,
                                  creditCount: values.creditCount,
                                })}
                              </Title>
                              <DenomLabel
                                denom={
                                  findDisplayDenom({
                                    allowedDenomsData:
                                      allowedDenomsResponse?.data,
                                    denom: selectedSellOrder?.askDenom ?? '',
                                  }) ?? ''
                                }
                                size="sm"
                                sx={{ color: 'info.dark' }}
                              />
                            </Box>
                          </div>
                        </Box>
                      </div>
                    </div>
                  </Collapse>
                  <Title variant="h5" sx={{ mb: 2, mr: 2 }}>
                    Purchase options
                  </Title>
                  <Field
                    className={styles.field}
                    component={RadioGroup}
                    name="retirementAction"
                  >
                    <Field
                      component={Toggle}
                      type="radio"
                      value="autoretire"
                      checked={values['retirementAction'] === 'autoretire'}
                      label="Retire credits now"
                      description={
                        <>
                          {
                            'These credits will be retired upon purchase and will not be tradable. Retirement is permanent and non-reversible.'
                          }
                          <DynamicLink
                            href="https://guides.regen.network/guides/regen-marketplace/ecocredits/buy-ecocredits/by-project#5.-select-credit-retirement-options"
                            sx={{ ml: 1 }}
                          >
                            Learn more»
                          </DynamicLink>
                        </>
                      }
                    />
                    <Field
                      component={Toggle}
                      type="radio"
                      value="manual"
                      checked={values['retirementAction'] === 'manual'} // if disableAutoRetire, this is an option
                      label="Buy tradable ecocredits"
                      description={
                        <>
                          {
                            'These credits will be a tradable asset. They can be retired later via Regen Marketplace.'
                          }
                          <DynamicLink
                            href="https://guides.regen.network/guides/regen-marketplace/ecocredits/buy-ecocredits/by-project#5.-select-credit-retirement-options"
                            sx={[
                              {
                                ml: 1,
                              },
                              !isDisableAutoRetire && {
                                color: 'info.main',
                                fontWeight: 700,
                              },
                            ]}
                          >
                            Learn more»
                          </DynamicLink>
                        </>
                      }
                      disabled={!isDisableAutoRetire} // if disableAutoRetire is false, this is disabled
                      tooltip={
                        !isDisableAutoRetire ? (
                          <Box sx={{ textAlign: 'start' }}>
                            {
                              'The seller of these credits has chosen to only allow for immediate retiring of credits. These credits cannot be purchased as a tradable asset.'
                            }
                            <DynamicLink
                              href="https://guides.regen.network/guides/regen-marketplace/ecocredits/buy-ecocredits/by-project#5.-select-credit-retirement-options"
                              sx={{
                                ml: 1,
                                display: 'inline',
                                color: 'secondary.main',
                                fontWeight: 700,
                              }}
                            >
                              Learn more»
                            </DynamicLink>
                          </Box>
                        ) : undefined
                      }
                    />
                  </Field>
                  <Collapse in={values['retirementAction'] === 'autoretire'}>
                    <Flex>
                      <Title variant="h5" sx={{ mb: 2, mr: 2 }}>
                        Retirement note
                      </Title>
                      <InfoTooltipWithIcon title="You can add the name of the organization or person you are retiring the credits on behalf of here (i.e. 'Retired on behalf of ABC Organization')" />
                    </Flex>
                    <Flex>
                      <Field
                        component={TextField}
                        label="Add retirement transaction details (stored in the tx memo)"
                        name="retirementNote"
                        optional
                        sx={{ mb: { xs: 10, sm: 12 } }}
                      />
                    </Flex>
                    <Flex>
                      <Title variant="h5" sx={{ mb: 2, mr: 2 }}>
                        Credit retirement location
                      </Title>
                      <InfoTooltipWithIcon title="The retirement location can be where you live or your business operates." />
                    </Flex>
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
                        <Suspense
                          fallback={
                            <SelectFieldFallback
                              label="Country"
                              name="country"
                            />
                          }
                        >
                          <LocationCountryField />
                        </Suspense>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        className={styles.stateCountryTextField}
                      >
                        <Suspense
                          fallback={
                            <SelectFieldFallback
                              label="State / Region"
                              name="state"
                            />
                          }
                        >
                          <LocationStateField
                            country={values.country}
                            optional
                          />
                        </Suspense>
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

                  <AgreeErpaCheckbox />
                </Form>
                <Submit
                  isSubmitting={isSubmitting}
                  onClose={handleClose}
                  status={status}
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
