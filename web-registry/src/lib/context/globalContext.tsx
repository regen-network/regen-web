import { Item } from 'web-components/lib/components/modal/TxModal';

import createFastContext from './createFastContext/createFastContext';

export const { Provider: GlobalProvider, useStore: useGlobalStore } =
  createFastContext({
    isWaitingForSigning: false,
    error: {
      errorCode: '',
      txHash: '',
      txError: '',
      cardTitle: '',
      cardItems: [] as Item[],
      buttonLink: '',
      buttonTitle: '',
    },
  });
