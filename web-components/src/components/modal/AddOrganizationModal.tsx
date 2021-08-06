import React from 'react';
import { makeStyles, Theme, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';

import ContainedButton from '../buttons/ContainedButton';
import OnBoardingCard from '../cards/OnBoardingCard';
import PhoneField from '../inputs/PhoneField';
import ControlledTextField from '../inputs/ControlledTextField';
import LocationField from '../inputs/LocationField';
import Title from '../title';
import Modal from './';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';

interface AddOrganizationModalProps {
  organizationName?: string;
  onClose: () => void;
  onSubmit: (organization: any) => void; // TODO
  mapboxToken: string;
}

interface OrgProfileFormValues {
  legalName: string;
  representative: string;
  email: string;
  phone: string;
  location: GeocodeFeature;
}

const useStyles = makeStyles((theme: Theme) => ({
  modal: {},
  root: {
    display: 'flex',
    flexDirection: 'column',
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
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // height: 80,
    width: '100%',
    marginTop: theme.spacing(10),
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
}));

function AddOrganizationModal({
  organizationName,
  onClose,
  onSubmit,
  mapboxToken,
}: AddOrganizationModalProps): JSX.Element {
  const styles = useStyles();

  return (
    <Modal open={!!organizationName} onClose={onClose} className={styles.modal}>
      <div className={styles.root}>
        <Title variant="h4" align="center" className={styles.title}>
          Add Organization
        </Title>
        <Formik
          enableReinitialize
          validateOnMount
          initialValues={{
            legalName: organizationName,
            location: {
              place_name: '',
            } as GeocodeFeature,
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
          {({ submitForm, submitCount, isValid, isSubmitting, values }) => {
            return (
              <Form translate="yes">
                <OnBoardingCard>
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

export { AddOrganizationModal };
