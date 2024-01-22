import React, { lazy, Suspense, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link, useLocation } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import { useQuery } from '@tanstack/react-query';
import { Field, Form, Formik, FormikErrors } from 'formik';
import { RadioGroup } from 'formik-mui';

import { Flex } from 'web-components/src/components/box';
import Card from 'web-components/src/components/cards/Card';
import Submit from 'web-components/src/components/form/Submit';
import { Image } from 'web-components/src/components/image';
import ControlledTextField from 'web-components/src/components/inputs/ControlledTextField';
import NumberTextField from 'web-components/src/components/inputs/NumberTextField';
import SelectFieldFallback from 'web-components/src/components/inputs/SelectFieldFallback';
import SelectTextField from 'web-components/src/components/inputs/SelectTextField';
import TextField from 'web-components/src/components/inputs/TextField';
import Toggle from 'web-components/src/components/inputs/Toggle';
import {
  invalidMemoLength,
  requirementAgreement,
  validateMemoLength,
} from 'web-components/src/components/inputs/validation';
import Modal, { RegenModalProps } from 'web-components/src/components/modal';
import InfoTooltipWithIcon from 'web-components/src/components/tooltip/InfoTooltipWithIcon';
import {
  Body,
  Subtitle,
  Title,
} from 'web-components/src/components/typography';

import { useLedger } from 'ledger';
import { client } from 'lib/clients/sanity';
import { microToDenom } from 'lib/denom.utils';
import { getAllowedDenomQuery } from 'lib/queries/react-query/ecocredit/marketplace/getAllowedDenomQuery/getAllowedDenomQuery';
import { getBuyModalQuery } from 'lib/queries/react-query/sanity/getBuyModalQuery/getBuyModalQuery';
import { Buy2Event } from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

import { UISellOrderInfo } from 'pages/Projects/Projects.types';
import AgreeErpaCheckbox from 'components/atoms/AgreeErpaCheckbox';
import { Link as DynamicLink } from 'components/atoms/Link';
import DenomIcon from 'components/molecules/DenomIcon';
import DenomLabel from 'components/molecules/DenomLabel';
import { findDisplayDenom } from 'components/molecules/DenomLabel/DenomLabel.utils';

import { BUY_CREDITS_MODAL_DEFAULT_VALUES } from './BuyCreditsModal.constants';
import { BuyCreditsModalInfoCard } from './BuyCreditsModal.InfoCard';
import { SetSelectedSellOrderElement } from './BuyCreditsModal.SetSelectedSellOrderElement';
import { useBuyCreditsModalStyles } from './BuyCreditsModal.styles';
import {
  amountToSpend,
  getCreditCountValidation,
  getOptions,
  handleBuyCreditsSubmit,
} from './BuyCreditsModal.utils';
import { useFetchUserBalance } from './hooks/useFetchUserBalance';
import { useRefreshUserBalance } from './hooks/useRefreshUserBalance';

const LocationCountryField = lazy(
  () => import('web-components/src/components/inputs/LocationCountryField'),
);
const LocationStateField = lazy(
  () => import('web-components/src/components/inputs/LocationStateField'),
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
  sellOrders?: UISellOrderInfo[];
  project?: BuyCreditsProject;
  setSelectedProjectById?: (projectId: string) => void;
  apiServerUrl?: string;
  imageStorageBaseUrl?: string;
  isCommunityCredit?: boolean;
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
  retirementReason?: string;
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

const BuyCreditsModal: React.FC<React.PropsWithChildren<BuyCreditsModalProps>> =
  ({
    open,
    onSubmit,
    onClose,
    initialValues,
    sellOrders, // corresponding to one or more projects
    project, // is just suplemmentary data. If several projects involved, then is selected when sell order is selected
    setSelectedProjectById, // if several projects involved, handler to select the project when sell order is selected
    apiServerUrl,
    imageStorageBaseUrl,
    isCommunityCredit = false,
  }) => {
    const { classes, cx } = useBuyCreditsModalStyles();
    const theme = useTheme();
    const { marketplaceClient } = useLedger();
    const [selectedSellOrder, setSelectedSellOrder] = useState<
      UISellOrderInfo | undefined
    >(undefined);

    const { track } = useTracker();
    const location = useLocation();

    const { data: buyModalContent } = useQuery(
      getBuyModalQuery({ sanityClient: client }),
    );

    const userBalance = useFetchUserBalance({ selectedSellOrder });
    useRefreshUserBalance({ open });

    const validationHandler = (
      values: BuyCreditsValues,
    ): FormikErrors<BuyCreditsValues> => {
      let errors: FormikErrors<BuyCreditsValues> = {};

      if (
        values.retirementReason &&
        !validateMemoLength(values.retirementReason)
      ) {
        errors.retirementReason = invalidMemoLength;
      }

      if (!values.agreeErpa) errors.agreeErpa = requirementAgreement;

      return errors;
    };

    const { data: allowedDenomsData } = useQuery(
      getAllowedDenomQuery({
        client: marketplaceClient,
        enabled: !!marketplaceClient,
      }),
    );

    const sellOrdersOptions = getOptions({
      sellOrders,
      setSelectedProjectById,
      allowedDenomsData,
    });

    const isDisableAutoRetire = selectedSellOrder?.disableAutoRetire;

    const handleClose = (): void => {
      setSelectedSellOrder(undefined);
      onClose();
    };

    return (
      <Modal open={open} onClose={handleClose}>
        <div className={classes.root}>
          <Title
            variant="h3"
            align="center"
            sx={{ pt: 0, pb: 5, px: { xs: 0, sm: 7.5 } }}
          >
            {'Buy Ecocredits'}
          </Title>
          {buyModalContent && !isCommunityCredit && (
            <BuyCreditsModalInfoCard
              content={buyModalContent.allBuyModal[0]}
              sx={{ mb: 12.5 }}
            />
          )}
          {project?.name && (
            <Card className={cx(classes.thumbnailCard, classes.field)}>
              <CardContent className={classes.cardContent}>
                <Image
                  className={cx(classes.projectThumbnail, classes.marginRight)}
                  src={
                    project.image ||
                    'https://regen-registry.s3.amazonaws.com/projects/wilmot/time-controlled-rotational-grazing.jpg'
                  } // TODO: more generic fallback
                  imageStorageBaseUrl={imageStorageBaseUrl}
                  apiServerUrl={apiServerUrl}
                  backgroundImage
                />
                <div className={classes.flexColumn}>
                  <Title sx={{ fontSize: { xs: 16, sm: 21 } }}>
                    {project.creditDenom &&
                      ReactHtmlParser(project.creditDenom)}{' '}
                    Credits
                  </Title>
                  <Subtitle size="lg" mobileSize="xs">
                    <Link to={`/project/${project.id}`} target="_blank">
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
              if (!project) return;
              setSubmitting(true);
              track<'buy2', Buy2Event>('buy2', {
                url: location.pathname,
                price: selectedSellOrder?.askAmount,
                batchDenom: selectedSellOrder?.batchDenom,
                projectId: project.id,
                projectName: project.name,
                creditClassId: project.id.split('-')[0],
                quantity: values.creditCount,
                currencyDenom: selectedSellOrder?.askDenom,
                retirementAction: values.retirementAction,
              });
              try {
                await handleBuyCreditsSubmit(
                  values,
                  onSubmit,
                  selectedSellOrder,
                );
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
                      sellOrders={sellOrders}
                      selectedSellOrder={selectedSellOrder}
                      setSelectedSellOrder={setSelectedSellOrder}
                    />
                    <Collapse in={!!selectedSellOrder}>
                      <div className={classes.field}>
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
                            allowedDenomsData,
                            bankDenom: selectedSellOrder?.askDenom ?? '',
                            baseDenom: selectedSellOrder?.askBaseDenom,
                          })}/credit`}
                        </Body>
                        <Body
                          size="md"
                          sx={{
                            color: 'primary.light',
                            fontWeight: 700,
                            mb: 3,
                          }}
                        >
                          {'Batch denom: '}
                          <Body
                            as="span"
                            sx={{
                              fontWeight: 'normal',
                              display: 'inline-block',
                            }}
                          >
                            {selectedSellOrder?.batchDenom}
                          </Body>
                        </Body>
                        <div className={classes.creditWidget}>
                          <div className={classes.marginRight}>
                            <Field
                              className={classes.creditInput}
                              component={NumberTextField}
                              name="creditCount"
                              min={1}
                              max={selectedSellOrder?.quantity}
                              validate={getCreditCountValidation({
                                creditAvailable: Number(
                                  selectedSellOrder?.quantity,
                                ),
                                askAmount: Number(selectedSellOrder?.askAmount),
                                displayDenom: findDisplayDenom({
                                  allowedDenomsData,
                                  bankDenom: selectedSellOrder?.askDenom ?? '',
                                  baseDenom: selectedSellOrder?.askBaseDenom,
                                }),
                                userBalance,
                              })}
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
                                classes.flexColumn,
                                classes.marginRight,
                              )}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'baseline',
                                }}
                              >
                                <DenomIcon
                                  baseDenom={
                                    selectedSellOrder?.askBaseDenom ?? ''
                                  }
                                  sx={{
                                    mr: 1.5,
                                    mt: 1,
                                    alignSelf: 'flex-start',
                                  }}
                                  iconSx={{ height: 26 }}
                                />
                                <Title variant="h4" sx={{ mr: 1.5 }}>
                                  {amountToSpend({
                                    askAmount: selectedSellOrder?.askAmount,
                                    creditCount: values.creditCount,
                                  })}
                                </Title>
                                <DenomLabel
                                  bankDenom={selectedSellOrder?.askDenom ?? ''}
                                  baseDenom={selectedSellOrder?.askBaseDenom}
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
                      className={classes.field}
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
                              href="https://guides.regen.network/guides/regen-marketplace/profile/buy-ecocredits/by-project#5.-select-credit-retirement-options"
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
                              href="https://guides.regen.network/guides/regen-marketplace/profile/buy-ecocredits/by-project#5.-select-credit-retirement-options"
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
                                href="https://guides.regen.network/guides/regen-marketplace/profile/buy-ecocredits/by-project#5.-select-credit-retirement-options"
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
                          Retirement reason
                        </Title>
                        <InfoTooltipWithIcon title="You can add the name of the organization or person you are retiring the credits on behalf of here (i.e. 'Retired on behalf of ABC Organization')" />
                      </Flex>
                      <Flex>
                        <Field
                          component={TextField}
                          label="Explain the reason you are retiring these credits"
                          name="retirementReason"
                          optional
                          sx={{
                            mb: { xs: 10, sm: 12 },
                            '& label': {
                              whiteSpace: 'unset',
                            },
                          }}
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
                      <Grid container className={classes.stateCountryGrid}>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          className={classes.stateCountryTextField}
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
                          className={classes.stateCountryTextField}
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
                        className={cx(classes.field, classes.postalCodeField)}
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
