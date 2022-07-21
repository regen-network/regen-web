import { Box } from 'web-components/lib/components/box';

import { MultiStepTemplate } from 'components/templates/MultiStepTemplate';
import { useWallet } from 'lib/wallet';
import {
  CreateCreditClassForm,
  createCreditClassSteps,
  creditClassBaseValues,
} from 'components/organisms/CreditClassForms';

import type { CreditClassValues } from 'components/organisms/CreditClassForms';

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
