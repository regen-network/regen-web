import React, { useState, useEffect } from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import { Formik, Form, Field, FormikErrors } from 'formik';
import cx from 'clsx';

import { Button } from '../buttons/Button';
import ContainedButton from '../buttons/ContainedButton';
import OnBoardingCard from '../cards/OnBoardingCard';
import ControlledTextField from '../inputs/ControlledTextField';
import { ImageUpload } from '../inputs/ImageUpload';
import { Title } from '../typography';
import Modal from '.';
import { urlType } from '../../utils/schemaURL';

type ProfileType = 'regen:Individual' | 'regen:Organization';

interface ProfileModalProps {
  type: ProfileType;
  profile?: ProfileFormValues;
  onClose: () => void;
  onSubmit: (profile: ProfileFormValues) => void;
  validate: (
    values: ProfileFormValues,
  ) => Promise<FormikErrors<ProfileFormValues>>;
}

export interface ProfileFormValues {
  '@type': ProfileType;
  'schema:name'?: string;
  'schema:image'?: urlType;
  'schema:description'?: string;
  'regen:address'?: string;
  // 'regen:sharePermission'?: boolean;
  'regen:showOnProjectPage': true;
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

function ProfileModal({
  type,
  profile,
  onClose,
  onSubmit,
  validate,
}: ProfileModalProps): JSX.Element {
  const styles = useStyles();
  const [profileEdit, setIndividualEdit] = useState<
    ProfileFormValues | undefined
  >(undefined);

  useEffect(() => {
    setIndividualEdit(profile);

    return function cleanup() {
      setIndividualEdit(undefined);
    };
  }, [profile]);

  return (
    <Modal open={!!profileEdit} onClose={onClose}>
      <div className={styles.root}>
        <Title
          variant="h4"
          align="center"
          sx={{ px: [0, 7.5], pt: [8, 0], pb: [6, 7.5] }}
        >
          {`${profileEdit ? 'Edit' : 'Add'} ${
            type === 'regen:Individual' ? 'Individual' : 'Organization'
          }`}
        </Title>
        <Formik
          enableReinitialize
          validateOnMount
          initialValues={{
            ...profileEdit,
            '@type': type,
            'regen:showOnProjectPage': true,
            // 'regen:sharePermission':
            // profileEdit && !!profileEdit['regen:sharePermission'],
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
                    label="Name"
                    name="schema:name"
                  />
                  <Field
                    component={ImageUpload}
                    label="Profile image"
                    name="schema:image.@value"
                    optional
                  />
                  <Field
                    charLimit={160}
                    component={ControlledTextField}
                    label="Description"
                    name="schema:description"
                    rows={4}
                    minRows={4}
                    multiline
                    optional
                  />
                  <Field
                    component={ControlledTextField}
                    name="regen:address"
                    label="REGEN wallet address"
                    description="Make sure this is a valid wallet address. Can be added at a later date."
                    optional
                  />
                </OnBoardingCard>
                {/* <div className={cx(styles.permission, styles.matchFormPadding)}>
                  <Field
                    type="checkbox"
                    component={CheckboxLabel}
                    name="regen:sharePermission"
                    label={
                      <Body size="sm">
                        I have this profile’s permission to share their
                        information with Regen Registry
                      </Body>
                    }
                  />
                  <Tooltip
                    arrow
                    placement="top"
                    title="Even if you work closely with this profile, make sure you have their permission to be part of Regen Registry."
                  >
                    <div className={styles.iconWrapper}>
                      <QuestionIcon />
                    </div>
                  </Tooltip>
                </div> */}
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

export { ProfileModal };
