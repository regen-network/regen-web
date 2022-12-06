import { QueryAllowedDenomsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { CAPITALIZED_DENOM } from 'config/allowedBaseDenoms';
import { capitalizeWord } from 'utils/string/capitalizeWord';

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
    displayDenom && CAPITALIZED_DENOM.includes(denom)
      ? capitalizeWord(displayDenom)
      : displayDenom;

  return result ?? denom;
};
