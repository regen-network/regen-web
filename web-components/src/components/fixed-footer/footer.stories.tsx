import * as React from 'react';

import FixedFooter from './';
import SaveFooter from './SaveFooter';
import { SwitchFooter } from './SwitchFooter';

export default {
  title: 'Footers',
  component: FixedFooter,
};

const submit = async (): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
};

export const fixedFooter = (): JSX.Element => (
  <FixedFooter>
    <div>Fixed footer content</div>
  </FixedFooter>
);

export const saveFooter = (): JSX.Element => (
  <SaveFooter
    onSave={submit}
    saveText={'Next'}
    saveExitText={'Save draft & exit'}
    onPrev={() => null}
    hideProgress={false}
    saveDisabled={false}
    percentComplete={33}
  />
);

const SwitchFooterDemo = (): JSX.Element => {
  const [activeOption, setActiveOption] = React.useState<
    'Buyer' | 'Land Steward'
  >('Buyer');

  const toggle = (): void => {
    if (activeOption === 'Buyer') {
      setActiveOption('Land Steward');
    } else {
      setActiveOption('Buyer');
    }
  };

  const onClick = (): void => {
    if (activeOption === 'Buyer') {
      alert('go to purchase page');
    } else {
      alert('go to intake form');
    }
  };

  return (
    <SwitchFooter
      activeOption={activeOption}
      buttonText={activeOption === 'Buyer' ? 'buy credits' : 'get started'}
      label="I am a:"
      leftOption="Land Steward"
      rightOption="Buyer"
      onCtaClick={onClick}
      onToggleClick={toggle}
    />
  );
};

export const switchFooter = (): JSX.Element => <SwitchFooterDemo />;
