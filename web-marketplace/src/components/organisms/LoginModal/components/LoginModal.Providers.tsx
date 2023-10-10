import { Grid } from '@mui/material';

import { LoginProvider } from '../LoginModal.types';
import { LoginModalButton } from './LoginModal.Button';

export interface Props {
  providers: LoginProvider[];
}

const LoginModalProviders = ({ providers }: Props) => (
  <Grid container columnSpacing={5} pb={7.5}>
    {providers.map(provider => (
      <Grid item xs={12 / providers.length} key={provider.name}>
        <LoginModalButton provider={provider} />
      </Grid>
    ))}
  </Grid>
);

export { LoginModalProviders };
