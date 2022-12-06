import { errorsMapping, findErrorByCodeEnum } from 'config/errors';
import mergeWith from 'lodash/mergeWith';

import { TxErrorModal } from 'web-components/lib/components/modal/TxErrorModal';

import { getHashUrl } from 'lib/block-explorer';
import { useGlobalStore } from 'lib/context/globalContext';

import { Link } from 'components/atoms';

import { TX_ERROR_MODAL_BUTTON } from './RegistryLayout.constants';

export const RegistryLayoutTxErrorModal = (): JSX.Element => {
  const [errorCode, setGlobalStore] = useGlobalStore(
    store => store['errorCode'],
  );
  const [errorModal] = useGlobalStore(store => store['errorModal']);
  const errorEnum = findErrorByCodeEnum({ errorCode });
  const error = errorsMapping[errorEnum];
  const ErrorIcon = error.icon;
  const onClose = (): void =>
    setGlobalStore({
      errorCode: '',
      errorModal: {
        title: '',
        description: '',
        cardTitle: '',
        cardItems: [],
        txError: '',
        txHash: '',
        buttonTitle: '',
        buttonLink: '',
      },
    });

  const {
    buttonLink,
    buttonTitle,
    cardItems,
    cardTitle,
    description,
    title,
    txError,
    txHash,
  } = mergeWith(errorModal, error, (errorModalValue, errorValue, key) => {
    if (errorModalValue === '') return errorValue;
  });
  const txHashUrl = getHashUrl(txHash);

  return (
    <>
      <TxErrorModal
        error={txError}
        open={!!errorCode}
        onClose={onClose}
        txHash={txHash ?? ''}
        txHashUrl={txHashUrl}
        title={title}
        description={description}
        cardTitle={cardTitle}
        linkComponent={Link}
        onButtonClick={onClose}
        buttonTitle={buttonTitle ?? TX_ERROR_MODAL_BUTTON}
        buttonLink={buttonLink}
        cardItems={cardItems}
        icon={<ErrorIcon sx={{ fontSize: 100, color: 'grey.600' }} />}
      />
    </>
  );
};
