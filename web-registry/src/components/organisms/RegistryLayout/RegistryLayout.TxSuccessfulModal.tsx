import { TxSuccessfulModal } from 'web-components/lib/components/modal/TxSuccessfulModal';

import { getHashUrl } from 'lib/block-explorer';
import { useGlobalStore } from 'lib/context/globalContext';

import { Link } from 'components/atoms';

export const RegistryLayoutTxSuccessfulModal = (): JSX.Element => {
  const [
    { cardItems, title, cardTitle, open, txHash, buttonTitle },
    setGlobalStore,
  ] = useGlobalStore(store => store.txSuccessfulModal);
  const onClose = (): void =>
    setGlobalStore({ txSuccessfulModal: { open: false } });

  const txHashUrl = getHashUrl(txHash);

  return (
    <TxSuccessfulModal
      open={!!open}
      cardItems={cardItems}
      title={title}
      cardTitle={cardTitle ?? ''}
      buttonTitle={buttonTitle}
      onClose={onClose}
      txHash={txHash ?? ''}
      txHashUrl={txHashUrl}
      linkComponent={Link}
      onButtonClick={onClose}
    />
  );
};
