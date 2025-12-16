import { AccountOption } from 'components/organisms/DashboardNavigation/DashboardNavigation.types';

export type SocialProvider = {
  id: 'google';
  name: string;
  connect: () => void;
  disconnect: () => Promise<void>;
};

export type DashboardNavAccount = AccountOption & {
  source: 'auth' | 'dao';
  roleAccountId?: string;
  roleName?: string;
  canUseStripeConnect: boolean;
  stripeConnectedAccountId?: string | null;
};
