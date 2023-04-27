import { useRef } from 'react';
import { useFormState } from 'react-hook-form';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import { deleteImage } from 'web-components/lib/utils/s3';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { apiServerUrl } from 'lib/env';

import { useProjectEditContext } from 'pages/ProjectEdit';
import { ProjectPageFooter } from 'components/molecules';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { DEFAULT_URL } from './MediaForm.constants';
import { mediaFormSchema, MediaFormSchemaType } from './MediaForm.schema';
import { validateMediaFormForm } from './MediaForm.utils';
import { MediaFormSimple } from './MediaFormSimple';

interface MediaFormProps {
  submit: ({ values }: { values: MediaFormSchemaType }) => Promise<void>;
  onPrev?: () => void;
  onNext?: () => void;
  initialValues: MediaFormSchemaType;
  projectId?: string;
}

export const MediaForm = ({
  initialValues,
  projectId,
  submit,
  onNext,
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
  const fileNamesToDeleteRef = useRef<string[]>([]);
  const { isDirtyRef } = useProjectEditContext();

  const { confirmSave, isEdit } = useProjectEditContext();
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  return (
    <OnBoardingCard>
      <Form
        form={form}
        onSubmit={async data => {
          const hasError = validateMediaFormForm({
            values: data,
            setError: form.setError,
          });
          if (!hasError) {
            try {
              // Remove the placeholder input
              const filteredData = {
                'regen:previewPhoto': data['regen:previewPhoto'],
                'regen:galleryPhotos': data['regen:galleryPhotos']?.filter(
                  photo => photo['schema:url'] !== DEFAULT_URL,
                ),
              };
              // Submit
              await submit({ values: filteredData });
              // Delete any images that were removed on S3
              await Promise.all(
                fileNamesToDeleteRef?.current.map(
                  async fileName =>
                    await deleteImage(projectId ?? '', fileName, apiServerUrl),
                ),
              );
              fileNamesToDeleteRef.current = [];
              // Save callback
              if (isEdit && confirmSave) confirmSave();
              // Reset dirty state
              isDirtyRef.current = false;
            } catch (e) {
              setErrorBannerTextAtom(errorsMapping[ERRORS.DEFAULT].title);
            }
          }
        }}
      >
        <MediaFormSimple
          projectId={projectId}
          fileNamesToDeleteRef={fileNamesToDeleteRef}
        />
        <ProjectPageFooter
          onNext={onNext}
          onPrev={onPrev}
          isValid={isValid}
          isSubmitting={isSubmitting}
          dirty={isDirty}
        />
      </Form>
    </OnBoardingCard>
  );
};
