import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';

import { TxSuccessfulModal } from 'web-components/src/components/modal/TxSuccessfulModal';

import { txSuccessfulModalAtom } from 'lib/atoms/modals.atoms';
import { getHashUrl } from 'lib/block-explorer';

import { Link } from 'components/atoms';

export const RegistryLayoutTxSuccessfulModal = (): JSX.Element => {
  const location = useLocation();

  const [
    { cardItems, title, cardTitle, open, txHash, buttonTitle, buttonLink },
    setTxSuccessfulModalAtom,
  ] = useAtom(txSuccessfulModalAtom);
  const onClose = useCallback(
    (): void => setTxSuccessfulModalAtom(atom => void (atom.open = false)),
    [setTxSuccessfulModalAtom],
  );

  const txHashUrl = getHashUrl(txHash);

  useEffect(() => {
    onClose();
  }, [location, onClose]);

  return (
    <TxSuccessfulModal
      open={!!open}
      cardItems={cardItems}
      title={title}
      cardTitle={cardTitle ?? ''}
      buttonTitle={buttonTitle}
      buttonLink={buttonLink}
      onClose={onClose}
      txHash={txHash ?? ''}
      txHashUrl={txHashUrl}
      linkComponent={Link}
      onButtonClick={onClose}
    />
  );
};
