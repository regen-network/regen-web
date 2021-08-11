import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';

import ContainedButton from '../buttons/ContainedButton';
import OnBoardingCard from '../cards/OnBoardingCard';
import PhoneField from '../inputs/PhoneField';
import ControlledTextField from '../inputs/ControlledTextField';
import CheckboxLabel from '../inputs/CheckboxLabel';
import Title from '../title';
import Description from '../description';
import Tooltip from '../tooltip/InfoTooltip';
import Modal from '.';
import QuestionIcon from '../icons/QuestionIcon';

interface IndividualModalProps {
  individual?: IndividualFormValues;
  onClose: () => void;
  onSubmit: (individual: IndividualFormValues) => void; // TODO
}

export interface IndividualFormValues {
  id?: number;
  type?: string;
  name?: string;
  phone?: string;
  email?: string;
  permissionToShareInfo?: boolean;
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

function IndividualModal({ individual, onClose, onSubmit }: IndividualModalProps): JSX.Element {
  const styles = useStyles();
  const [individualEdit, setIndividualEdit] = useState<IndividualFormValues | undefined>(undefined);

  useEffect(() => {
    setIndividualEdit(individual);

    return function cleanup() {
      setIndividualEdit(undefined);
    };
  }, [individual]);

  return (
    <Modal open={!!individualEdit} onClose={onClose} className={styles.modal}>
      <div className={styles.root}>
        <Title variant="h4" align="center" className={styles.title}>
          {`${individualEdit && individualEdit.id ? 'Edit' : 'Add'} Individual`}
        </Title>
        <Formik
          enableReinitialize
          validateOnMount
          initialValues={{
            ...individualEdit,
            permissionToShareInfo: individualEdit && !!individualEdit.permissionToShareInfo,
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
                    label="Full name"
                    name="name"
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
                        I have this individual’s permission to share their information with Regen Registry
                      </Description>
                    }
                  />
                  <Tooltip
                    arrow
                    placement="top"
                    title="Even if you work closely with this individual, make sure you have their permission to be part of Regen Registry."
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

export { IndividualModal };
