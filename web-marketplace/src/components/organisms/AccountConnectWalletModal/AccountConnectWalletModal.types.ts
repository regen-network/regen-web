export type AccountConnectModalState = 'select' | 'wallet-mobile';

export type LoginProvider = {
  name: string;
  description?: string;
  imageUrl: string;
  onClick: () => void | Promise<void>;
};
