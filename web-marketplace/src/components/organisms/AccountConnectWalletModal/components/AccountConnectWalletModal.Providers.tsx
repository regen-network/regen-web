import { Grid } from '@mui/material';

import { LoginProvider } from '../AccountConnectWalletModal.types';
import { LoginModalButton } from './AccountConnectWalletModal.Button';

export interface Props {
  providers: LoginProvider[];
}

const LoginModalProviders = ({ providers }: Props) => (
  <Grid container columnSpacing={5}>
    {providers.map(provider => (
      <Grid item xs={12 / providers.length} key={provider.name}>
        <LoginModalButton provider={provider} />
      </Grid>
    ))}
  </Grid>
);

export { LoginModalProviders };
