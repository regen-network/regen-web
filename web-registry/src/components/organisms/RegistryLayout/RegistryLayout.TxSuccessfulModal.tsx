import { useAtom } from 'jotai';

import { TxSuccessfulModal } from 'web-components/lib/components/modal/TxSuccessfulModal';

import { getHashUrl } from 'lib/block-explorer';
import { txSuccessfulModalAtom } from 'lib/store/modals.store';

import { Link } from 'components/atoms';

export const RegistryLayoutTxSuccessfulModal = (): JSX.Element => {
  const [
    { cardItems, title, cardTitle, open, txHash, buttonTitle },
    setTxSuccessfulModalAtom,
  ] = useAtom(txSuccessfulModalAtom);
  const onClose = (): void =>
    setTxSuccessfulModalAtom(atom => void (atom.open = false));

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
