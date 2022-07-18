import { MultiStepTemplate } from 'components/templates/MultiStepTemplate';
import { Formik } from 'formik';
import { Center } from 'web-components/lib/components/box';
import {
  CreateCreditClassForm,
  createCreditClassSteps,
} from './CreateCreditClassForm';
import { CreditClassForm, creditClassBaseValues } from './CreditClassForm';

export default {
  title: 'Registry/Organisms/Credit Class Form',
  component: CreditClassForm,
};

export const creditClassForm = (): JSX.Element => (
  <Center sx={{ m: '0 auto', maxWidth: 740 }}>
    <Formik initialValues={creditClassBaseValues} onSubmit={() => void null}>
      <CreditClassForm />
    </Formik>
  </Center>
);

export const createCreditClassForm = (): JSX.Element => (
  <MultiStepTemplate
    formId="create-credit-class-story"
    initialValues={{
      ...creditClassBaseValues,
      admin: 'adminAddress',
      fee: '20 REGEN',
    }}
    steps={createCreditClassSteps}
  >
    <CreateCreditClassForm onSubmit={console.log} />
  </MultiStepTemplate>
);
