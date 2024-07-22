import { MARKETPLACE_CLIENT } from 'lib/env';

import { CLIENTS_CONFIG_MAPPING } from './Clients.constants';
import { CLIENT_CONFIG } from './Clients.types';

export const getClientConfig = (): CLIENT_CONFIG => {
  return CLIENTS_CONFIG_MAPPING[MARKETPLACE_CLIENT];
};
