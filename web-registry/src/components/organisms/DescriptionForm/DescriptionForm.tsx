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
  STORY_TITLE_CHAR_LIMIT,
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
  // onSuccess,
}) => {
  const form = useZodForm({
    schema: descriptionFormSchema,
    defaultValues: {
      ...initialValues,
    },
    mode: 'onBlur',
  });
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const { confirmSave, isEdit, formRef } = useProjectEditContext();

  const { isValid, isSubmitting, isDirty, errors } = useFormState({
    control: form.control,
  });
  console.log('errors', errors);

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

  return (
    <Form
      form={form}
      onSubmit={async values => {
        const hasError = false;
        if (!hasError) {
          try {
            await onSubmit({ values });
            if (isEdit && confirmSave) confirmSave();
            // onSuccess && onSuccess();
          } catch (e) {
            setErrorBannerTextAtom(errorsMapping[ERRORS.DEFAULT].title);
          }
        }
      }}
    >
      <OnBoardingCard>
        <TextAreaField
          type="text"
          label="Brief project summary"
          description="A brief description of your ecological impact project and the property on which it is implemented. This is your elevator pitch to credit buyers."
          rows={3}
          disabled={isSubmitting}
          multiline
          optional="(recommended)"
          helperText={errors['schema:description']?.message}
          error={!!errors['schema:description']}
          {...form.register('schema:description')}
        >
          <TextAreaFieldChartCounter value={description} />
        </TextAreaField>
      </OnBoardingCard>
      <OnBoardingCard>
        <TextAreaField
          type="text"
          label="Long-form project story"
          description="Tell the deeper story of what makes this project special. Describe the land stewards and why they do this work, the ecological impacts (plants, animals, ecosystems), and social impacts (community, jobs, health)."
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
          label="Project story title"
          description="In one sentence, summarize the story above."
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
