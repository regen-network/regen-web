import React from 'react';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { AnyObjectSchema, object, string } from 'yup';

import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';
import Submit from 'web-components/src/components/form/Submit';
import {
  invalidURL,
  requiredMessage,
} from 'web-components/src/components/inputs/validation';
import { RegenModalProps } from 'web-components/src/components/modal';

import { NameUrl } from 'lib/rdf/types';

export interface CertificationProps {
  onSubmit: (values: NameUrl) => void;
}

interface FormProps extends CertificationProps {
  onClose: RegenModalProps['onClose'];
}

const CertificationForm: React.FC<React.PropsWithChildren<FormProps>> = ({
  onClose,
  onSubmit,
}) => {
  const initialValues: NameUrl = {
    'schema:name': '',
    'schema:url': {
      '@type': 'schema:URL',
      '@value': '',
    },
  };

  const urlSchema: AnyObjectSchema = object({
    '@type': string(),
    '@value': string().url(invalidURL),
  });

  const nameUrlSchema: AnyObjectSchema = object({
    'schema:name': string().required(requiredMessage),
    'schema:url': urlSchema,
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={nameUrlSchema}
      onSubmit={onSubmit}
    >
      {({ submitForm, isSubmitting, isValid, submitCount, status }) => (
        <Form
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <OnBoardingCard>
            <Field
              name="schema:name"
              label="Additional certification name"
              required
              component={TextField}
            />
            <Field
              name="schema:url.@value"
              label="Additional certification url"
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
            />
          </OnBoardingCard>
        </Form>
      )}
    </Formik>
  );
};

export { CertificationForm };
