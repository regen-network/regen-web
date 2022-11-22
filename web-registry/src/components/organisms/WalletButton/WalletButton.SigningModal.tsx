import { Center } from 'web-components/lib/components/box';
import RegenModal from 'web-components/lib/components/modal';
import { Title } from 'web-components/lib/components/typography';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSigningModal = ({ isOpen, onClose }: Props): JSX.Element => (
  <RegenModal open={isOpen} onClose={onClose}>
    <Center sx={{ textAlign: 'center' }}>
      <Title variant="h4">
        {'Sign the transaction with Keplr Mobile Wallet'}
      </Title>
    </Center>
  </RegenModal>
);
