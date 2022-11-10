import { QueryClientImpl as EcocreditQueryClientImpl } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { connect } from 'ledger';

// Light ecocredit client without signer, to be used in route loaders
export const ecocreditClientAsync = connect().then(api =>
  api?.queryClient ? new EcocreditQueryClientImpl(api.queryClient) : undefined,
);
