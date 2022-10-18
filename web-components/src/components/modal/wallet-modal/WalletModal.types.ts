export type WalletModalState = 'wallet-select' | 'wallet-mobile';

export type Wallet = {
  name: string;
  description: string;
  imageUrl: string;
  onClick: () => void | Promise<void>;
};
