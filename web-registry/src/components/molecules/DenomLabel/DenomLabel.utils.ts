import { QueryAllowedDenomsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';

type Params = {
  denom: string;
  allowedDenomsData?: QueryAllowedDenomsResponse;
};

export const findDisplayDenom = ({
  allowedDenomsData,
  denom,
}: Params): string => {
  const displayDenom = allowedDenomsData?.allowedDenoms?.find(
    allowedDenom => allowedDenom.bankDenom === denom,
  );

  return displayDenom?.displayDenom ?? denom;
};
