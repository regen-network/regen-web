import React, { useState } from 'react';
import { useFormikContext, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Box, IconButton, Link } from '@mui/material';
import { useTheme, DefaultTheme as Theme } from '@mui/styles';

import { Body } from 'web-components/lib/components/typography';
import InputLabel from 'web-components/lib/components/inputs/InputLabel';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import TextField from 'web-components/lib/components/inputs/TextField';
import { DatePickField } from 'web-components/lib/components/inputs/DatePickField';
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
} from '../../../../components/molecules';

export interface CreditBasicsFormValues {
  classId: string;
  startDate: Date | null;
  endDate: Date | null;
  metadata?: Partial<VCSBatchMetadataLD> | string | undefined;
}

const vcsMetadataSchema: Yup.AnyObjectSchema = Yup.object({
  'regen:vcsProjectId': Yup.string()
    .required(requiredMessage)
    .matches(numericOnlyRE, { message: invalidVCSID }),
  'regen:vcsRetirementSerialNumber': Yup.string()
    .required(requiredMessage)
    .matches(vcsRetirementSerialRE, { message: invalidVCSRetirement }),
});

const JSONSchema = Yup.string().test(
  'is-json',
  invalidJSON,
  (value, context) => !!value && isValidJSON(value),
);

export const validationSchema = Yup.object({
  classId: Yup.string().required(requiredMessage),
  startDate: Yup.date().required(requiredMessage).typeError(invalidDate),
  endDate: Yup.date().required(requiredMessage).typeError(invalidDate),
  metadata: Yup.object().when('classId', {
    is: 'C01',
    then: schema => vcsMetadataSchema,
    otherwise: schema => JSONSchema,
  }),
});

export const initialValues = {
  classId: '',
  startDate: null,
  endDate: null,
  metadata: '', // undefined,
};

export default function CreditBasics(): React.ReactElement {
  const { values } = useFormikContext<CreditBasicsFormValues>();

  const isVCS = values.classId === 'C01';

  // to check if the project id was already selected,
  // to initialize <ProjectSelect /> correctly when coming back to the step
  const functionCheckPrevSelection = (
    isVCS: boolean,
    values: CreditBasicsFormValues,
  ): number | undefined => {
    if (isVCS) {
      const metadata = values.metadata as VCSBatchMetadataLD;
      const projectId = metadata['regen:vcsProjectId'];
      return projectId;
    }
    return;
  };

  return (
    <OnBoardingCard>
      <CreditClassSelect<CreditBasicsFormValues> name="classId" required />
      <ProjectSelect
        creditClassId={values.classId}
        name="metadata['regen:vcsProjectId']"
        required
        initialSelection={functionCheckPrevSelection(isVCS, values)}
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
        The dates should correspond to the batch monitoring period or vintage.
      </Body>
      {isVCS ? (
        <>
          <Field
            name="metadata['regen:vcsRetirementSerialNumber']"
            label="VCS retirement serial number"
            required={isVCS}
            component={TextField}
          />

          {/* TODO - Disabled */}

          {/* <AdditionalCerfications
            certifications={
              // values.metadata?.['regen:additionalCertifications'] as NameUrl[]
              // (values.metadata as Partial<VCSBatchMetadataLD>) &&
              (values.metadata?.[
                'regen:additionalCertifications'
              ] as NameUrl[]) || []
            }
          /> */}
        </>
      ) : values?.classId ? (
        <MetadataJSONField required={!isVCS} />
      ) : null}
    </OnBoardingCard>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
              onSubmit={(cert: NameUrl) => {
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
