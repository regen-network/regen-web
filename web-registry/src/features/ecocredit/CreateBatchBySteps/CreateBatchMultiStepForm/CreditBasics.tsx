import React, { useState, useEffect } from 'react';
import { useFormikContext, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { isPast } from 'date-fns';
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
  invalidPastDate,
  vcsRetirementSerialRE,
  invalidVCSRetirement,
  isValidJSON,
  invalidJSON,
} from 'web-components/lib/components/inputs/validation';
import { NameUrl } from 'web-components/lib/types/rdf';
import { VCSBatchMetadataLD } from 'web-components/lib/types/rdf/C01-verified-carbon-standard-batch';
import { Option } from 'web-components/lib/components/inputs/SelectTextField';
import SelectTextField from 'web-components/lib/components/inputs/SelectTextField';

import useQueryProjectsByIssuer from '../../../../hooks/useQueryProjectsByIssuer';
import { MetadataJSONField } from '../../../../components/molecules';
import { useWallet } from '../../../../lib/wallet';

import useUpdateProjectClass from '../hooks/useUpdateProjectClass';
import useUpdateProjectOptions from '../hooks/useUpdateProjectOptions';
import useSaveProjectSelectedOption from '../hooks/useSaveProjectSelectedOption';

export interface CreditBasicsFormValues {
  projectId: string;
  startDate: Date | null;
  endDate: Date | null;
  metadata?: Partial<VCSBatchMetadataLD> | string | undefined;
}

const vcsMetadataSchema: Yup.AnyObjectSchema = Yup.object({
  'regen:vcsRetirementSerialNumber': Yup.string()
    .required(requiredMessage)
    .matches(vcsRetirementSerialRE, { message: invalidVCSRetirement }),
});

const JSONSchema = Yup.string().test(
  'is-json',
  invalidJSON,
  (value, context) => !!value && isValidJSON(value),
);

const isPastDateTest = {
  name: 'is-past-date',
  message: invalidPastDate,
  test: (value: Date | undefined) => {
    if (!value) return false;
    return isPast(value);
  },
};

export const validationSchemaFields = {
  projectId: Yup.string().required(requiredMessage),
  startDate: Yup.date()
    .required(requiredMessage)
    .typeError(invalidDate)
    .test({ ...isPastDateTest }),
  endDate: Yup.date()
    .required(requiredMessage)
    .typeError(invalidDate)
    .test({ ...isPastDateTest }),
  metadata: Yup.object().when('projectId', {
    // TODO: this is a hack to make V4 testnet work. C02 is a copy of C01 on V4. In PROD/mainnet, this should only be C01
    is: (val: string) => val?.startsWith('C01') || val?.startsWith('C02'),
    then: schema => vcsMetadataSchema,
    otherwise: schema => JSONSchema,
  }),
};

export const validationSchema = Yup.object(validationSchemaFields);

export const initialValues = {
  projectId: '',
  startDate: null,
  endDate: null,
  metadata: '',
};

type Props = {
  saveProjectOptionSelected: (project: Option) => void;
};

export default function CreditBasics({
  saveProjectOptionSelected,
}: Props): React.ReactElement {
  const { wallet } = useWallet();
  const projects = useQueryProjectsByIssuer(wallet!.address);

  const { values, validateForm } = useFormikContext<CreditBasicsFormValues>();
  const { projectId } = values;

  const { classId, isVCS } = useUpdateProjectClass(projectId);

  const projectOptions = useUpdateProjectOptions(projects);

  useSaveProjectSelectedOption({
    projectId,
    projectOptions,
    projects,
    saveProjectOptionSelected,
  });

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  return (
    <OnBoardingCard>
      <Field
        label="Project"
        name="projectId"
        component={SelectTextField}
        options={projectOptions}
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
            maxDate={values.endDate || new Date()}
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
            maxDate={new Date()}
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

          <AdditionalCerfications
            certifications={
              (values.metadata as VCSBatchMetadataLD)[
                'regen:additionalCertifications'
              ] || []
            }
          />
        </>
      ) : projectId && classId ? (
        <MetadataJSONField classId={classId} required={!isVCS} />
      ) : null}
    </OnBoardingCard>
  );
}

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
                key={`additional-certifications-${index}`}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 3,
                  py: 2,
                  pl: 5,
                  pr: 2,
                  border: 1,
                  borderColor: 'info.light',
                  bgcolor: 'grey.50',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <span>{cert['schema:name']}</span>
                  <Link
                    sx={{ color: 'secondary.main', fontWeight: 'bold' }}
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
