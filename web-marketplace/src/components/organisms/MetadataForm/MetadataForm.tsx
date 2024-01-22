import React, { useEffect } from 'react';
import { useFormState } from 'react-hook-form';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';
import ControlledFormLabel from 'web-components/src/components/form/ControlledFormLabel';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { Body } from 'web-components/src/components/typography';

import { ShaclGraphByUriQuery } from 'generated/graphql';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

import { useProjectEditContext } from 'pages';
import { useCreateProjectContext } from 'pages/ProjectCreate';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { ProjectPageFooter } from '../../molecules';
import {
  metadataFormSchema,
  MetadataFormSchemaType,
} from './MetadataForm.schema';
import { useMetadataFormStyles } from './MetadataForm.styles';

interface MetadataFormFormProps {
  onSubmit: ({ values }: { values: MetadataFormSchemaType }) => Promise<void>;
  onNext?: () => void;
  onPrev?: () => void;
  initialValues?: MetadataFormSchemaType;
  creditClassId?: string;
  graphData?: ShaclGraphByUriQuery;
}

const MetadataForm: React.FC<MetadataFormFormProps> = ({
  initialValues,
  onSubmit,
  onNext,
  onPrev,
  creditClassId,
  graphData,
}) => {
  const { classes: styles } = useMetadataFormStyles();
  const form = useZodForm({
    schema: metadataFormSchema({ creditClassId, graphData }),
    defaultValues: {
      ...initialValues,
    },
    mode: 'onBlur',
  });
  const { isValid, isSubmitting, isDirty, errors } = useFormState({
    control: form.control,
  });
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const { confirmSave, isEdit, isDirtyRef } = useProjectEditContext();
  const { formRef } = useCreateProjectContext();

  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirtyRef, isDirty]);

  return (
    <Form
      form={form}
      formRef={formRef}
      onSubmit={async values => {
        try {
          await onSubmit({ values });
          if (isEdit && confirmSave) {
            confirmSave();
            form.reset({}, { keepValues: true });
          }
        } catch (e) {
          setErrorBannerTextAtom(errorsMapping[ERRORS.DEFAULT].title);
        }
      }}
    >
      <OnBoardingCard>
        <ControlledFormLabel>{'Project metadata'}</ControlledFormLabel>
        <Body size="sm" mt={1} mb={3}>
          {'Attach arbitrary JSON-LD metadata to the project metadata below. '}
        </Body>
        <TextField
          rows={5}
          multiline
          error={!!errors['metadata']}
          helperText={errors['metadata']?.message}
          sx={{
            mt: { xs: 0, sm: 0, '& .MuiInputBase-root': { height: 'auto' } },
          }}
          {...form.register('metadata')}
          className={styles.field}
        />
      </OnBoardingCard>
      <ProjectPageFooter
        onNext={onNext}
        onPrev={onPrev}
        isValid={isValid}
        isSubmitting={isSubmitting}
        dirty={isDirty}
      />
    </Form>
  );
};

export { MetadataForm };
