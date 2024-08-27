import { MAPBOX_TOKEN } from 'config/globals';

import { CreditSendModal } from './CreditSendModal';

export const creditSendModal = (): JSX.Element => (
  <CreditSendModal
    title="Send"
    sender={'regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4'}
    batchDenom={'C01-20190101-20201010-02'}
    availableTradableAmount={1000}
    mapboxToken={MAPBOX_TOKEN}
    open={true}
    onClose={() => null}
    onSubmit={async () => alert('submit')}
  />
);

export default {
  title: 'Marketplace/Organisms/Credit Send Modal',
  component: CreditSendModal,
};
