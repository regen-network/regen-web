import { ReactNode } from 'react';
import { safeLazy } from 'utils/safeLazy';

import { reactQueryClient } from 'lib/clients/reactQueryClient';

import { CLIENT_CONFIG, MARKETPLACE_CLIENT_TYPE } from './Clients.types';

const RegenRoutes = safeLazy(() => import('./regen/Regen.Routes'));
const TerrasosRoutes = safeLazy(() => import('./terrasos/Terrasos.Routes'));

export const CLIENTS_MAPPING: Record<MARKETPLACE_CLIENT_TYPE, ReactNode> = {
  regen: <RegenRoutes reactQueryClient={reactQueryClient} />,
  terrasos: <TerrasosRoutes reactQueryClient={reactQueryClient} />,
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
    cwAdminFactoryAddress:
      'regen1hrpna9v7vs3stzyd4z3xf00676kf78zpe2u5ksvljswn2vnjp3ysp76v39',
  },
  terrasos: {
    buySellOrderFlow: false,
    buyButton: true,
    loginButton: false,
    listProject: false,
  },
};
