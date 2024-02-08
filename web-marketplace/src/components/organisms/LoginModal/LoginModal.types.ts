export type LoginModalState = 'select';

export type LoginProvider = {
  name: string;
  description?: string;
  imageUrl: string;
  onClick: () => void | Promise<void>;
};
