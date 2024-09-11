import { BridgeModal } from './BridgeModal';

export const bridgeModal = (): JSX.Element => (
  <BridgeModal
    maxLabel="Max"
    availableLabel="Available"
    open={true}
    onClose={() => null}
    onSubmit={async values => alert(JSON.stringify(values))}
    batch={undefined}
  />
);

export default {
  title: 'Marketplace/Organisms/Bridge Modal',
  component: BridgeModal,
};
