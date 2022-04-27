import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Box, IconButton, Link } from '@mui/material';
import { useTheme, DefaultTheme as Theme } from '@mui/styles';
import { string, date, object, AnyObjectSchema } from 'yup';

import { Body } from '../typography';
import InputLabel from '../inputs/InputLabel';
import OnBoardingCard from '../cards/OnBoardingCard';
import TextField from '../inputs/TextField';
import ControlledTextField from '../inputs/ControlledTextField';
import SelectTextField, { Option } from '../inputs/SelectTextField';
import { DatePickField } from '../inputs/DatePickField';
import SaveFooter from '../fixed-footer/SaveFooter';
import OutlinedButton from '../buttons/OutlinedButton';
import TrashIcon from '../icons/TrashIcon';
import { AddCertificationModal } from '../modal/AddCertificationModal';
import {
  requiredMessage,
  invalidDate,
  vcsRetirementSerialRE,
  invalidVCSRetirement,
  invalidVCSID,
  numericOnlyRE,
  isValidJSON,
  invalidJSON,
} from '../inputs/validation';
import { NameUrl } from '../../types/rdf';
import { VCSBatchMetadataLD } from '../../types/rdf/C01-verified-carbon-standard-batch';

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

const validationSchema = object({
  classId: string().required(requiredMessage),
  startDate: date().required(requiredMessage).typeError(invalidDate),
  endDate: date().required(requiredMessage).typeError(invalidDate),
  metadata: string().when('classId', {
    is: 'C01',
    then: schema => vcsMetadataSchema,
    otherwise: schema => JSONSchema,
  }),
});

const JSONSchema = string().test(
  'is-json',
  invalidJSON,
  (value, context) => !!value && isValidJSON(value),
);

const BatchBasicsForm: React.FC<{
  creditClasses?: Option[];
  submit: (values: BatchBasicsFormValues) => Promise<void>;
}> = ({ creditClasses = [], submit }) => {
  const defaultCCOption = { value: '', label: 'Choose Credit Class' };
  const creditClassOptions = [defaultCCOption, ...creditClasses];

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
      validationSchema={validationSchema}
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
      {({ submitForm, isValid, isSubmitting, touched, values }) => {
        const isVCS = values?.classId === 'C01';

        return (
          <Form>
            <OnBoardingCard>
              <Field
                name="classId"
                label="Credit Class"
                required
                component={SelectTextField}
                options={creditClassOptions}
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
                    name="metadata['regen:vcsProjectId']" //TODO: fetch projects for dropdown
                    label="Project ID"
                    type="number"
                    required={isVCS}
                    component={TextField}
                  />
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
                  <InputLabel>Metadata</InputLabel>
                  <Body size="sm">
                    Attach arbitrary JSON-LD metadata to the credit batch below.{' '}
                    <a href="#TODO">Learn more»</a>
                  </Body>
                  <Field
                    name="metadata"
                    component={ControlledTextField}
                    multiline
                    minRows={6}
                    maxRows={18}
                    defaultStyle={false}
                  />
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
                  pt: 2,
                  pb: 2,
                  pl: 5,
                  pr: 5,
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
