import { Center } from 'web-components/lib/components/box';
import { AdditionalityForm } from './AdditionalityForm';

export default {
  title: 'Registry/Organisms/Additionality Form',
  component: AdditionalityForm,
};

export const additionalityForm = (): JSX.Element => (
  <Center sx={{ m: '0 auto', maxWidth: 740 }}>
    <AdditionalityForm submit={async () => void null} />
  </Center>
);
