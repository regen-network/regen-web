import { Center } from 'web-components/lib/components/box';

import { MultiStepTemplate } from 'components/templates/MultiStepTemplate';

const baseValues = {
  admin: '',
  issuers: [],
  creditType: '',
  metadata: '',
  creationFee: '',
};
const steps = [
  {
    id: 'create-credit-class',
    name: 'Create Credit Class',
    title: 'Create Credit Class',
  },
  {
    id: 'review-credit-class',
    name: 'Review',
    title: 'Review',
  },
  {
    id: 'finished-credit-class',
    name: 'Finished',
    title: 'Finished',
  },
];

export const CreateCreditClass = (): JSX.Element => {
  return (
    <MultiStepTemplate
      formId="multistep-create-credit-class"
      initialValues={baseValues}
      steps={steps}
    >
      <Center>wowoow</Center>
    </MultiStepTemplate>
  );
};
