import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';

import { useGlobalStore } from 'lib/context/globalContext';

export const RegistryLayoutProcessingModal = (): JSX.Element => {
  const [{ open }, setGlobalStore] = useGlobalStore(store => {
    return store.processingModal;
  });

  const onClose = (): void =>
    setGlobalStore({ processingModal: { open: false } });

  return <ProcessingModal open={!!open} onClose={onClose} />;
};
