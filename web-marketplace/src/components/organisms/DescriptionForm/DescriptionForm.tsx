import { useEffect, useMemo } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import { msg, plural } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';
import { getRemainingCharacters } from 'utils/string/getRemainingCharacters';

import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';
import { TextAreaField } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField';
import { TextAreaFieldChartCounter } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField.ChartCounter';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

import { useCreateProjectContext } from 'pages/ProjectCreate';
import { useProjectSaveAndExit } from 'pages/ProjectCreate/hooks/useProjectSaveAndExit';
import { useProjectEditContext } from 'pages/ProjectEdit';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';
import { MetadataSubmitProps } from 'hooks/projects/useProjectWithMetadata';

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
  DescriptionSchemaType,
  getDescriptionFormSchema,
} from './DescriptionForm.schema';

interface DescriptionFormProps {
  onSubmit: (props: MetadataSubmitProps) => Promise<void>;
  onPrev?: () => void;
  initialValues?: DescriptionSchemaType;
}

const DescriptionForm: React.FC<DescriptionFormProps> = ({
  initialValues,
  onSubmit,
  onPrev,
}) => {
  const { _ } = useLingui();
  const { formRef, shouldNavigateRef, isDraftRef } = useCreateProjectContext();
  const descriptionFormSchema = useMemo(() => getDescriptionFormSchema(_), [_]);
  const form = useZodForm({
    schema: descriptionFormSchema,
    draftSchema: descriptionFormSchema, // same schema since all fields are optional
    defaultValues: {
      ...initialValues,
    },
    isDraftRef,
    mode: 'onBlur',
  });
  const saveAndExit = useProjectSaveAndExit();

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
  const remainingSummaryCharacters = useMemo(
    () =>
      getRemainingCharacters({
        value: description,
        charLimit: SUMMARY_CHAR_LIMIT,
      }),
    [description],
  );
  const remainingStoryCharacters = useMemo(
    () =>
      getRemainingCharacters({
        value: story,
        charLimit: STORY_CHAR_LIMIT,
      }),
    [story],
  );
  const remainingStoryTitleCharacters = useMemo(
    () =>
      getRemainingCharacters({
        value: storyTitle,
        charLimit: STORY_TITLE_CHAR_LIMIT,
      }),
    [storyTitle],
  );

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
          await onSubmit({
            values,
            shouldNavigate: shouldNavigateRef?.current,
          });
          if (isEdit && confirmSave) {
            confirmSave();
            form.reset({}, { keepValues: true });
          }
        } catch (e) {
          setErrorBannerTextAtom(_(errorsMapping[ERRORS.DEFAULT].title));
        }
      }}
    >
      <OnBoardingCard sx={{ mb: [2.5], ...(isEdit && { mt: [0] }) }}>
        <TextAreaField
          type="text"
          label={_(SUMMARY_LABEL)}
          description={_(SUMMARY_DESCRIPTION)}
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
            charsLeft={remainingSummaryCharacters}
            remainingCharactersText={plural(remainingSummaryCharacters, {
              one: `${remainingSummaryCharacters} character remaining`,
              other: `${remainingSummaryCharacters} characters remaining`,
            })}
          />
        </TextAreaField>
      </OnBoardingCard>
      <OnBoardingCard sx={{ mt: [0] }}>
        <TextAreaField
          type="text"
          label={_(STORY_LABEL)}
          description={_(STORY_DESCRIPTION)}
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
            charsLeft={remainingStoryCharacters}
            remainingCharactersText={plural(remainingStoryCharacters, {
              one: `${remainingStoryCharacters} character remaining`,
              other: `${remainingStoryCharacters} characters remaining`,
            })}
          />
        </TextAreaField>
        <TextAreaField
          type="text"
          label={_(STORY_TITLE_LABEL)}
          description={_(STORY_TITLE_DESCRIPTION)}
          rows={2}
          disabled={isSubmitting}
          multiline
          optional={_(msg`(required if you added a project story)`)}
          helperText={errors['regen:storyTitle']?.message}
          error={!!errors['regen:storyTitle']}
          {...form.register('regen:storyTitle')}
        >
          <TextAreaFieldChartCounter
            value={storyTitle}
            charsLeft={remainingStoryTitleCharacters}
            remainingCharactersText={plural(remainingStoryTitleCharacters, {
              one: `${remainingStoryTitleCharacters} character remaining`,
              other: `${remainingStoryTitleCharacters} characters remaining`,
            })}
          />
        </TextAreaField>
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

export { DescriptionForm };
