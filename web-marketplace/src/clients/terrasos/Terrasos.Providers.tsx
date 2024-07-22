import { SharedProviders } from 'clients/Clients.SharedProviders';

import { LedgerProvider } from 'ledger';
import { apolloClientFactory } from 'lib/clients/apolloClientFactory';
import { reactQueryClient } from 'lib/clients/reactQueryClient';

import terrasosMuiTheme from './Terrasos.muiTheme';
import { TerrasosRoutes } from './Terrasos.Routes';

import '../../App.css';
import './Terrasos.tailwind.css';

export const TerrasosProvider = () => {
  return (
    <SharedProviders customTheme={terrasosMuiTheme}>
      <LedgerProvider walletLoaded>
        <TerrasosRoutes
          reactQueryClient={reactQueryClient}
          apolloClientFactory={apolloClientFactory}
        />
      </LedgerProvider>
    </SharedProviders>
  );
};
