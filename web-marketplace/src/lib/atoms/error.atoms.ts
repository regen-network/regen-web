import { atom } from 'jotai';

export type FailedFnType = (csrfToken: string) => Promise<Response>;

export const errorCodeAtom = atom('');
export const errorBannerTextAtom = atom('');
export const failedFunctionsAtom = atom<FailedFnType[]>([]);
export const failedFunctionsWriteAtom = atom(
  null,
  (get, set, failedFn: FailedFnType) => {
    set(failedFunctionsAtom, prev => [...prev, failedFn]);
  },
);
