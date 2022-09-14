import {
  DeepPartial,
  QueryAllowedDenomsRequest,
  QueryAllowedDenomsResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';

import { MarketplaceQueryClientProps } from './marketplace.types';

// AllowedDenoms

interface QueryAllowedDenomsProps extends MarketplaceQueryClientProps {
  request: DeepPartial<QueryAllowedDenomsRequest>;
}

export const queryAllowedDenoms = async ({
  client,
  request,
}: QueryAllowedDenomsProps): Promise<QueryAllowedDenomsResponse> => {
  try {
    return await client.AllowedDenoms(request);
  } catch (err) {
    throw new Error(
      `Error in the AllowedDenoms query of the ledger ecocredit/marketplace module: ${err}`,
    );
  }
};
