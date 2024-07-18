import { SharedProviders } from 'clients/Clients.SharedProviders';

import { apolloClientFactory } from 'lib/clients/apolloClientFactory';
import { reactQueryClient } from 'lib/clients/reactQueryClient';

import { RegenRoutes } from './Regen.Routes';

import '../../../../tailwind.css';
import '../../App.css';

export const RegenProvider = () => {
  return (
    <SharedProviders>
      <RegenRoutes
        reactQueryClient={reactQueryClient}
        apolloClientFactory={apolloClientFactory}
      />
    </SharedProviders>
  );
};
