import { MARKETPLACE_CLIENT } from 'lib/env';

import { PROVIDERS_MAPPING } from './Clients.constants';

export const ClientProvider = () => {
  return PROVIDERS_MAPPING[MARKETPLACE_CLIENT] ?? PROVIDERS_MAPPING.regen;
};
