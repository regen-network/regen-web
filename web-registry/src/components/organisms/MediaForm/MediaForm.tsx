import React from 'react';
import { Formik, FormikHelpers } from 'formik';

import { requiredMessage } from 'web-components/lib/components/inputs/validation';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import { UrlType, UrlList } from 'web-components/lib/utils/schemaURL';

import {
  validate,
  getProjectPageBaseData,
  getCompactedPath,
} from '../../../lib/rdf';
import { ProjectPageFooter } from '../../molecules';
import { useProjectEditContext } from '../../../pages/ProjectEdit';
import { MediaFormVCS } from './MediaFormVCS';
import { MediaFormNonVCS } from './MediaFormNonVCS';

import type { MediaValuesVCS, MediaErrorsVCS } from './MediaFormVCS';
import type { MediaErrorsNonVCS, MediaValuesNonVCS } from './MediaFormNonVCS';
import type { ShaclGraphByUriQuery, Maybe } from '../../../generated/graphql';

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

export type MediaValues = MediaValuesVCS | MediaValuesNonVCS;
type MediaErrors = MediaErrorsVCS | MediaErrorsNonVCS;

export function isVCSValues(
  _values: MediaValues,
  ccId?: Maybe<string> | string,
): _values is MediaValuesVCS {
  return !!ccId;
}

function isVCSErrors(
  _errors: MediaErrors,
  ccId?: Maybe<string> | string,
): _errors is MediaErrorsVCS {
  return !!ccId;
}

export const cropAspect = { aspect: 322 / 211 }; // px values pulled from mockups (width / height)

interface MediaFormProps {
  submit: (values: MediaValues) => Promise<void>;
  onPrev?: () => void;
  onNext?: () => void;
  initialValues: MediaValues;
  creditClassId?: string | null;
  graphData?: ShaclGraphByUriQuery;
}

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
        const path: string = result.path.value;
        const compactedPath = getCompactedPath(path) as
          | keyof MediaValues
          | undefined;
        if (compactedPath) {
          if (
            [
              'regen:previewPhoto',
              'regen:videoURL',
              'regen:landStewardPhoto',
            ].includes(compactedPath)
          ) {
            errors[compactedPath] = { '@value': requiredMessage };
          }
          if (compactedPath === 'regen:galleryPhotos') {
            if (!isVCSErrors(errors, creditClassId)) {
              errors[compactedPath] = requiredMessage;
            }
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
        {({ submitForm, isValid, isSubmitting, touched }) => (
          <>
            {!!creditClassId ? <MediaFormVCS /> : <MediaFormNonVCS />}
            <ProjectPageFooter
              onSave={submitForm}
              onNext={props.onNext}
              onPrev={props.onPrev}
              saveDisabled={
                !isValid || isSubmitting || !Object.keys(touched).length
              }
            />
          </>
        )}
      </Formik>
    </OnBoardingCard>
  );
};
