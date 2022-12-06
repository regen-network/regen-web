import { errorsMapping, findErrorByCodeEnum } from 'config/errors';

import { TxErrorModal } from 'web-components/lib/components/modal/TxErrorModal';

import { getHashUrl } from 'lib/block-explorer';
import { useGlobalStore } from 'lib/context/globalContext';

import { Link } from 'components/atoms';

import { TX_ERROR_MODAL_BUTTON } from './RegistryLayout.constants';

export const RegistryLayoutTxErrorModal = (): JSX.Element => {
  const [
    {
      cardTitle,
      cardItems,
      errorCode,
      txError,
      txHash,
      buttonTitle,
      buttonLink,
    },
    setGlobalStore,
  ] = useGlobalStore(store => store['error']);

  const errorEnum = findErrorByCodeEnum({ errorCode });
  const error = errorsMapping[errorEnum];
  const ErrorIcon = error.icon;
  const txHashUrl = getHashUrl(txHash);
  const onClose = (): void =>
    setGlobalStore({
      error: {
        cardTitle: '',
        cardItems: [],
        errorCode: '',
        txError: '',
        txHash: '',
        buttonTitle: '',
        buttonLink: '',
      },
    });

  return (
    <>
      <TxErrorModal
        error={txError}
        open={!!errorCode}
        onClose={onClose}
        txHash={txHash ?? ''}
        txHashUrl={txHashUrl}
        title={error.label}
        description={error.description}
        cardTitle={cardTitle}
        linkComponent={Link}
        onButtonClick={onClose}
        buttonTitle={!!buttonTitle ? buttonTitle : TX_ERROR_MODAL_BUTTON}
        buttonLink={buttonLink}
        cardItems={cardItems}
        icon={<ErrorIcon sx={{ fontSize: 100, color: 'grey.600' }} />}
      />
    </>
  );
};
