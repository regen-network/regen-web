import { useFormState } from 'react-hook-form';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

import { useProjectEditContext } from 'pages/ProjectEdit';
import { ProjectPageFooter } from 'components/molecules';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { DEFAULT_URL } from './MediaForm.constants';
import { mediaFormSchema, MediaFormSchemaType } from './MediaForm.schema';
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

  const { confirmSave, isEdit } = useProjectEditContext();
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  return (
    <OnBoardingCard>
      <Form
        form={form}
        onSubmit={async data => {
          const hasError = false;
          if (!hasError) {
            try {
              const filteredData = {
                'regen:previewPhoto': data['regen:previewPhoto'],
                'regen:galleryPhotos': data['regen:galleryPhotos']?.filter(
                  photo => photo['schema:url'] !== DEFAULT_URL,
                ),
              };
              await submit({ values: filteredData });
              if (isEdit && confirmSave) confirmSave();
            } catch (e) {
              setErrorBannerTextAtom(errorsMapping[ERRORS.DEFAULT].title);
            }
          }
        }}
      >
        <MediaFormSimple projectId={projectId} />
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
