import React from 'react';
import { makeStyles, Theme, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';

import ContainedButton from '../buttons/ContainedButton';
import OnBoardingCard from '../cards/OnBoardingCard';
import ControlledTextField from '../inputs/ControlledTextField';
import Title from '../title';
import Modal from './';

export interface AddOrganizationModalProps {
  organizationName?: string;
  onClose: () => void;
  onSubmit: (organization: any) => void; // TODO
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
    marginBottom: theme.spacing(4),
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
                    label="Organization Legal Name"
                    description="This is the name of the farm, ranch, cooperative, non-profit, or other organization."
                    name="legalName"
                    placeholder="i.e. Cherrybrook Farms LLC"
                  />
                </OnBoardingCard>
                <div className={styles.controls}>
                  <Button onClick={onClose} className={styles.cancelButton}>
                    cancel
                  </Button>
                  <ContainedButton
                    onClick={submitForm}
                    className={styles.button}
                    // disabled={!}
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

export { AddOrganizationModal };
