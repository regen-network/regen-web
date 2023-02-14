import { Formik, FormikHelpers } from 'formik';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';

import type { ShaclGraphByUriQuery } from 'generated/graphql';

import { useProjectEditContext } from 'pages/ProjectEdit';
import { ProjectPageFooter } from 'components/molecules';

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

export type MediaValues = MediaValuesSimple;
export type MediaErrors = MediaErrorsSimple;

export const cropAspect = { aspect: 322 / 211 }; // px values pulled from mockups (width / height)

interface MediaFormProps {
  submit: ({ values }: { values: MediaValues }) => Promise<void>;
  onPrev?: () => void;
  onNext?: () => void;
  initialValues: MediaValues;
  graphData?: ShaclGraphByUriQuery;
  projectId?: string;
}

/** Formik Context + handlers for legacy and new media */
export const MediaForm = ({
  initialValues,
  graphData,
  projectId,
  ...props
}: MediaFormProps): JSX.Element => {
  const { confirmSave, isEdit } = useProjectEditContext();

  async function handleSubmit(
    values: MediaValues,
    { setSubmitting, setTouched }: FormikHelpers<MediaValues>,
  ): Promise<void> {
    try {
      await props.submit({ values });
      setTouched({}); // reset to untouched
      if (isEdit && confirmSave) confirmSave();
    } catch (e) {
      setSubmitting(false);
    }
  }

  const handleValidate = async (values: MediaValues): Promise<MediaErrors> => {
    const errors: MediaErrors = {};
    // TODO regen-registry/issues/1501
    // if (graphData?.shaclGraphByUri?.graph) {
    //   const projectPageData = {
    //     ...getProjectBaseData(),
    //     ...values,
    //   };
    //   const report = await validate(
    //     graphData.shaclGraphByUri.graph,
    //     projectPageData,
    //     'http://regen.network/ProjectPageMediaGroup',
    //   );
    //   for (const result of report.results) {
    //     const path: string = result.path?.value;
    //     let compactedPath: keyof MediaValues | undefined;
    //     if (path) {
    //       compactedPath = getCompactedPath(path) as
    //         | keyof MediaValues
    //         | undefined;
    //     }
    //     if (compactedPath) {
    //       errors[compactedPath] = requiredMessage;
    //     }
    //   }
    // }
    return errors;
  };

  return (
    <OnBoardingCard>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={initialValues}
        validate={handleValidate}
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
