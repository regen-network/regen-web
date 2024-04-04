import React, { useCallback, useEffect } from 'react';
import { useFormState } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';
import slugify from 'slug';

import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';
import InputLabel from 'web-components/src/components/inputs/InputLabel';
import SelectTextField from 'web-components/src/components/inputs/new/SelectTextField/SelectTextField';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

import { useProjectEditContext } from 'pages';
import { DRAFT_ID } from 'pages/Dashboard/MyProjects/MyProjects.constants';
import { useCreateProjectContext } from 'pages/ProjectCreate';
import { useProjectSaveAndExit } from 'pages/ProjectCreate/hooks/useProjectSaveAndExit';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';
import { MetadataSubmitProps } from 'hooks/projects/useProjectWithMetadata';

import { ProjectPageFooter } from '../../molecules';
import {
  BASIC_INFO_NAME_DESCRIPTION,
  BASIC_INFO_NAME_LABEL,
  BASIC_INFO_NAME_PLACEHOLDER,
  BASIC_INFO_SIZE_LABEL,
} from './BasicInfoForm.constants';
import {
  basicInfoFormDraftSchema,
  basicInfoFormSchema,
  BasicInfoFormSchemaType,
} from './BasicInfoForm.schema';
import { useBasicInfoStyles } from './BasicInfoForm.styles';
import { useSubmitCreateProject } from './hooks/useSubmitCreateProject';

interface BasicInfoFormProps {
  onSubmit: (props: MetadataSubmitProps) => Promise<void>;
  onPrev?: () => void;
  initialValues?: BasicInfoFormSchemaType;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  initialValues,
  onSubmit,
  onPrev,
}) => {
  const { classes, cx } = useBasicInfoStyles();
  const { projectId } = useParams();
  const saveAndExit = useProjectSaveAndExit();
  const { formRef, shouldNavigateRef, isDraftRef } = useCreateProjectContext();
  const form = useZodForm({
    schema: basicInfoFormSchema,
    draftSchema: basicInfoFormDraftSchema,
    defaultValues: {
      ...initialValues,
    },
    isDraftRef,
    mode: 'onBlur',
  });
  const { isValid, isSubmitting, isDirty, errors } = useFormState({
    control: form.control,
  });
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const { confirmSave, isEdit, isDirtyRef } = useProjectEditContext();
  const { submitCreateProject } = useSubmitCreateProject();

  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirtyRef, isDirty]);

  const submitUntilSuccess = useCallback(
    async (values: BasicInfoFormSchemaType, slugIndex: number) => {
      try {
        const slugEnd = slugIndex ? `-${slugIndex + 1}` : '';
        const slug = `${slugify(values['schema:name'])}${slugEnd}`;
        if (!isEdit && projectId === DRAFT_ID) {
          await submitCreateProject({
            values,
            shouldNavigate: shouldNavigateRef?.current,
            projectInput: {
              slug,
            },
          });
        } else {
          await onSubmit({
            values,
            shouldNavigate: shouldNavigateRef?.current,
            projectPatch:
              !isEdit &&
              !!values['schema:name'] &&
              initialValues?.['schema:name'] !== values['schema:name']
                ? {
                    slug,
                  }
                : undefined,
          });
          if (isEdit && confirmSave) {
            confirmSave();
            form.reset({}, { keepValues: true });
          }
        }
      } catch (e) {
        console.log('e', e);
        if (
          (e as Error)?.message.includes(
            'duplicate key value violates unique constraint "project_slug_key"',
          )
        ) {
          submitUntilSuccess(values, slugIndex + 1);
        } else setErrorBannerTextAtom(errorsMapping[ERRORS.DEFAULT].title);
      }
    },
    [
      confirmSave,
      form,
      initialValues,
      isEdit,
      onSubmit,
      projectId,
      setErrorBannerTextAtom,
      shouldNavigateRef,
      submitCreateProject,
    ],
  );

  return (
    <Form
      form={form}
      formRef={formRef}
      isDraftRef={isDraftRef}
      onSubmit={values => submitUntilSuccess(values, 0)}
    >
      <OnBoardingCard>
        <TextField
          label={BASIC_INFO_NAME_LABEL}
          description={BASIC_INFO_NAME_DESCRIPTION}
          placeholder={BASIC_INFO_NAME_PLACEHOLDER}
          error={!!errors['schema:name']}
          helperText={errors['schema:name']?.message}
          {...form.register('schema:name')}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', pt: [3, 12] }}>
          <InputLabel>{BASIC_INFO_SIZE_LABEL}</InputLabel>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <TextField
              className={cx(classes.parcelField, classes.parcelSize)}
              type="number"
              customInputProps={{ step: 'any' }}
              sx={{ mt: { xs: 0, sm: 0 } }}
              error={!!errors['regen:projectSize']}
              helperText={
                errors['regen:projectSize']?.['qudt:numericValue']?.message
              }
              {...form.register('regen:projectSize.qudt:numericValue', {
                valueAsNumber: true,
              })}
            />
            <SelectTextField
              className={cx(classes.parcelField, classes.parcelUnit)}
              options={[
                {
                  value: 'unit:HA',
                  label: 'Hectares',
                },
                {
                  value: 'unit:AC',
                  label: 'Acres',
                },
              ]}
              defaultStyle={false}
              native={false}
              {...form.register('regen:projectSize.qudt:unit')}
            />
          </Box>
        </Box>
      </OnBoardingCard>
      <ProjectPageFooter
        onPrev={onPrev}
        isValid={isValid}
        isSubmitting={isSubmitting}
        dirty={isDirty}
        saveAndExit={saveAndExit}
      />
    </Form>
  );
};

export { BasicInfoForm };
