import React, { useEffect, useMemo } from 'react';
import { useFormState } from 'react-hook-form';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';
import { useProjectEditContext } from 'legacy-pages';
import { useCreateProjectContext } from 'legacy-pages/ProjectCreate';
import { useProjectSaveAndExit } from 'legacy-pages/ProjectCreate/hooks/useProjectSaveAndExit';

import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';
import ControlledFormLabel from 'web-components/src/components/form/ControlledFormLabel';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { Body } from 'web-components/src/components/typography';

import { ShaclGraphByUriQuery } from 'generated/graphql';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { INVALID_JSON, REQUIRED_MESSAGE } from 'lib/constants/shared.constants';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { ProjectPageFooter } from '../../molecules';
import {
  getMetadataFormSchema,
  metadataFormDraftSchema,
  MetadataFormSchemaType,
} from './MetadataForm.schema';
import { useMetadataFormStyles } from './MetadataForm.styles';

interface MetadataFormFormProps {
  onSubmit: ({ values }: { values: MetadataFormSchemaType }) => Promise<void>;
  onPrev?: () => void;
  initialValues?: MetadataFormSchemaType;
  creditClassId?: string;
  graphData?: ShaclGraphByUriQuery;
}

const MetadataForm: React.FC<MetadataFormFormProps> = ({
  initialValues,
  onSubmit,
  onPrev,
  creditClassId,
  graphData,
}) => {
  const { _ } = useLingui();
  const { classes: styles } = useMetadataFormStyles();
  const { formRef, isDraftRef } = useCreateProjectContext();
  const metadataSchema = useMemo(
    () =>
      getMetadataFormSchema({
        requiredMessage: _(REQUIRED_MESSAGE),
        invalidJSON: _(INVALID_JSON),
        creditClassId,
        graphData,
      }),
    [creditClassId, graphData, _],
  );

  const form = useZodForm({
    schema: metadataSchema,
    draftSchema: metadataFormDraftSchema,
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
  const saveAndExit = useProjectSaveAndExit();

  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirtyRef, isDirty]);

  return (
    <Form
      form={form}
      formRef={formRef}
      isDraftRef={isDraftRef}
      onSubmit={async values => {
        try {
          await onSubmit({ values });
          if (isEdit && confirmSave) {
            confirmSave();
            form.reset({}, { keepValues: true });
          }
        } catch (e) {
          setErrorBannerTextAtom(_(errorsMapping[ERRORS.DEFAULT].title));
        }
      }}
    >
      <OnBoardingCard>
        <ControlledFormLabel>
          <Trans>Project metadata</Trans>
        </ControlledFormLabel>
        <Body size="sm" mt={1} mb={3}>
          <Trans>
            Attach arbitrary JSON-LD metadata to the project metadata below.{' '}
          </Trans>
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
        onPrev={onPrev}
        isValid={isValid}
        isSubmitting={isSubmitting}
        dirty={isDirty}
        saveAndExit={saveAndExit}
      />
    </Form>
  );
};

export { MetadataForm };
