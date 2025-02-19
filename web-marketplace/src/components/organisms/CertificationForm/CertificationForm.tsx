import React from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { AnyObjectSchema, object, string } from 'yup';

import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';
import Submit from 'web-components/src/components/form/Submit';
import { RegenModalPropsWithOnClose } from 'web-components/src/types/shared/modalPropsWithOnClose';

import {
  INVALID_URL,
  REQUIRED_MESSAGE,
  SUBMIT_ERRORS,
} from 'lib/constants/shared.constants';
import { NameUrl } from 'lib/rdf/types';

export interface CertificationProps {
  onSubmit: (values: NameUrl) => void;
}

interface FormProps extends CertificationProps {
  onClose: RegenModalPropsWithOnClose['onClose'];
}

const CertificationForm: React.FC<React.PropsWithChildren<FormProps>> = ({
  onClose,
  onSubmit,
}) => {
  const { _ } = useLingui();

  const initialValues: NameUrl = {
    'schema:name': '',
    'schema:url': {
      '@type': 'schema:URL',
      '@value': '',
    },
  };

  const urlSchema: AnyObjectSchema = object({
    '@type': string(),
    '@value': string().url(_(INVALID_URL)),
  });

  const nameUrlSchema: AnyObjectSchema = object({
    'schema:name': string().required(_(REQUIRED_MESSAGE)),
    'schema:url': urlSchema,
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={nameUrlSchema}
      onSubmit={onSubmit}
    >
      {({ submitForm, isSubmitting, isValid, submitCount, status }) => (
        <Form>
          <OnBoardingCard>
            <Field
              name="schema:name"
              label={_(msg`Additional certification name`)}
              required
              component={TextField}
            />
            <Field
              name="schema:url.@value"
              label={_(msg`Additional certification url`)}
              optional
              component={TextField}
            />
            <Submit
              isSubmitting={isSubmitting}
              onClose={onClose}
              status={status}
              isValid={isValid}
              submitCount={submitCount}
              submitForm={submitForm}
              label="save"
              errorText={_(SUBMIT_ERRORS)}
            />
          </OnBoardingCard>
        </Form>
      )}
    </Formik>
  );
};

export { CertificationForm };
