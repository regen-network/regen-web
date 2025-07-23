import { ReactNode } from 'react';
import { safeLazy } from 'utils/safeLazy';

import { CLIENT_CONFIG, MARKETPLACE_CLIENT_TYPE } from './Clients.types';

const RegenRoutes = safeLazy(() => import('./regen/Regen.Routes'));
const TerrasosRoutes = safeLazy(() => import('./terrasos/Terrasos.Routes'));

export const CLIENTS_MAPPING: Record<MARKETPLACE_CLIENT_TYPE, ReactNode> = {
  regen: <RegenRoutes />,
  terrasos: <TerrasosRoutes />,
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
