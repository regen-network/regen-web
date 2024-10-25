import { REGEN_DENOM } from 'config/allowedBaseDenoms';
import { atom } from 'jotai';

export const paymentOptionCryptoClickedAtom = atom(false);
export const buyFromProjectIdAtom = atom('');
export const buyCreditsCryptoCurrencyAtom = atom({
  askDenom: REGEN_DENOM,
  askBaseDenom: REGEN_DENOM,
});
