export type WalletModalState = 'wallet-select' | 'wallet-mobile';

export type LoginProvider = {
  name: string;
  description?: string;
  imageUrl: string;
  onClick: () => void | Promise<void>;
};
