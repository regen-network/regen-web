import { MARKETPLACE_CLIENT } from 'lib/env';

import { CLIENTS_MAPPING } from './Clients.constants';

export const ClientProvider = () => {
  return CLIENTS_MAPPING[MARKETPLACE_CLIENT];
};
