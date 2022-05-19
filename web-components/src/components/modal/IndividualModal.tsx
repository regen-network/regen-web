import React, { useState, useEffect } from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import { Formik, Form, Field, FormikErrors } from 'formik';
import cx from 'clsx';

import { Button } from '../buttons/Button';
import ContainedButton from '../buttons/ContainedButton';
import OnBoardingCard from '../cards/OnBoardingCard';
import PhoneField from '../inputs/PhoneField';
import ControlledTextField from '../inputs/ControlledTextField';
import CheckboxLabel from '../inputs/CheckboxLabel';
import { Body, Title } from '../typography';
import Tooltip from '../tooltip/InfoTooltip';
import Modal from '.';
import QuestionIcon from '../icons/QuestionIcon';

interface IndividualModalProps {
  individual?: IndividualFormValues;
  onClose: () => void;
  onSubmit: (individual: IndividualFormValues) => void;
  validate: (
    values: IndividualFormValues,
  ) => Promise<FormikErrors<IndividualFormValues>>;
}

export interface IndividualFormValues {
  id?: string;
  partyId?: string;
  projectCreator?: boolean;
  '@type': 'regen:Individual';
  'schema:name'?: string;
  'schema:telephone'?: string;
  'schema:email'?: string;
  'regen:sharePermission'?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    marginTop: 0,
  },
  matchFormPadding: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 10),
    },
    [theme.breakpoints.down('sm')]: {
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
  iconWrapper: {
    cursor: 'pointer',
  },
}));

function IndividualModal({
  individual,
  onClose,
  onSubmit,
  validate,
}: IndividualModalProps): JSX.Element {
  const styles = useStyles();
  const [individualEdit, setIndividualEdit] = useState<
    IndividualFormValues | undefined
  >(undefined);

  useEffect(() => {
    setIndividualEdit(individual);

    return function cleanup() {
      setIndividualEdit(undefined);
    };
  }, [individual]);

  return (
    <Modal open={!!individualEdit} onClose={onClose}>
      <div className={styles.root}>
        <Title
          variant="h4"
          align="center"
          sx={{ px: [0, 7.5], pt: [8, 0], pb: [6, 7.5] }}
        >
          {`${individualEdit && individualEdit.id ? 'Edit' : 'Add'} Individual`}
        </Title>
        <Formik
          enableReinitialize
          validateOnMount
          initialValues={{
            ...individualEdit,
            '@type': 'regen:Individual',
            'regen:sharePermission':
              individualEdit && !!individualEdit['regen:sharePermission'],
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
          validate={validate}
        >
          {({ submitForm, isValid, isSubmitting }) => {
            return (
              <Form>
                <OnBoardingCard className={styles.card}>
                  <Field
                    component={ControlledTextField}
                    label="Full name"
                    name="schema:name"
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
                        I have this individual’s permission to share their
                        information with Regen Registry
                      </Body>
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

export { IndividualModal };
