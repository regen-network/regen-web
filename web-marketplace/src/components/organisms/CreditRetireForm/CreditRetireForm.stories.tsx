import { MAPBOX_TOKEN } from 'config/globals';

import { CreditRetireForm } from './CreditRetireForm';

export const creditRetireForm = (): JSX.Element => (
  <CreditRetireForm
    availableTradableAmount={1000}
    batchDenom={'C01-20190101-20201010-02'}
    mapboxToken={MAPBOX_TOKEN}
    onClose={() => null}
    onSubmit={async () => alert('submit')}
  />
);

export default {
  title: 'Marketplace/Organisms/Credit Send Form',
  component: CreditRetireForm,
};
