import React, { useEffect, useState } from 'react';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box, IconButton, Link } from '@mui/material';
import { isPast } from 'date-fns';
import { Field, FieldArray, useFormikContext } from 'formik';
import * as Yup from 'yup';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';
import TrashIcon from 'web-components/src/components/icons/TrashIcon';
import { DatePickField } from 'web-components/src/components/inputs/DatePickField';
import InputLabel from 'web-components/src/components/inputs/InputLabel';
import SelectTextField, {
  Option,
} from 'web-components/src/components/inputs/SelectTextField';
import TextField from 'web-components/src/components/inputs/TextField';
import {
  isValidJSON,
  vcsRetirementSerialRE,
} from 'web-components/src/components/inputs/validation';
import { Body } from 'web-components/src/components/typography';

import { useAuth } from 'lib/auth/auth';
import { NameUrl } from 'lib/rdf/types';

import { AddCertificationModal } from 'components/organisms/Modals/AddCertificationModal/AddCertificationModal';

import { MetadataJSONField } from '../../../../components/molecules';
import useQueryProjectsByIssuer from '../../../../hooks/useQueryProjectsByIssuer';
import { useWallet } from '../../../../lib/wallet/wallet';
import useSaveProjectSelectedOption from '../hooks/useSaveProjectSelectedOption';
import useUpdateProjectOptions from '../hooks/useUpdateProjectOptions';

export interface CreditBasicsFormValues {
  projectId: string;
  startDate: Date | null;
  endDate: Date | null;
  metadata?: any; //TODO: type that works for any metadata shape
}

type VcsMetadataSchemaParams = {
  requiredMessage: string;
  invalidVCSRetirement: string;
};

export const getVcsMetadataSchema = ({
  requiredMessage,
  invalidVCSRetirement,
}: VcsMetadataSchemaParams): Yup.AnyObjectSchema =>
  Yup.object({
    'regen:vcsRetirementSerialNumber': Yup.string()
      .required(requiredMessage)
      .matches(vcsRetirementSerialRE, { message: invalidVCSRetirement }),
  });

type getJSONSchemaParams = {
  invalidJSON: string;
};

export const getJSONSchema = ({ invalidJSON }: getJSONSchemaParams) =>
  Yup.string().test(
    'is-json',
    invalidJSON,
    (value, context) => !!value && isValidJSON(value),
  );

type getIsPastDateTestParams = {
  invalidPastDate: string;
};

export const getIsPastDateTest = ({
  invalidPastDate,
}: getIsPastDateTestParams) => ({
  name: 'is-past-date',
  message: invalidPastDate,
  test: (value: Date | undefined) => {
    if (!value) return false;
    return isPast(value);
  },
});

type getCreditBasicsValidationSchemaFieldsParams = {
  requiredMessage: string;
  invalidDate: string;
  isPastDateTest: ReturnType<typeof getIsPastDateTest>;
  vcsMetadataSchema: ReturnType<typeof getVcsMetadataSchema>;
  JSONSchema: ReturnType<typeof getJSONSchema>;
};

export const getCreditBasicsValidationSchemaFields = ({
  requiredMessage,
  invalidDate,
  isPastDateTest,
  vcsMetadataSchema,
  JSONSchema,
}: getCreditBasicsValidationSchemaFieldsParams) => ({
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
    is: (val: string) => val?.startsWith('C01'),
    then: schema => vcsMetadataSchema,
    otherwise: schema => JSONSchema,
  }),
});

type getCreditBasicsValidationSchemaParams = {
  requiredMessage: string;
  invalidDate: string;
  isPastDateTest: ReturnType<typeof getIsPastDateTest>;
  invalidVCSRetirement: string;
  invalidJSON: string;
};

export const getCreditBasicsValidationSchema = ({
  requiredMessage,
  invalidDate,
  isPastDateTest,
  invalidVCSRetirement,
  invalidJSON,
}: getCreditBasicsValidationSchemaParams) =>
  Yup.object(
    getCreditBasicsValidationSchemaFields({
      requiredMessage,
      invalidDate,
      isPastDateTest,
      vcsMetadataSchema: getVcsMetadataSchema({
        requiredMessage,
        invalidVCSRetirement,
      }),
      JSONSchema: getJSONSchema({ invalidJSON }),
    }),
  );

export const creditBasicsInitialValues = {
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
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const { activeAccount } = useAuth();
  const projects = useQueryProjectsByIssuer(
    activeAccount?.addr ?? wallet?.address,
  );

  const { values, validateForm } = useFormikContext<CreditBasicsFormValues>();
  const { projectId } = values;

  const classId = projectId.split('-')[0];
  const isVCS = classId === 'C01';

  const projectOptions = useUpdateProjectOptions(projects);

  useSaveProjectSelectedOption({
    projectId,
    projectOptions,
    saveProjectOptionSelected,
  });

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  return (
    <OnBoardingCard>
      <Field
        label={_(msg`Project`)}
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
            label={_(msg`Start Date`)}
            placeholder={_(msg`Start Date`)}
            name="startDate"
            required
            maxDate={values.endDate || new Date()}
            component={DatePickField}
          />
        </Box>
        <Box sx={{ mt: [10, 0], ml: [0, 1] }}>
          <Field
            label={_(msg`End Date`)}
            placeholder={_(msg`End Date`)}
            name="endDate"
            required
            minDate={values.startDate}
            maxDate={new Date()}
            component={DatePickField}
          />
        </Box>
      </Box>
      <Body size="sm" mt={2}>
        <Trans>
          The dates should correspond to the batch monitoring period or vintage.
        </Trans>
      </Body>
      {isVCS ? (
        <>
          <Field
            name="metadata['regen:vcsRetirementSerialNumber']"
            label={_(msg`VCS retirement serial number`)}
            required={isVCS}
            component={TextField}
          />

          <AdditionalCerfications
            certifications={
              values.metadata?.['regen:additionalCertifications'] || []
            }
          />
        </>
      ) : (
        classId && <MetadataJSONField classId={classId} />
      )}
    </OnBoardingCard>
  );
}

const AdditionalCerfications: React.FC<
  React.PropsWithChildren<{
    certifications: NameUrl[];
  }>
> = ({ certifications }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box sx={{ mt: 10 }}>
      <InputLabel optional>
        <Trans>Additional Certifications</Trans>
      </InputLabel>
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
                  <TrashIcon className="text-brand-100" />
                </IconButton>
              </Box>
            ))}
            <OutlinedButton
              onClick={() => setModalOpen(true)}
              sx={{ mt: 3, width: '100%' }}
            >
              <Trans>+ add certification</Trans>
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
