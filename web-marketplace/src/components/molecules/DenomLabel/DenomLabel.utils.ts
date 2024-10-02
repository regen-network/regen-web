import { QueryAllowedDenomsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { AllowedDenom } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/state';
import { UPPERCASE_DENOM } from 'config/allowedBaseDenoms';

export type AllowedDenoms = Array<
  Pick<AllowedDenom, 'bankDenom' | 'displayDenom'>
>;
type Params = {
  bankDenom: string;
  baseDenom?: string;
  allowedDenoms?: AllowedDenoms | QueryAllowedDenomsResponse;
};

export const findDisplayDenom = ({
  allowedDenoms,
  bankDenom,
  baseDenom,
}: Params): string => {
  const denoms =
    (allowedDenoms as QueryAllowedDenomsResponse)?.allowedDenoms ??
    allowedDenoms;
  const allowedDenom = denoms?.find(
    allowedDenom => allowedDenom.bankDenom === bankDenom,
  );
  const displayDenom = allowedDenom?.displayDenom ?? baseDenom;
  const result =
    displayDenom && UPPERCASE_DENOM.includes(baseDenom ?? bankDenom)
      ? displayDenom.toUpperCase()
      : displayDenom;

  return result ?? bankDenom;
};
