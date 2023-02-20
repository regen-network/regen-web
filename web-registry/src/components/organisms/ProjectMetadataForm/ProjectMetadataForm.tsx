import { useCallback } from 'react';
import { Field, Form, Formik, FormikErrors } from 'formik';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import ControlledFormLabel from 'web-components/lib/components/form/ControlledFormLabel';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import {
  invalidJSON,
  isValidJSON,
} from 'web-components/lib/components/inputs/validation';
import { Body } from 'web-components/lib/components/typography';

import { ProjectMetadataLD } from 'lib/db/types/json-ld';
import { getCompactedPath, getProjectBaseData, validate } from 'lib/rdf';

import { UseProjectMetadataSubmitReturn } from 'pages/ProjectMetadata/hooks/useProjectMetadataSubmit';

import { ShaclGraphByUriQuery } from '../../../generated/graphql';
import { useProjectEditContext } from '../../../pages/ProjectEdit';
import { ProjectPageFooter } from '../../molecules';
import { useStyles } from './ProjectMetadataForm.styles';

interface ProjectMetadataFormProps {
  submit: UseProjectMetadataSubmitReturn;
  initialValues?: Partial<ProjectMetadataLD>;
  graphData?: ShaclGraphByUriQuery;
  onNext?: () => void;
  onPrev?: () => void;
  creditClassId?: string;
}

export interface ProjectMetadataValues {
  metadata: string;
}

export const ProjectMetadataForm = ({
  submit,
  initialValues,
  onNext,
  onPrev,
  graphData,
  creditClassId,
}: ProjectMetadataFormProps): JSX.Element => {
  const { confirmSave, isEdit } = useProjectEditContext();
  const { classes: styles } = useStyles();

  const validateForm = useCallback(
    async (values: ProjectMetadataValues) => {
      const errors: FormikErrors<ProjectMetadataValues> = {};
      const metadata = values.metadata;
      const validJSON = !!metadata && isValidJSON(metadata);
      if (!validJSON) {
        errors.metadata = invalidJSON;
      } else if (creditClassId && graphData?.shaclGraphByUri?.graph) {
        const projectPageData = {
          ...getProjectBaseData(creditClassId),
          ...JSON.parse(metadata),
        };
        const report = await validate(
          graphData.shaclGraphByUri.graph,
          projectPageData,
          'http://regen.network/ProjectPageMetadataGroup',
        );
        for (const result of report.results) {
          const path: string = result.path.value;
          const message = result.message?.[0]?.value;
          const compactedPath = getCompactedPath(path);
          if (compactedPath && message)
            errors.metadata = (errors.metadata || '').concat(
              `${compactedPath}: ${message}\n`,
            );
        }
      }
      return errors;
    },
    [creditClassId, graphData],
  );

  return (
    <Formik
      enableReinitialize
      validateOnMount
      initialValues={{
        metadata: initialValues ? JSON.stringify(initialValues, null, 2) : '',
      }}
      validate={validateForm}
      onSubmit={async (values, { setTouched }) => {
        await submit(values);
        setTouched({}); // reset to untouched
        if (isEdit && confirmSave) confirmSave();
      }}
    >
      {({ submitForm, isValid, isSubmitting, dirty }) => {
        return (
          <Form translate="yes">
            <OnBoardingCard>
              <ControlledFormLabel>{'Project metadata'}</ControlledFormLabel>
              <Body size="sm" mt={1} mb={3}>
                {
                  'Attach arbitrary JSON-LD metadata to the credit batch below. '
                }
              </Body>
              <Field
                component={ControlledTextField}
                name="metadata"
                rows={5}
                multiline
                defaultStyle={false}
                className={styles.field}
              />
            </OnBoardingCard>
            <ProjectPageFooter
              onSave={submitForm}
              onNext={onNext}
              onPrev={onPrev}
              isValid={isValid}
              isSubmitting={isSubmitting}
              dirty={dirty}
            />
          </Form>
        );
      }}
    </Formik>
  );
};
