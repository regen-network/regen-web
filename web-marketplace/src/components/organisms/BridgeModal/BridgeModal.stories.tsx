import { BridgeModal } from './BridgeModal';

export const bridgeModal = (): JSX.Element => (
  <BridgeModal
    open={true}
    onClose={() => null}
    onSubmit={async values => alert(JSON.stringify(values))}
    batch={undefined}
  />
);

export default {
  title: 'Registry/Organisms/Bridge Modal',
  component: BridgeModal,
};
