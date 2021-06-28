import * as React from 'react';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';

import FixedFooter from 'web-components/lib/components/fixed-footer';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import { SwitchFooter } from 'web-components/lib/components/fixed-footer/SwitchFooter';

export default {
  title: 'Components|Footers',
  component: FixedFooter,
  decorators: [withKnobs],
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

export const onboardingFooter = (): JSX.Element => (
  <OnboardingFooter
    onSave={submit}
    saveText={text('Save text', 'Save and Next')}
    onPrev={boolean('Prev', true) ? () => null : null}
    onNext={boolean('Next', true) ? () => null : null}
    hideProgress={boolean('hideProgress', false)}
    saveDisabled={boolean('Disable save', false)}
    percentComplete={number('Percent Complete', 33, { min: 0, max: 100 })}
  />
);

const SwitchFooterDemo = (): JSX.Element => {
  const [activeOption, setActiveOption] = React.useState<'Buyer' | 'Land Steward'>('Buyer');

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
      buttonText={activeOption === 'Buyer' ? 'buy credits' : 'fill in intake form'}
      label="I am a:"
      leftOption="Land Steward"
      rightOption="Buyer"
      onCtaClick={onClick}
      onToggleClick={toggle}
    />
  );
};

export const switchFooter = (): JSX.Element => <SwitchFooterDemo />;
