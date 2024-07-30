import { CreateSellOrderModal } from './CreateSellOrderModal';

export const createSellOrderModal = (): JSX.Element => (
  <CreateSellOrderModal
    batchDenoms={[
      {
        label: 'C01-20190101-20201010-003',
        value: 'C01-20190101-20201010-003',
      },
    ]}
    allowedDenoms={[{ label: 'REGEN', value: 'uregen' }]}
    title={'Create Sell Order'}
    availableAmountByBatch={{}}
    sellDenom={'REGEN'}
    open={true}
    onClose={() => null}
    onSubmit={async () => alert('submit')}
  />
);

export default {
  title: 'Marketplace/Organisms/CreateSellOrderModal',
  component: CreateSellOrderModal,
};
