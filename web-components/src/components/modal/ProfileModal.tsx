import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import { useTheme, Box, styled } from '@mui/material';
import { Formik, Form, Field, FormikErrors } from 'formik';

import { Button } from '../buttons/Button';
import ContainedButton from '../buttons/ContainedButton';
import OnBoardingCard from '../cards/OnBoardingCard';
import ControlledTextField from '../inputs/ControlledTextField';
import { ImageUpload } from '../inputs/ImageUpload';
import { Title } from '../typography';
import OrganizationIcon from '../icons/OrganizationIcon';
import Modal from '.';
import { urlType } from '../../utils/schemaURL';

type ProfileType = 'regen:Individual' | 'regen:Organization';

interface ProfileModalProps {
  profile: ProfileFormValues;
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
  card: {
    marginTop: 0,
  },
}));

function ProfileModal({
  profile,
  onClose,
  onSubmit,
  validate,
}: ProfileModalProps): JSX.Element {
  const theme = useTheme();
  const organization = profile['@type'] === 'regen:Organization';

  return (
    <Modal open={!!profile} onClose={onClose}>
      <div>
        <Title
          variant="h4"
          align="center"
          sx={{ px: [0, 7.5], pt: [8, 0], pb: [6, 7.5] }}
        >
          {`${profile && profile['schema:name'] ? 'Edit' : 'Add'} ${
            organization ? 'Organization' : 'Individual'
          }`}
        </Title>
        <Formik
          enableReinitialize
          validateOnMount
          initialValues={{
            ...profile,
            // '@type': profile['@type'],
            // 'regen:showOnProjectPage': true,
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
                <ProfileOnBoardingCard>
                  <Field
                    component={ControlledTextField}
                    label="Name"
                    name="schema:name"
                  />
                  <Field
                    component={ImageUpload}
                    label="Profile image"
                    name="schema:image.@value"
                    fallbackAvatar={
                      organization && (
                        <OrganizationIcon
                          sx={{
                            height: theme => theme.spacing(11),
                            width: '100%',
                          }}
                          color={theme.palette.info.main}
                        />
                      )
                    }
                    optional
                  />
                  <Field
                    charLimit={160}
                    component={ControlledTextField}
                    label="Description"
                    name="schema:description"
                    rows={4}
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
                </ProfileOnBoardingCard>
                <ProfileSubmitFooter
                  submitForm={submitForm}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  onClose={onClose}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
}

const ProfileOnBoardingCard: React.FC = ({ children }) => {
  const styles = useStyles();

  return <OnBoardingCard className={styles.card}>{children}</OnBoardingCard>;
};

const ProfileSubmitFooter: React.FC<{
  submitForm: (() => Promise<void>) & (() => Promise<any>);
  isValid: boolean;
  isSubmitting: boolean;
  onClose: () => void;
}> = ({ submitForm, isValid, isSubmitting, onClose }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      mt: 10,
      py: 0,
      px: { xs: 2.5, sm: 10 },
    }}
  >
    <Button
      onClick={onClose}
      sx={{ color: 'info.main', fontSize: [12], padding: [0], border: 'none' }}
    >
      cancel
    </Button>
    <ContainedButton
      onClick={submitForm}
      sx={{ px: [17] }}
      disabled={!isValid || isSubmitting}
    >
      save
    </ContainedButton>
  </Box>
);

export { ProfileModal, ProfileSubmitFooter, ProfileOnBoardingCard };
