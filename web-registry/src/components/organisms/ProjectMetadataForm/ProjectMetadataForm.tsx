import { Field, Form, Formik } from 'formik';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import ControlledFormLabel from 'web-components/lib/components/form/ControlledFormLabel';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import { Body } from 'web-components/lib/components/typography';

import { ProjectMetadataLD } from 'lib/db/types/json-ld';

import { ShaclGraphByUriQuery } from '../../../generated/graphql';
import { useProjectEditContext } from '../../../pages/ProjectEdit';
import { ProjectPageFooter } from '../../molecules';
import { useStyles } from './ProjectMetadataForm.styles';
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
  const { classes: styles } = useStyles();

  return (
    <Formik
      enableReinitialize
      validateOnMount
      initialValues={{
        metadata: initialValues ? JSON.stringify(initialValues, null, 2) : '',
      }}
      validationSchema={validationSchema}
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
