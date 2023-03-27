import { Variant } from '@mui/material/styles/createTypography';

import { ConnectWalletVariantType } from './ConnectWallet.types';

export const ConnectWalletVariantMapping: {
  [key in ConnectWalletVariantType]: Variant;
} = {
  page: 'h3',
  modal: 'h4',
};

export const ConnectWalletIconSizeMapping: {
  [key in ConnectWalletVariantType]: number;
} = {
  page: 198,
  modal: 86,
};

export const ConnectWalletTitleWidthMapping: {
  [key in ConnectWalletVariantType]: number;
} = {
  page: 575,
  modal: 460,
};

type WalletConnectElementsType = 'icon' | 'title' | 'description';

export const ConnectWalletMarginBottomMapping: {
  [key in ConnectWalletVariantType]: Record<WalletConnectElementsType, number>;
} = {
  page: { icon: 4, title: 6.25, description: 6.25 },
  modal: { icon: 5.5, title: 5, description: 12.5 },
};
