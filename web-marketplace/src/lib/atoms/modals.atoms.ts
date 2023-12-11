import { atomWithImmer } from 'jotai-immer';

import { RegenModalProps } from 'web-components/lib/components/modal';
import { AddWalletModalConnectProps } from 'web-components/lib/components/modal/add-wallet-modal/AddWalletModalConnect';
import { AddWalletModalRemoveProps } from 'web-components/lib/components/modal/add-wallet-modal/AddWalletModalRemove';
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

export const connectWalletModalAtom = atomWithImmer({
  open: false,
} as Partial<RegenModalProps>);

export const switchWalletModalAtom = atomWithImmer({
  open: false,
} as Partial<RegenModalProps>);

export const addWalletModalSwitchAtom = atomWithImmer({
  open: false,
} as Partial<RegenModalProps>);

export const addWalletModalSwitchWarningAtom = atomWithImmer({
  open: false,
} as Partial<RegenModalProps>);

export const addWalletModalConnectAtom = atomWithImmer({
  open: false,
  partyInfo: {
    addr: '',
    name: '',
    profileImage: '',
  },
} as Partial<AddWalletModalConnectProps>);

export const addWalletModalRemoveAtom = atomWithImmer({
  open: false,
  partyInfo: {
    addr: '',
    name: '',
    profileImage: '',
  },
} as Partial<AddWalletModalRemoveProps>);
