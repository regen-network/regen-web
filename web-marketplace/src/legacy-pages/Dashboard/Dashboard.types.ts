export type SocialProvider = {
  id: 'google';
  name: string;
  connect: () => void;
  disconnect: () => Promise<void>;
};
