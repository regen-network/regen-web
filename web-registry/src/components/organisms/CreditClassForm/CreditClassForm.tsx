import { Field, Form, Formik } from 'formik';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import ControlledFormLabel from 'web-components/lib/components/form/ControlledFormLabel';
import { Body } from 'web-components/lib/components/typography';

// import { ShaclGraphByUriQuery } from 'generated/graphql';
// import { ProjectMetadataLD } from 'generated/json-ld';
// import { useProjectEditContext } from 'pages/ProjectEdit';
import { ProjectPageFooter } from 'components/molecules';

export interface ProjectMetadataValues {
  metadata: string;
}

// interface CreditClassFormProps {
//   submit: (values: CreditClassValues) => Promise<void>;
//   initialValues?: Partial<CreditClassValues>;
// }

// interface CreditClassValues {
//   admin: string;
// }

export function CreditClassForm(): JSX.Element {
  // const { confirmSave, isEdit } = useProjectEditContext();

  // const onSubmit = useProjectMetadataFormSubmit({
  //   confirmSave,
  //   isEdit,
  //   submit,
  // });
  // const handleSubmit =

  return (
    <Formik
      enableReinitialize
      validateOnMount
      initialValues={{ test: 'any' }}
      // validationSchema={validationSchema}
      onSubmit={() => void null}
    >
      {({ submitForm, isValid, isSubmitting, touched }) => {
        return (
          <Form translate="yes">
            <OnBoardingCard>
              <ControlledFormLabel>{'Project metadata'}</ControlledFormLabel>
              <Body size="sm" mt={1} mb={3} sx={{ textAlign: 'left' }}>
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
              saveDisabled={
                !isValid || isSubmitting || !Object.keys(touched).length
              }
            />
          </Form>
        );
      }}
    </Formik>
  );
}
