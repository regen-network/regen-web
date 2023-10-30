import { Box } from '@mui/system';

import Modal, { RegenModalProps } from 'web-components/src/components/modal';

import { LoginModalMobile } from './components/LoginModal.Mobile';
import { LoginModalSelect } from './components/LoginModal.Select';
import { EmailFormSchemaType } from './LoginModal.schema';
import { LoginModalState, LoginProvider } from './LoginModal.types';

export interface Props extends RegenModalProps {
  state?: LoginModalState;
  wallets: LoginProvider[];
  socialProviders: LoginProvider[];
  qrCodeUri?: string;
  connecting: boolean;
  onEmailSubmit: (values: EmailFormSchemaType) => Promise<void>;
}

const LoginModal = ({
  open,
  onClose,
  state = 'select',
  wallets,
  socialProviders,
  qrCodeUri,
  connecting,
  onEmailSubmit,
}: Props): JSX.Element => {
  const isSelectState = state === 'select';
  const isMobileState = state === 'wallet-mobile';
  return (
    <Modal open={open} onClose={onClose}>
      <Box>
        {isSelectState && (
          <LoginModalSelect
            wallets={wallets}
            socialProviders={socialProviders}
            onEmailSubmit={onEmailSubmit}
          />
        )}
        {isMobileState && (
          <LoginModalMobile qrCodeUri={qrCodeUri} connecting={connecting} />
        )}
      </Box>
    </Modal>
  );
};

export { LoginModal };
