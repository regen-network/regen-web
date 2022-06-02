import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Box, IconButton, Link } from '@mui/material';
import { useTheme, DefaultTheme as Theme } from '@mui/styles';
import { string, date, object, AnyObjectSchema } from 'yup';

import { Body } from 'web-components/lib/components/typography';
import InputLabel from 'web-components/lib/components/inputs/InputLabel';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import TextField from 'web-components/lib/components/inputs/TextField';
import { DatePickField } from 'web-components/lib/components/inputs/DatePickField';
import SaveFooter from 'web-components/lib/components/fixed-footer/SaveFooter';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import TrashIcon from 'web-components/lib/components/icons/TrashIcon';
import { AddCertificationModal } from 'web-components/lib/components/modal/AddCertificationModal';
import {
  requiredMessage,
  invalidDate,
  vcsRetirementSerialRE,
  invalidVCSRetirement,
  invalidVCSID,
  numericOnlyRE,
  isValidJSON,
  invalidJSON,
} from 'web-components/lib/components/inputs/validation';
import { NameUrl } from 'web-components/lib/types/rdf';
import { VCSBatchMetadataLD } from 'web-components/lib/types/rdf/C01-verified-carbon-standard-batch';

import {
  ProjectSelect,
  CreditClassSelect,
  MetadataJSONField,
} from '../molecules';

export interface BatchBasicsFormValues {
  classId: string;
  startDate: Date | null;
  endDate: Date | null;
  metadata?: Partial<VCSBatchMetadataLD> | string;
}

const vcsMetadataSchema: AnyObjectSchema = object({
  'regen:vcsProjectId': string()
    .required(requiredMessage)
    .matches(numericOnlyRE, { message: invalidVCSID }),
  'regen:vcsRetirementSerialNumber': string()
    .required(requiredMessage)
    .matches(vcsRetirementSerialRE, { message: invalidVCSRetirement }),
});

const JSONSchema = string().test(
  'is-json',
  invalidJSON,
  (value, context) => !!value && isValidJSON(value),
);

const basicsValidationSchema = object({
  classId: string().required(requiredMessage),
  startDate: date().required(requiredMessage).typeError(invalidDate),
  endDate: date().required(requiredMessage).typeError(invalidDate),
  metadata: object().when('classId', {
    is: 'C01',
    then: schema => vcsMetadataSchema,
    otherwise: schema => JSONSchema,
  }),
});

const BatchBasicsForm: React.FC<{
  submit: (values: BatchBasicsFormValues) => Promise<void>;
}> = ({ submit }) => {
  return (
    <Formik
      enableReinitialize
      validateOnMount
      initialValues={{
        classId: '',
        startDate: null,
        endDate: null,
        metadata: undefined,
      }}
      validationSchema={basicsValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          await submit(values);
          setSubmitting(false);
        } catch (e) {
          setSubmitting(false);
        }
      }}
    >
      {({ submitForm, isValid, isSubmitting, touched, values, errors }) => {
        const isVCS = values?.classId === 'C01';

        return (
          <Form>
            <OnBoardingCard>
              <CreditClassSelect name="classId" required />
              <ProjectSelect
                creditClassId={values.classId}
                name="metadata['regen:vcsProjectId']"
                required
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: ['column', 'row'],
                  justifyContent: 'space-between',
                  mt: 10,
                }}
              >
                <Box sx={{ mr: [0, 1] }}>
                  <Field
                    label="Start Date"
                    placeholder="Start Date"
                    name="startDate"
                    required
                    maxDate={values.endDate}
                    component={DatePickField}
                  />
                </Box>
                <Box sx={{ mt: [10, 0], ml: [0, 1] }}>
                  <Field
                    label="End Date"
                    placeholder="End Date"
                    name="endDate"
                    required
                    minDate={values.startDate}
                    component={DatePickField}
                  />
                </Box>
              </Box>
              <Body size="sm" mt={2}>
                The dates should correspond to the batch monitoring period or
                vintage.
              </Body>
              {isVCS ? (
                <>
                  <Field
                    name="metadata['regen:vcsRetirementSerialNumber']"
                    label="VCS retirement serial number"
                    required={isVCS}
                    component={TextField}
                  />
                  <AdditionalCerfications
                    certifications={
                      values?.metadata?.['regen:additionalCertifications'] || []
                    }
                  />
                </>
              ) : values?.classId ? (
                <Box sx={{ mt: 10 }}>
                  <MetadataJSONField required={!isVCS} />
                </Box>
              ) : null}
            </OnBoardingCard>
            <SaveFooter
              onSave={submitForm}
              saveDisabled={
                !isValid || isSubmitting || !Object.keys(touched).length
              }
              percentComplete={0}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

const AdditionalCerfications: React.FC<{
  certifications: NameUrl[];
}> = ({ certifications }) => {
  const theme = useTheme<Theme>();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box sx={{ mt: 10 }}>
      <InputLabel optional>Additional Certifications</InputLabel>
      <FieldArray
        name="metadata['regen:additionalCertifications']"
        render={arrayHelpers => (
          <>
            {certifications.map((cert, index) => (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 3,
                  py: 2,
                  px: 5,
                  border: 1,
                  borderColor: 'info.light',
                  bgcolor: 'grey.50',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <span>{cert['schema:name']}</span>
                  <Link
                    sx={{ color: 'secondary.main' }}
                    href={cert['schema:url']['@value']}
                    target="_blank"
                  >
                    {cert['schema:url']['@value']}
                  </Link>
                </Box>
                <IconButton
                  onClick={() => arrayHelpers.remove(index)}
                  aria-label="delete"
                  size="large"
                >
                  <TrashIcon color={theme.palette.secondary.main} />
                </IconButton>
              </Box>
            ))}
            <OutlinedButton
              onClick={() => setModalOpen(true)}
              sx={{ mt: 3, width: '100%' }}
            >
              + add certification
            </OutlinedButton>
            <AddCertificationModal
              open={modalOpen}
              onSubmit={cert => {
                setModalOpen(false);
                arrayHelpers.push(cert);
              }}
              onClose={() => setModalOpen(false)}
            />
          </>
        )}
      />
    </Box>
  );
};

export { BatchBasicsForm };
