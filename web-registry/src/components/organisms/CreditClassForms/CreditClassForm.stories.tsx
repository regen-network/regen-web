import { Formik } from 'formik';
<<<<<<< HEAD

import { Center } from 'web-components/lib/components/box';

import { MultiStepTemplate } from 'components/templates/MultiStepTemplate';

=======
import { Center } from 'web-components/lib/components/box';

import { MultiStepTemplate } from 'components/templates/MultiStepTemplate';
>>>>>>> v4
import {
  CreateCreditClassForm,
  createCreditClassSteps,
} from './CreateCreditClassForm';
<<<<<<< HEAD
import { mockMetadata, mockTxHash } from './CreditClass.mocks';
import { CreditClassFinished } from './CreditClassFinished';
import {
  creditClassBaseValues,
  CreditClassForm,
  CreditClassValues,
} from './CreditClassForm';
import { CreditClassReview } from './CreditClassReview';
=======
import { CreditClassFinished } from './CreditClassFinished';
import {
  CreditClassForm,
  creditClassBaseValues,
  CreditClassValues,
} from './CreditClassForm';
import { CreditClassReview } from './CreditClassReview';
import { mockMetadata, mockTxHash } from './CreditClass.mocks';
>>>>>>> v4

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
<<<<<<< HEAD
    {/* eslint-disable-next-line no-console */}
=======
>>>>>>> v4
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
  title: 'Registry/Organisms/Credit Class Form',
  component: CreditClassForm,
};
