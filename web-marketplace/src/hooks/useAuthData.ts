import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

export const useAuthData = () => {
  const { loaded: walletLoaded, isConnected } = useWallet();
  const { loading: authLoading, activeAccountId } = useAuth();

  const noAccountAndNoWallet =
    !authLoading && !activeAccountId && walletLoaded && !isConnected;
  const accountOrWallet =
    (!authLoading && !!activeAccountId) || (walletLoaded && isConnected);

  return {
    accountOrWallet,
    noAccountAndNoWallet,
    loading: !walletLoaded || authLoading,
  };
};
