import { MAPBOX_TOKEN } from 'config/globals';

import { CreditRetireModal } from './CreditRetireModal';

export const creditSendModal = (): JSX.Element => (
  <CreditRetireModal
    batchDenom={'C01-20190101-20201010-02'}
    availableTradableAmount={1000}
    mapboxToken={MAPBOX_TOKEN}
    open={true}
    onClose={() => null}
    onSubmit={async () => alert('submit')}
  />
);

export default {
  title: 'Registry/Organisms/Credit Retire Modal',
  component: CreditRetireModal,
};
