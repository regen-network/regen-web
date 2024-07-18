import { SharedProviders } from 'clients/Clients.SharedProviders';

import { AuthProvider } from 'lib/auth/auth';
import { apolloClientFactory } from 'lib/clients/apolloClientFactory';
import { reactQueryClient } from 'lib/clients/reactQueryClient';

import { RegenRoutes } from './Regen.Routes';

import '../../../../tailwind.css';
import '../../App.css';

export const RegenProvider = () => {
  return (
    <SharedProviders>
      <AuthProvider>
        <RegenRoutes
          reactQueryClient={reactQueryClient}
          apolloClientFactory={apolloClientFactory}
        />
      </AuthProvider>
    </SharedProviders>
  );
};
