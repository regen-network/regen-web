import { ReactNode } from 'react';

import { CLIENT_CONFIG, MARKETPLACE_CLIENT_TYPE } from './Clients.types';
import { RegenProvider } from './regen/Regen.Providers';
import { TerrasosProvider } from './terrasos/Terrasos.Providers';

export const PROVIDERS_MAPPING: Record<MARKETPLACE_CLIENT_TYPE, ReactNode> = {
  regen: <RegenProvider />,
  terrasos: <TerrasosProvider />,
};

export const CLIENTS_CONFIG_MAPPING: Record<
  MARKETPLACE_CLIENT_TYPE,
  CLIENT_CONFIG
> = {
  regen: {
    buySellOrderFlow: true,
    buyButton: true,
    loginButton: true,
    listProject: true,
  },
  terrasos: {
    buySellOrderFlow: false,
    buyButton: false,
    loginButton: false,
    listProject: false,
  },
};
