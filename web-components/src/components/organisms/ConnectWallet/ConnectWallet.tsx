import { Box, SxProps } from '@mui/material';

import WalletErrorIcon from '../../../components/icons/WalletErrorIcon';
import { Body, Title } from '../../../components/typography';
import { Theme } from '../../../theme/muiTheme';
import {
  ConnectWalletIconSizeMapping,
  ConnectWalletMarginBottomMapping,
  ConnectWalletTitleWidthMapping,
  ConnectWalletVariantMapping,
} from './ConnectWallet.constants';
import { ConnectWalletVariantType } from './ConnectWallet.types';

export interface ConnectWalletProps {
  title: string;
  description?: string | JSX.Element;
  button: JSX.Element;
  variant: ConnectWalletVariantType;
  sx?: SxProps<Theme>;
}

const ConnectWallet = ({
  title,
  description,
  button,
  variant,
  sx = [],
}: ConnectWalletProps): JSX.Element => {
  const marginBottoms = ConnectWalletMarginBottomMapping[variant];
  const iconFontSize = ConnectWalletIconSizeMapping[variant];
  const titleVariant = ConnectWalletVariantMapping[variant];
  const titleWidth = ConnectWalletTitleWidthMapping[variant];

  return (
    <Box
      sx={[
        { display: 'flex', flexDirection: 'column', alignItems: 'center' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <WalletErrorIcon
        sx={{
          fontSize: iconFontSize,
          mb: marginBottoms.icon,
        }}
      />
      <Title
        variant={titleVariant}
        sx={{
          mb: marginBottoms.title,
          maxWidth: titleWidth,
          textAlign: 'center',
        }}
      >
        {title}
      </Title>
      {description && (
        <Body
          size="lg"
          sx={{ mb: marginBottoms.description, textAlign: 'center' }}
        >
          {description}
        </Body>
      )}
      {button}
    </Box>
  );
};

export { ConnectWallet };
