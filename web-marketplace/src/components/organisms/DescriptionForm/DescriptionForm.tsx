import { useEffect } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import { TextAreaField } from 'web-components/lib/components/inputs/new/TextAreaField/TextAreaField';
import { TextAreaFieldChartCounter } from 'web-components/lib/components/inputs/new/TextAreaField/TextAreaField.ChartCounter';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

import { useProjectEditContext } from 'pages/ProjectEdit';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { ProjectPageFooter } from '../../molecules';
import {
  STORY_CHAR_LIMIT,
  STORY_DESCRIPTION,
  STORY_LABEL,
  STORY_TITLE_CHAR_LIMIT,
  STORY_TITLE_DESCRIPTION,
  STORY_TITLE_LABEL,
  SUMMARY_CHAR_LIMIT,
  SUMMARY_DESCRIPTION,
  SUMMARY_LABEL,
} from './DescriptionForm.constants';
import {
  descriptionFormSchema,
  DescriptionSchemaType,
} from './DescriptionForm.schema';

interface DescriptionFormProps {
  onSubmit: ({ values }: { values: DescriptionSchemaType }) => Promise<void>;
  onNext?: () => void;
  onPrev?: () => void;
  initialValues?: DescriptionSchemaType;
}

const DescriptionForm: React.FC<DescriptionFormProps> = ({
  initialValues,
  onSubmit,
  onNext,
  onPrev,
}) => {
  const form = useZodForm({
    schema: descriptionFormSchema,
    defaultValues: {
      ...initialValues,
    },
    mode: 'onBlur',
  });
  const { isValid, isSubmitting, isDirty, errors } = useFormState({
    control: form.control,
  });

  const description = useWatch({
    control: form.control,
    name: 'schema:description',
  });
  const story = useWatch({
    control: form.control,
    name: 'regen:story',
  });
  const storyTitle = useWatch({
    control: form.control,
    name: 'regen:storyTitle',
  });

  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const { confirmSave, isEdit, isDirtyRef } = useProjectEditContext();

  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirtyRef, isDirty]);

  return (
    <Form
      form={form}
      onSubmit={async values => {
        try {
          await onSubmit({ values });
          if (isEdit && confirmSave) confirmSave();
        } catch (e) {
          setErrorBannerTextAtom(errorsMapping[ERRORS.DEFAULT].title);
        }
      }}
    >
      <OnBoardingCard sx={{ mb: [2.5], ...(isEdit && { mt: [0] }) }}>
        <TextAreaField
          type="text"
          label={SUMMARY_LABEL}
          description={SUMMARY_DESCRIPTION}
          rows={3}
          disabled={isSubmitting}
          multiline
          optional="(recommended)"
          helperText={errors['schema:description']?.message}
          error={!!errors['schema:description']}
          {...form.register('schema:description')}
        >
          <TextAreaFieldChartCounter
            value={description}
            charLimit={SUMMARY_CHAR_LIMIT}
          />
        </TextAreaField>
      </OnBoardingCard>
      <OnBoardingCard sx={{ mt: [0] }}>
        <TextAreaField
          type="text"
          label={STORY_LABEL}
          description={STORY_DESCRIPTION}
          rows={10}
          disabled={isSubmitting}
          multiline
          optional="(recommended)"
          helperText={errors['regen:story']?.message}
          error={!!errors['regen:story']}
          {...form.register('regen:story')}
        >
          <TextAreaFieldChartCounter
            value={story}
            charLimit={STORY_CHAR_LIMIT}
          />
        </TextAreaField>
        <TextAreaField
          type="text"
          label={STORY_TITLE_LABEL}
          description={STORY_TITLE_DESCRIPTION}
          rows={2}
          disabled={isSubmitting}
          multiline
          optional="(required if you added a project story)"
          helperText={errors['regen:storyTitle']?.message}
          error={!!errors['regen:storyTitle']}
          {...form.register('regen:storyTitle')}
        >
          <TextAreaFieldChartCounter
            value={storyTitle}
            charLimit={STORY_TITLE_CHAR_LIMIT}
          />
        </TextAreaField>
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

export { DescriptionForm };
