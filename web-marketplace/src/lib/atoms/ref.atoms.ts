import { atom } from 'jotai';

export const isProfileEditDirtyRef = atom<
  undefined | React.MutableRefObject<boolean>
>(undefined);
