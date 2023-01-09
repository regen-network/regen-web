import { atomWithImmer } from 'jotai-immer';

import { ProcessingModalProps } from 'web-components/lib/components/modal/ProcessingModal';
import { TxErrorModalProps } from 'web-components/lib/components/modal/TxErrorModal';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { TxSuccessfulModalProps } from 'web-components/lib/components/modal/TxSuccessfulModal';

export const errorModalAtom = atomWithImmer({
  title: '',
  description: '',
  txHash: '',
  txError: '',
  cardTitle: '',
  cardItems: [] as Item[],
  buttonLink: '',
  buttonTitle: '',
} as Partial<TxErrorModalProps>);

export const txSuccessfulModalAtom = atomWithImmer({
  cardItems: [],
  title: '',
  cardTitle: '',
} as Partial<TxSuccessfulModalProps>);

export const processingModalAtom = atomWithImmer({
  open: false,
} as Partial<ProcessingModalProps>);
