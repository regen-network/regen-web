import { Field, Form, Formik } from 'formik';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import ControlledFormLabel from 'web-components/lib/components/form/ControlledFormLabel';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import { Body } from 'web-components/lib/components/typography';

import { ProjectMetadataLD } from 'lib/db/types/json-ld';

import { ShaclGraphByUriQuery } from '../../../generated/graphql';
import { useProjectEditContext } from '../../../pages/ProjectEdit';
import { ProjectPageFooter } from '../../molecules';
import { useProjectMetadataFormSubmit } from './hooks/useProjectMetadataFormSubmit';
import { validationSchema } from './ProjectMetadataForm.utils';

interface ProjectMetadataFormProps {
  submit: (values: ProjectMetadataValues) => Promise<void>;
  initialValues?: Partial<ProjectMetadataLD>;
  graphData?: ShaclGraphByUriQuery;
  onNext?: () => void;
  onPrev?: () => void;
}

export interface ProjectMetadataValues {
  metadata: string;
}

export const ProjectMetadataForm = ({
  submit,
  initialValues,
  onNext,
  onPrev,
}: ProjectMetadataFormProps): JSX.Element => {
  const { confirmSave, isEdit } = useProjectEditContext();

  const onSubmit = useProjectMetadataFormSubmit({
    confirmSave,
    isEdit,
    submit,
  });

  return (
    <Formik
      enableReinitialize
      validateOnMount
      initialValues={{
        metadata: initialValues ? JSON.stringify(initialValues) : '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
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
