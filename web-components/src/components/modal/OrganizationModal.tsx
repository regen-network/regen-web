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
import { Body, Title } from '../typography';
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
  '@type': 'regen:Organization';
  'schema:legalName'?: string;
  'schema:telephone'?: string;
  'schema:email'?: string;
  'regen:responsiblePerson'?: string;
  'regen:sharePermission'?: boolean;
  'schema:location'?: GeocodeFeature;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    marginTop: 0,
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
  cancelButton: {
    color: theme.palette.info.main,
    fontSize: theme.typography.pxToRem(12),
    padding: 0,
  },
  permission: {
    display: 'flex',
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
        <Title
          variant="h4"
          align="center"
          sx={{ px: [0, 7.5], pt: [8, 0], pb: [6, 7.5] }}
        >
          {`${
            organizationEdit && organizationEdit.id ? 'Edit' : 'Add'
          } Organization`}
        </Title>
        <Formik
          enableReinitialize
          validateOnMount
          initialValues={{
            ...organizationEdit,
            '@type': 'regen:Organization',
            'regen:sharePermission':
              organizationEdit && !!organizationEdit['regen:sharePermission'],
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
                    name="schema:legalName"
                    placeholder="i.e. Cherrybrook Farms LLC"
                  />
                  <Field
                    component={LocationField}
                    label="Organization location"
                    description="This address is used for issuing credits.  If you choose to 
                    show this entity on the project page, only city, state/province, and country will be displayed."
                    name="schema:location"
                    placeholder="Start typing the location"
                    token={mapboxToken}
                  />
                  <Field
                    component={ControlledTextField}
                    label="Organization representative"
                    description="This is the person who will be signing the project plan (if applicable), and whose name will appear on credit issuance certificates if credits are issued to this organization."
                    name="regen:responsiblePerson"
                  />
                  <Field
                    component={ControlledTextField}
                    label="Email address"
                    name="schema:email"
                  />
                  <Field
                    component={PhoneField}
                    label="Phone number"
                    name="schema:telephone"
                  />
                </OnBoardingCard>
                <div className={cx(styles.permission, styles.matchFormPadding)}>
                  <Field
                    type="checkbox"
                    component={CheckboxLabel}
                    name="regen:sharePermission"
                    label={
                      <Body size="sm">
                        I have this organization’s permission to share their
                        information with Regen Registry
                      </Body>
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
                    disabled={!isValid || isSubmitting}
                    sx={{ px: 17 }}
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
