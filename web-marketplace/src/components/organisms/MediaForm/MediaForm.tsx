import { useRef, useState } from 'react';
import { useFormState } from 'react-hook-form';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';
import { deleteImage } from 'web-components/src/utils/s3';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { apiServerUrl } from 'lib/env';

import { useCreateProjectContext } from 'pages/ProjectCreate';
import { useProjectEditContext } from 'pages/ProjectEdit';
import { ProjectPageFooter } from 'components/molecules';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';
import { MetadataSubmitProps } from 'hooks/projects/useProjectWithMetadata';

import { DEFAULT } from './MediaForm.constants';
import { mediaFormSchema, MediaFormSchemaType } from './MediaForm.schema';
import { MediaFormPhotos } from './MediaFormPhotos';
import { MediaFormStory } from './MediaFormStory';
import { useProjectSaveAndExit } from 'pages/ProjectCreate/hooks/useProjectSaveAndExit';

interface MediaFormProps {
  submit: (props: MetadataSubmitProps) => Promise<void>;
  onPrev?: () => void;
  initialValues: MediaFormSchemaType;
  projectId?: string;
}

export const MediaForm = ({
  initialValues,
  projectId,
  submit,
  onPrev,
}: MediaFormProps): JSX.Element => {
  const form = useZodForm({
    schema: mediaFormSchema,
    defaultValues: {
      ...initialValues,
    },
    mode: 'onBlur',
  });
  const { isSubmitting, isDirty, isValid } = useFormState({
    control: form.control,
  });
  const saveAndExit = useProjectSaveAndExit();

  const fileNamesToDeleteRef = useRef<string[]>([]);
  const { formRef, shouldNavigateRef } = useCreateProjectContext();

  const { confirmSave, isEdit, isDirtyRef } = useProjectEditContext();
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const [offChainProjectId, setOffChainProjectId] = useState(projectId);

  return (
    <Form
      formRef={formRef}
      form={form}
      onSubmit={async data => {
        try {
          // Remove the placeholder input
          const filteredData = {
            'regen:previewPhoto': data['regen:previewPhoto'],
            'regen:galleryPhotos': data['regen:galleryPhotos']?.filter(
              photo => photo['schema:url'] !== DEFAULT,
            ),
            'regen:storyMedia': data?.['regen:storyMedia'],
          };
          // Submit
          await submit({
            values: filteredData,
            shouldNavigate: shouldNavigateRef?.current,
          });
          // Delete any images that were removed on S3
          await Promise.all(
            fileNamesToDeleteRef?.current.map(
              async fileName =>
                await deleteImage(
                  offChainProjectId ?? '',
                  fileName,
                  apiServerUrl,
                ),
            ),
          );
          fileNamesToDeleteRef.current = [];
          // Save callback
          if (isEdit && confirmSave) {
            confirmSave();
            form.reset({}, { keepValues: true });
          }
          // Reset dirty state
          isDirtyRef.current = false;
        } catch (e) {
          setErrorBannerTextAtom(errorsMapping[ERRORS.DEFAULT].title);
        }
      }}
    >
      <OnBoardingCard>
        <MediaFormPhotos
          offChainProjectId={offChainProjectId}
          fileNamesToDeleteRef={fileNamesToDeleteRef}
          setOffChainProjectId={setOffChainProjectId}
        />
      </OnBoardingCard>
      <OnBoardingCard>
        <MediaFormStory
          offChainProjectId={offChainProjectId}
          fileNamesToDeleteRef={fileNamesToDeleteRef}
          setOffChainProjectId={setOffChainProjectId}
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
