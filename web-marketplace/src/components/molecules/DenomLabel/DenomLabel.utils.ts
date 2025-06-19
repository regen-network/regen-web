import { AllowedDenom } from '@regen-network/api/regen/ecocredit/marketplace/v1/state';
import { UPPERCASE_DENOM } from 'config/allowedBaseDenoms';

export type AllowedDenoms = Array<
  Pick<AllowedDenom, 'bankDenom' | 'displayDenom'>
>;
type Params = {
  bankDenom: string;
  baseDenom?: string;
  allowedDenoms?: AllowedDenoms;
};

export const findDisplayDenom = ({
  allowedDenoms,
  bankDenom,
  baseDenom,
}: Params): string => {
  console.log('bankDenom', bankDenom);
  console.log('baseDenom', baseDenom);
  const allowedDenom = allowedDenoms?.find(
    allowedDenom => allowedDenom.bankDenom === bankDenom,
  );
  const displayDenom = allowedDenom?.displayDenom ?? baseDenom;
  const result =
    displayDenom && UPPERCASE_DENOM.includes(baseDenom ?? bankDenom)
      ? displayDenom.toUpperCase()
      : displayDenom;

  return result ?? bankDenom;
};
