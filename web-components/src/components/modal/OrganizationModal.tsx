import React, { useState, useEffect } from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import { Formik, Form, Field, FormikErrors } from 'formik';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import cx from 'clsx';

import { Button } from '../buttons/Button';
import ContainedButton from '../buttons/ContainedButton';
import OnBoardingCard from '../cards/OnBoardingCard';
import PhoneField from '../inputs/PhoneField';
import ControlledTextField from '../inputs/ControlledTextField';
import LocationField from '../inputs/LocationField';
import CheckboxLabel from '../inputs/CheckboxLabel';
import Tooltip from '../tooltip/InfoTooltip';
import { Title } from '../typography';
import Description from '../description';
import Modal from '.';
import QuestionIcon from '../icons/QuestionIcon';

interface OrganizationModalProps {
  organization?: OrganizationFormValues;
  onClose: () => void;
  onSubmit: (organization: OrganizationFormValues) => void;
  validate: (
    values: OrganizationFormValues,
  ) => Promise<FormikErrors<OrganizationFormValues>>;
  mapboxToken: string;
}

export interface OrganizationFormValues {
  id?: string;
  projectCreator?: boolean;
  partyId?: string;
  addressId?: string;
  ownerId?: string;
  ownerPartyId?: string;
  '@type': 'http://regen.network/Organization';
  'http://schema.org/legalName'?: string;
  'http://schema.org/telephone'?: string;
  'http://schema.org/email'?: string;
  'http://regen.network/responsiblePerson'?: string;
  'http://regen.network/sharePermission'?: boolean;
  'http://schema.org/location'?: GeocodeFeature;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    marginTop: 0,
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: 0,
      paddingBottom: theme.spacing(7.5),
      paddingLeft: theme.spacing(7.5),
      paddingRight: theme.spacing(7.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(6),
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: theme.spacing(10),
  },
  matchFormPadding: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 10),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 2.5),
    },
  },
  button: {
    paddingLeft: theme.spacing(17),
    paddingRight: theme.spacing(17),
  },
  cancelButton: {
    color: theme.palette.info.main,
    fontSize: theme.typography.pxToRem(12),
    padding: 0,
  },
  permission: {
    display: 'flex',
  },
  checkboxLabel: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
    },
  },
  iconWrapper: {
    cursor: 'pointer',
  },
}));

function OrganizationModal({
  organization,
  onClose,
  onSubmit,
  validate,
  mapboxToken,
}: OrganizationModalProps): JSX.Element {
  const styles = useStyles();
  const [organizationEdit, setOrganizationEdit] = useState<
    OrganizationFormValues | undefined
  >(organization);

  useEffect(() => {
    setOrganizationEdit(organization);
  }, [organization]);

  return (
    <Modal open={!!organizationEdit} onClose={onClose}>
      <div className={styles.root}>
        <Title variant="h4" align="center" className={styles.title}>
          {`${
            organizationEdit && organizationEdit.id ? 'Edit' : 'Add'
          } Organization`}
        </Title>
        <Formik
          enableReinitialize
          validateOnMount
          initialValues={{
            ...organizationEdit,
            '@type': 'http://regen.network/Organization',
            'http://regen.network/sharePermission':
              organizationEdit &&
              !!organizationEdit['http://regen.network/sharePermission'],
          }}
          validate={validate}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              await onSubmit(values);
              setSubmitting(false);
            } catch (e) {
              setSubmitting(false);
            }
          }}
        >
          {({ values, submitForm, isValid, isSubmitting }) => {
            return (
              <Form>
                <OnBoardingCard className={styles.card}>
                  <Field
                    component={ControlledTextField}
                    label="Organization legal name"
                    description="This is the name of the farm, ranch, cooperative, non-profit, or other organization."
                    name="['http://schema.org/legalName']"
                    placeholder="i.e. Cherrybrook Farms LLC"
                  />
                  <Field
                    component={LocationField}
                    label="Organization location"
                    description="This address is used for issuing credits.  If you choose to 
                    show this entity on the project page, only city, state/province, and country will be displayed."
                    name="['http://schema.org/location']"
                    placeholder="Start typing the location"
                    token={mapboxToken}
                  />
                  <Field
                    component={ControlledTextField}
                    label="Organization representative"
                    description="This is the person who will be signing the project plan (if applicable), and whose name will appear on credit issuance certificates if credits are issued to this organization."
                    name="['http://regen.network/responsiblePerson']"
                  />
                  <Field
                    component={ControlledTextField}
                    label="Email address"
                    name="['http://schema.org/email']"
                  />
                  <Field
                    component={PhoneField}
                    label="Phone number"
                    name="['http://schema.org/telephone']"
                  />
                </OnBoardingCard>
                <div className={cx(styles.permission, styles.matchFormPadding)}>
                  <Field
                    type="checkbox"
                    component={CheckboxLabel}
                    name="['http://regen.network/sharePermission']"
                    label={
                      <Description className={styles.checkboxLabel}>
                        I have this organization’s permission to share their
                        information with Regen Registry
                      </Description>
                    }
                  />
                  <Tooltip
                    arrow
                    placement="top"
                    title="Even if you work closely with this organization, make sure you have their permission to be part of Regen Registry."
                  >
                    <div className={styles.iconWrapper}>
                      <QuestionIcon />
                    </div>
                  </Tooltip>
                </div>
                <div className={cx(styles.controls, styles.matchFormPadding)}>
                  <Button onClick={onClose} className={styles.cancelButton}>
                    cancel
                  </Button>
                  <ContainedButton
                    onClick={submitForm}
                    className={styles.button}
                    disabled={!isValid || isSubmitting}
                  >
                    save
                  </ContainedButton>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
}

export { OrganizationModal };
