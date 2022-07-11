import { Center } from 'web-components/lib/components/box';
import { CreditClassForm } from './CreditClassForm';

export default {
  title: 'Registry/Organisms/Credit Class Form',
  component: CreditClassForm,
};

export const creditClassForm = (): JSX.Element => (
  <Center sx={{ m: '0 auto', maxWidth: 740 }}>
    <CreditClassForm />
  </Center>
);
