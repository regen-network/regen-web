import { Box } from 'web-components/lib/components/box';
<<<<<<< HEAD

import { useWallet } from 'lib/wallet';

import type { CreditClassValues } from 'components/organisms/CreditClassForms';
=======

import { MultiStepTemplate } from 'components/templates/MultiStepTemplate';
import { useWallet } from 'lib/wallet';
>>>>>>> v4
import {
  CreateCreditClassForm,
  createCreditClassSteps,
  creditClassBaseValues,
} from 'components/organisms/CreditClassForms';
<<<<<<< HEAD
import { MultiStepTemplate } from 'components/templates/MultiStepTemplate';
=======

import type { CreditClassValues } from 'components/organisms/CreditClassForms';
>>>>>>> v4

export const CreateCreditClass = (): JSX.Element => {
  const { wallet } = useWallet();
  const formValues: CreditClassValues = {
    ...creditClassBaseValues,
    admin: wallet?.address || '',
    fee: '20 REGEN',
  };

  function handleSubmit(values: CreditClassValues): void {
    // eslint-disable-next-line
    console.log('handleSubmit', values);
  }

  return (
    <Box sx={{ bgcolor: 'grey.50' }}>
      <MultiStepTemplate
        formId="multistep-create-credit-class"
        initialValues={formValues}
        steps={createCreditClassSteps}
      >
        <CreateCreditClassForm onSubmit={handleSubmit} />
      </MultiStepTemplate>
    </Box>
  );
};
