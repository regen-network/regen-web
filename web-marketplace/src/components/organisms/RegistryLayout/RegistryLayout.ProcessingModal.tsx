import { useAtom } from 'jotai';

import { ProcessingModal } from 'web-components/src/components/modal/ProcessingModal';

import { processingModalAtom } from 'lib/atoms/modals.atoms';

export const RegistryLayoutProcessingModal = (): JSX.Element => {
  const [{ open }, setProcessingModalAtom] = useAtom(processingModalAtom);

  const onClose = (): void =>
    setProcessingModalAtom(atom => void (atom.open = false));

  return <ProcessingModal open={!!open} onClose={onClose} />;
};
