import { QueryAllowedDenomsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { UPPERCASE_DENOM } from 'config/allowedBaseDenoms';

type Params = {
  bankDenom: string;
  baseDenom?: string;
  allowedDenomsData?: QueryAllowedDenomsResponse;
};

export const findDisplayDenom = ({
  allowedDenomsData,
  bankDenom,
  baseDenom,
}: Params): string => {
  const allowedDenom = allowedDenomsData?.allowedDenoms?.find(
    allowedDenom => allowedDenom.bankDenom === bankDenom,
  );
  const displayDenom = allowedDenom?.displayDenom ?? baseDenom;
  const result =
    displayDenom && UPPERCASE_DENOM.includes(baseDenom ?? bankDenom)
      ? displayDenom.toUpperCase()
      : displayDenom;

  return result ?? bankDenom;
};
