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
    retirementInfoText="Retirement is permanent and non-reversible."
  />
);

export default {
  title: 'Marketplace/Organisms/Credit Retire Modal',
  component: CreditRetireModal,
};
