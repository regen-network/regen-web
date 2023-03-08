import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';

import { useProjectEditContext } from 'pages/ProjectEdit';
import { FormRef } from 'pages/ProjectEdit/ProjectEdit.types';
import { ProjectPageFooter } from 'components/molecules';

import { PHOTO_COUNT } from './MediaForm.constants';
import type { MediaErrorsSimple, MediaValuesSimple } from './MediaFormSimple';
import { MediaFormSimple } from './MediaFormSimple';

export interface MediaBaseValues {
  'regen:previewPhoto'?: string;
  'regen:galleryPhotos'?: Array<string>;
  'regen:videoURL'?: string;
}

export interface MediaBaseErrors {
  'regen:previewPhoto'?: string;
  'regen:videoURL'?: string;
}

export type MediaFormValues = MediaValuesSimple;
export type MediaErrors = MediaErrorsSimple;

export const cropAspect = { aspect: 322 / 211 }; // px values pulled from mockups (width / height)

interface MediaFormProps {
  submit: ({ values }: { values: MediaFormValues }) => Promise<void>;
  onPrev?: () => void;
  onNext?: () => void;
  initialValues: MediaFormValues;
  projectId?: string;
}

const MediaFormSchema = Yup.object().shape({
  'regen:previewPhoto': Yup.string(),
  'regen:galleryPhotos': Yup.array(Yup.string()).max(PHOTO_COUNT),
});

/** Formik Context + handlers for legacy and new media */
export const MediaForm = ({
  initialValues,
  projectId,
  ...props
}: MediaFormProps): JSX.Element => {
  const { confirmSave, isEdit, formRef } = useProjectEditContext();

  async function handleSubmit(
    values: MediaFormValues,
    { setSubmitting, setTouched }: FormikHelpers<MediaFormValues>,
  ): Promise<void> {
    try {
      await props.submit({ values });
      setTouched({}); // reset to untouched
      if (isEdit && confirmSave) confirmSave();
    } catch (e) {
      setSubmitting(false);
    }
  }

  return (
    <OnBoardingCard>
      <Formik
        innerRef={formRef as FormRef<MediaFormValues>}
        enableReinitialize
        validateOnMount
        initialValues={initialValues}
        validationSchema={MediaFormSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm, isValid, isSubmitting, dirty }) => (
          <>
            <MediaFormSimple projectId={projectId} />
            <ProjectPageFooter
              onSave={submitForm}
              onNext={props.onNext}
              onPrev={props.onPrev}
              isValid={isValid}
              isSubmitting={isSubmitting}
              dirty={dirty}
            />
          </>
        )}
      </Formik>
    </OnBoardingCard>
  );
};
