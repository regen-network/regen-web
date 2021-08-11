import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';

import ContainedButton from '../buttons/ContainedButton';
import OnBoardingCard from '../cards/OnBoardingCard';
import PhoneField from '../inputs/PhoneField';
import ControlledTextField from '../inputs/ControlledTextField';
import LocationField from '../inputs/LocationField';
import CheckboxLabel from '../inputs/CheckboxLabel';
import Tooltip from '../tooltip/InfoTooltip';
import Title from '../title';
import Description from '../description';
import Modal from '.';
import QuestionIcon from '../icons/QuestionIcon';

interface OrganizationModalProps {
  organization?: OrganizationFormValues;
  onClose: () => void;
  onSubmit: (organization: OrganizationFormValues) => void;
  mapboxToken: string;
}

export interface OrganizationFormValues {
  id?: number;
  type?: string;
  legalName?: string;
  phone?: string;
  email?: string;
  representative?: string;
  permissionToShareInfo?: boolean;
  location?: GeocodeFeature;
}

const useStyles = makeStyles((theme: Theme) => ({
  modal: {},
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
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(6),
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  field: {
    marginBottom: theme.spacing(8),
    '&:last-child': {
      marginBottom: 0,
    },
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    margin: theme.spacing(10, 0),
  },
  button: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(6),
    },
  },
  cancelButton: {
    color: theme.palette.grey[500],
    fontSize: theme.spacing(4),
  },
  permission: {
    display: 'flex',
  },
  checkboxLabel: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
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
  mapboxToken,
}: OrganizationModalProps): JSX.Element {
  const styles = useStyles();
  const [organizationEdit, setOrganizationEdit] = useState<OrganizationFormValues | undefined>(organization);

  useEffect(() => {
    setOrganizationEdit(organization);
  }, [organization]);

  return (
    <Modal open={!!organizationEdit} onClose={onClose} className={styles.modal}>
      <div className={styles.root}>
        <Title variant="h4" align="center" className={styles.title}>
          {`${organizationEdit && organizationEdit.id ? 'Edit' : 'Add'} Organization`}
        </Title>
        <Formik
          enableReinitialize
          validateOnMount
          initialValues={{
            ...organizationEdit,
            permissionToShareInfo: organizationEdit && !!organizationEdit.permissionToShareInfo,
          }}
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
          {({ submitForm }) => {
            return (
              <Form translate="yes">
                <OnBoardingCard className={styles.card}>
                  <Field
                    className={styles.field}
                    component={ControlledTextField}
                    label="Organization legal name"
                    description="This is the name of the farm, ranch, cooperative, non-profit, or other organization."
                    name="legalName"
                    placeholder="i.e. Cherrybrook Farms LLC"
                  />
                  <Field
                    className={styles.field}
                    component={LocationField}
                    label="Organization location"
                    description="This address is used for issuing credits.  If you choose to 
                    show this entity on the project page, only city, state/province, and country will be displayed."
                    name="location"
                    placeholder="Start typing the location"
                    token={mapboxToken}
                  />
                  <Field
                    className={styles.field}
                    component={ControlledTextField}
                    label="Organization representative"
                    description="This is the person who will be signing the project plan (if applicable), and whose name will appear on credit issuance certificates if credits are issued to this organization."
                    name="representative"
                  />
                  <Field
                    className={styles.field}
                    component={ControlledTextField}
                    label="Email address"
                    name="email"
                  />
                  <Field className={styles.field} component={PhoneField} label="Phone number" name="phone" />
                </OnBoardingCard>
                <div className={styles.permission}>
                  <Field
                    type="checkbox"
                    component={CheckboxLabel}
                    name="permissionToShareInfo"
                    label={
                      <Description className={styles.checkboxLabel}>
                        I have this organization’s permission to share their information with Regen Registry
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
                <div className={styles.controls}>
                  <Button onClick={onClose} className={styles.cancelButton}>
                    cancel
                  </Button>
                  <ContainedButton onClick={submitForm} className={styles.button}>
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
