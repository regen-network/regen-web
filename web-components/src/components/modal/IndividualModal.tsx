import React, { useEffect, useState } from 'react';
import { Field, Form, Formik, FormikErrors } from 'formik';

import ControlledTextField from '../inputs/ControlledTextField';
import PhoneField from '../inputs/PhoneField';
import { Title } from '../typography';
import Modal from '.';
import { SharePermissionField } from './OrganizationModal';
import { ProfileOnBoardingCard, ProfileSubmitFooter } from './ProfileModal';

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

function IndividualModal({
  individual,
  onClose,
  onSubmit,
  validate,
}: IndividualModalProps): JSX.Element {
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
      <div>
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
                <ProfileOnBoardingCard>
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
                </ProfileOnBoardingCard>
                <SharePermissionField />
                <ProfileSubmitFooter
                  submitForm={submitForm}
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

export { IndividualModal };
