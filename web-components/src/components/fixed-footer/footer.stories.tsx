import * as React from 'react';
import { withKnobs, select, number, boolean } from '@storybook/addon-knobs';

import FixedFooter from 'web-components/lib/components/fixed-footer';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';

export default {
  title: 'Components|Footers',
  component: FixedFooter,
  decorators: [withKnobs],
};

const submit = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
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
    onBack={boolean('Back', true) ? () => null : null}
    onSkip={boolean('Skip', true) ? () => null : null}
    percentComplete={number('Percent Complete', 33, { min: 0, max: 100 })}
  />
);
