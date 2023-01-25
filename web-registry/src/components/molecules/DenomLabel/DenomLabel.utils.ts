import { QueryAllowedDenomsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { UPPERCASE_DENOM } from 'config/allowedBaseDenoms';

type Params = {
  denom: string;
  allowedDenomsData?: QueryAllowedDenomsResponse;
};

export const findDisplayDenom = ({
  allowedDenomsData,
  denom,
}: Params): string => {
  const allowedDenom = allowedDenomsData?.allowedDenoms?.find(
    allowedDenom => allowedDenom.bankDenom === denom,
  );
  const displayDenom = allowedDenom?.displayDenom;
  const result =
    displayDenom && UPPERCASE_DENOM.includes(denom)
      ? displayDenom.toUpperCase()
      : displayDenom;

  return result ?? denom;
};
