import { Formik, FormikHelpers } from 'formik';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';

import type { ShaclGraphByUriQuery } from 'generated/graphql';
import { getCompactedPath, getProjectPageBaseData, validate } from 'lib/rdf';
import { UrlList, UrlType } from 'lib/rdf/types';

import { useProjectEditContext } from 'pages/ProjectEdit';
import { ProjectPageFooter } from 'components/molecules';

import { isSimpleMediaFormErrors } from './MediaForm.utils';
import type { MediaErrorsLegacy, MediaValuesLegacy } from './MediaFormLegacy';
import { MediaFormLegacy } from './MediaFormLegacy';
import type { MediaErrorsSimple, MediaValuesSimple } from './MediaFormSimple';
import { MediaFormSimple } from './MediaFormSimple';

export interface MediaBaseValues {
  'regen:previewPhoto'?: UrlType;
  'regen:galleryPhotos'?: UrlList;
  'regen:videoURL'?: UrlType;
}

type ValueObject = { '@value': string };
export interface MediaBaseErrors {
  'regen:previewPhoto'?: ValueObject;
  'regen:videoURL'?: ValueObject;
}

export type MediaValues = MediaValuesSimple | MediaValuesLegacy;
export type MediaErrors = MediaErrorsSimple | MediaErrorsLegacy;

export const cropAspect = { aspect: 322 / 211 }; // px values pulled from mockups (width / height)

interface MediaFormProps {
  submit: (values: MediaValues) => Promise<void>;
  onPrev?: () => void;
  onNext?: () => void;
  initialValues: MediaValues;
  creditClassId?: string | null;
  graphData?: ShaclGraphByUriQuery;
}

/** Formik Context + handlers for legacy and new media */
export const MediaForm = ({
  initialValues,
  graphData,
  creditClassId,
  ...props
}: MediaFormProps): JSX.Element => {
  const { confirmSave, isEdit } = useProjectEditContext();

  async function handleSubmit(
    values: MediaValues,
    { setSubmitting, setTouched }: FormikHelpers<MediaValues>,
  ): Promise<void> {
    setSubmitting(true);
    try {
      await props.submit(values);
      setSubmitting(false);
      setTouched({}); // reset to untouched
      if (isEdit && confirmSave) confirmSave();
    } catch (e) {
      setSubmitting(false);
    }
  }

  const handleValidate = async (values: MediaValues): Promise<MediaErrors> => {
    const errors: MediaErrors = {};
    if (graphData?.shaclGraphByUri?.graph) {
      const projectPageData = {
        ...getProjectPageBaseData(creditClassId),
        ...values,
      };
      const report = await validate(
        graphData.shaclGraphByUri.graph,
        projectPageData,
        'http://regen.network/ProjectPageMediaGroup',
      );
      for (const result of report.results) {
        const path: string = result.path?.value;
        let compactedPath: keyof MediaValues | undefined;
        if (path) {
          compactedPath = getCompactedPath(path) as
            | keyof MediaValues
            | undefined;
        }
        // Legacy validation logic
        if (!isSimpleMediaFormErrors(errors, creditClassId)) {
          if (path) {
            if (compactedPath === 'regen:previewPhoto') {
              errors[compactedPath] = { '@value': requiredMessage };
            } else {
              // for gallery photos, display general error message below "Gallery Photos" section
              errors['regen:galleryPhotos'] = 'You must add 4 photos';
            }
          } else {
            // sh:or constraint not satisfied on regen:landStewardPhoto/regen:videoURL
            errors['regen:landStewardPhoto'] = {
              '@value': requiredMessage,
            };
          }
        } else {
          // Simple validation logic
          if (compactedPath) {
            errors[compactedPath] = { '@value': requiredMessage };
          }
        }
      }
    }
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
        {({ submitForm, isValid, isSubmitting }) => (
          <>
            {!!creditClassId ? <MediaFormSimple /> : <MediaFormLegacy />}
            <ProjectPageFooter
              onSave={submitForm}
              onNext={props.onNext}
              onPrev={props.onPrev}
              saveDisabled={!isValid || isSubmitting}
            />
          </>
        )}
      </Formik>
    </OnBoardingCard>
  );
};
