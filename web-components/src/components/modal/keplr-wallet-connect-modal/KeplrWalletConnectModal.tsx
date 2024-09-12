import { Box, Link } from '@mui/material';

import OutlinedButton from '../../../components/buttons/OutlinedButton';
import WalletErrorIcon from '../../../components/icons/WalletErrorIcon';
import { ButtonType } from '../../../types/shared/buttonType';
import { LinkType } from '../../../types/shared/linkType';
import { Body, Title } from '../../typography';
import Modal, { RegenModalProps } from '..';

export interface KeplrWalletConnectModalProps extends RegenModalProps {
  helpLink: LinkType;
  button: ButtonType;
  title: string;
  subtitle: string;
  learnMoreText: string;
}

const KeplrWalletConnectModal = ({
  open,
  helpLink,
  button,
  onClose,
  title,
  subtitle,
  learnMoreText,
}: KeplrWalletConnectModalProps) => {
  const { text, disabled, onClick, startIcon } = button;

  return (
    <Modal open={open} onClose={onClose} isFullscreenMobile={false}>
      <Box
        sx={{
          maxWidth: 460,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <WalletErrorIcon
          sx={{
            fontSize: 100,
            mb: 5,
          }}
        />
        <Title align="center" variant="h4" mb={5}>
          {title}
        </Title>
        <Body size="lg" align="center">
          {subtitle}
        </Body>
        <Body sx={{ mt: 2 }}>
          {learnMoreText}
          <Link href={helpLink.href} target="_blank">
            {helpLink.text}
          </Link>
        </Body>
        <OutlinedButton
          onClick={onClick}
          startIcon={startIcon}
          disabled={disabled}
          sx={{ mt: 12.5 }}
          size="large"
        >
          {text}
        </OutlinedButton>
      </Box>
    </Modal>
  );
};

export { KeplrWalletConnectModal };
