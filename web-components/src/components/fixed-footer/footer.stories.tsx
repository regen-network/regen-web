import * as React from 'react';

import FixedFooter from './';
import SaveFooter from './SaveFooter';

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
