import { atomWithImmer } from 'jotai-immer';

export const basketDetailAtom = atomWithImmer({
  isPutModalOpen: false,
  isTakeModalOpen: false,
  creditBatchDenom: '',
});
