import { MAPBOX_TOKEN } from 'config/globals';

import { CreditSendForm } from './CreditSendForm';

export const creditSendForm = (): JSX.Element => (
  <CreditSendForm
    sender={'regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4'} // test account
    availableTradableAmount={1000}
    batchDenom={'C01-20190101-20201010-02'}
    mapboxToken={MAPBOX_TOKEN}
    onClose={() => null}
    onSubmit={async () => alert('submit')}
  />
);

export default {
  title: 'Marketplace/Organisms/Credit Send Form',
  component: CreditSendForm,
};
