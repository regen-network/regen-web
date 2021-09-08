import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import cx from 'clsx';

import { Button } from '../buttons/Button';
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
  onSubmit: (individual: IndividualFormValues) => void;
}

export interface IndividualFormValues {
  id?: number;
  '@type': string;
  'http://schema.org/name'?: string;
  'http://schema.org/telephone'?: string;
  'http://schema.org/email'?: string;
  'http://regen.network/sharePermission'?: boolean;
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
  matchFormPadding: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 10),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 2.5),
    },
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: theme.spacing(10),
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
    <Modal open={!!individualEdit} onClose={onClose}>
      <div className={styles.root}>
        <Title variant="h4" align="center" className={styles.title}>
          {`${individualEdit && individualEdit.id ? 'Edit' : 'Add'} Individual`}
        </Title>
        <Formik
          enableReinitialize
          validateOnMount
          initialValues={{
            ...individualEdit,
            '@type': 'http://regen.network/Individual',
            'http://regen.network/sharePermission':
              individualEdit && !!individualEdit['http://regen.network/sharePermission'],
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
                    name="['http://schema.org/name']"
                  />
                  <Field
                    className={styles.field}
                    component={ControlledTextField}
                    label="Email address"
                    name="['http://schema.org/email']"
                  />
                  <Field
                    className={styles.field}
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
                <div className={cx(styles.controls, styles.matchFormPadding)}>
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
