import { SharedProviders } from 'clients/Clients.SharedProviders';
import { RegenRoutes } from 'clients/regen/Regen.Routes';

import { apolloClientFactory } from 'lib/clients/apolloClientFactory';
import { reactQueryClient } from 'lib/clients/reactQueryClient';

import terrasosMuiTheme from './Terrasos.muiTheme';

import '../../App.css';
import './Terrasos.tailwind.css';

export const TerrasosProvider = () => {
  return (
    <SharedProviders customTheme={terrasosMuiTheme}>
      <RegenRoutes
        reactQueryClient={reactQueryClient}
        apolloClientFactory={apolloClientFactory}
      />
    </SharedProviders>
  );
};
