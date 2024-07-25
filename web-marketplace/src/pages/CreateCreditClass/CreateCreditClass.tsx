import { useLingui } from '@lingui/react';

import { Box } from 'web-components/src/components/box';

import { useWallet } from 'lib/wallet/wallet';

import type { CreditClassValues } from 'components/organisms/CreditClassForms';
import {
  CreateCreditClassForm,
  creditClassBaseValues,
  getCreateCreditClassSteps,
} from 'components/organisms/CreditClassForms';
import { MultiStepTemplate } from 'components/templates/MultiStepTemplate';
import { useQueryIfCreditClassCreator } from 'hooks/useQueryIfCreditClassCreator';

export const CreateCreditClass = (): JSX.Element => {
  const { wallet } = useWallet();
  const { _ } = useLingui();
  const isCreditClassCreator = useQueryIfCreditClassCreator({});
  const createCreditClassSteps = getCreateCreditClassSteps(_);
  const formValues: CreditClassValues = {
    ...creditClassBaseValues,
    admin: wallet?.address || '',
    fee: '20 REGEN',
  };

  function handleSubmit(values: CreditClassValues): void {
    // eslint-disable-next-line
    console.log('handleSubmit', values);
  }

  if (!isCreditClassCreator) {
    return <></>;
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
