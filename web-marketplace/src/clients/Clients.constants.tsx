import { ReactNode } from 'react';
import { safeLazy } from 'utils/safeLazy';

import { CLIENT_CONFIG, MARKETPLACE_CLIENT_TYPE } from './Clients.types';

const RegenProvider = safeLazy(() => import('./regen/Regen.Providers'));
const TerrasosProvider = safeLazy(
  () => import('./terrasos/Terrasos.Providers'),
);

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
    buyButton: true,
    loginButton: false,
    listProject: false,
  },
};
