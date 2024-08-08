import { Formik } from 'formik';

import { Center } from 'web-components/src/components/box';

import { MultiStepTemplate } from 'components/templates/MultiStepTemplate';

import {
  CreateCreditClassForm,
  createCreditClassSteps,
} from './CreateCreditClassForm';
import { mockMetadata, mockTxHash } from './CreditClass.mocks';
import { CreditClassFinished } from './CreditClassFinished';
import {
  creditClassBaseValues,
  CreditClassForm,
  CreditClassValues,
} from './CreditClassForm';
import { CreditClassReview } from './CreditClassReview';

const fullFormValues: CreditClassValues = {
  admin: mockTxHash,
  issuers: [mockTxHash, mockTxHash, mockTxHash],
  creditTypeAbbr: 'REGEN',
  fee: '20 REGEN',
  metadata: JSON.stringify(mockMetadata, null, 2),
};

const onSubmit = () => void null;

export const creditClassForm = (): JSX.Element => (
  <Center sx={{ m: '0 auto', maxWidth: 740 }}>
    <Formik initialValues={creditClassBaseValues} onSubmit={onSubmit}>
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
    {/* eslint-disable-next-line no-console */}
    <CreateCreditClassForm onSubmit={console.log} />
  </MultiStepTemplate>
);

export const creditClassReview = (): JSX.Element => (
  <Formik initialValues={fullFormValues} onSubmit={onSubmit}>
    <CreditClassReview />
  </Formik>
);

export const creditClassFinished = (): JSX.Element => (
  <CreditClassFinished classId="C01" hash={mockTxHash} />
);

export default {
  title: 'Marketplace/Organisms/Credit Class Form',
  component: CreditClassForm,
};
