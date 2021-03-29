import * as React from 'react';
import { withKnobs, select, number } from '@storybook/addon-knobs';

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

// TODO: these populate the knobs, but dont' seem to work. Taken from the example in this git thread: https://github.com/storybookjs/storybook/issues/5616
const handlerDict = { none: null, func: () => null };
const makeHandler = (label: string): string => select(label, ['none', 'func'], 'func');
const onBack = makeHandler('onBack');
const onSkip = makeHandler('onSkip');

export const onboardingFooter = (): JSX.Element => (
  <OnboardingFooter
    onSave={submit}
    onBack={handlerDict[onBack]}
    onSkip={handlerDict[onSkip]}
    percentComplete={number('Percent Complete', 33, { min: 0, max: 100 })}
  />
);
