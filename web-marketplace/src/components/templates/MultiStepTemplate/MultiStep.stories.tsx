/* eslint-disable lingui/no-unlocalized-strings */
import { Center } from 'web-components/src/components/box';
import SaveFooter from 'web-components/src/components/fixed-footer/SaveFooter';

import { useMultiStep } from './MultiStep.context';
import { MultiStepTemplate } from './MultiStepTemplate';

export default {
  title: 'Marketplace/Templates/Multi Step Template',
  component: MultiStepTemplate,
};

const formId = 'multistep-story';
const initialValues = {
  test: '',
  template: '',
};
const steps = [
  {
    id: 'Multi',
    name: 'Multi',
    title: 'Multi',
  },
  {
    id: 'Step',
    name: 'Step',
    title: 'Step',
  },
  {
    id: 'Template',
    name: 'Template',
    title: 'Template',
  },
];

const MultiStepContent = (): JSX.Element => {
  const { handleBack, activeStep, percentComplete } = useMultiStep();
  return (
    <Center>
      Content for multi step
      <SaveFooter
        onPrev={activeStep > 0 ? handleBack : undefined}
        onSave={() => null}
        saveDisabled={false}
        percentComplete={percentComplete}
        saveExitText="Save and exit"
        saveText="Save"
      />
    </Center>
  );
};

export const multiStepTemplate = () => (
  <MultiStepTemplate
    formId={formId}
    initialValues={initialValues}
    steps={steps}
  >
    <MultiStepContent />
  </MultiStepTemplate>
);
