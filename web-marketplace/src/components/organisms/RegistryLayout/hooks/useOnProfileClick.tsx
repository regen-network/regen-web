import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import { OnProfileClickType } from 'web-components/lib/components/header/components/UserMenuItem.types';

import { AccountByIdQuery } from 'generated/graphql';
import { apiUri } from 'lib/apiUri';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { addWalletModalSwitchWarningAtom } from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { GET_ACCOUNTS_QUERY_KEY } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.constants';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { useWallet } from 'lib/wallet/wallet';
import { WalletType } from 'lib/wallet/walletsConfig/walletsConfig.types';

export const useOnProfileClick = () => {
  const navigate = useNavigate();
  const { authenticatedAccounts } = useAuth();
  const { connectWallet, wallet } = useWallet();
  const setAddWalletModalSwitchWarningAtom = useSetAtom(
    addWalletModalSwitchWarningAtom,
  );
  const reactQueryClient = useQueryClient();
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const retryCsrfRequest = useRetryCsrfRequest();

  const updateActiveAccount = useCallback(
    async (accountId: string) => {
      if (token) {
        await postData({
          url: `${apiUri}/marketplace/v1/auth/accounts`,
          data: {
            accountId,
          },
          token,
          retryCsrfRequest,
          onSuccess: async () =>
            await reactQueryClient.invalidateQueries({
              queryKey: [GET_ACCOUNTS_QUERY_KEY],
            }),
        });
      }
    },
    [reactQueryClient, retryCsrfRequest, token],
  );

  const checkWallet = useCallback(
    async (
      accountId: string,
      account?: AccountByIdQuery['accountById'],
      addr?: string,
    ) => {
      if (addr === account?.addr) {
        await updateActiveAccount(accountId);
      } else {
        setAddWalletModalSwitchWarningAtom(atom => void (atom.open = true));
      }
    },
    [setAddWalletModalSwitchWarningAtom, updateActiveAccount],
  );

  const onProfileClick: OnProfileClickType = useCallback(
    async (accountId: string, isSelected: boolean) => {
      if (isSelected) navigate('/profile');
      else {
        const account = authenticatedAccounts?.find(a => a?.id === accountId);
        try {
          // If the account has a wallet address set up, we should make sure
          // that the address in Keplr is the same, if not, warn the user
          if (account?.addr) {
            if (wallet?.address) {
              await checkWallet(accountId, account, wallet?.address);
            } else if (connectWallet) {
              const connectedWallet = await connectWallet({
                walletType: WalletType.Keplr,
                doLogin: false,
              });
              if (connectedWallet?.address) {
                await checkWallet(accountId, account, connectedWallet?.address);
              }
            }
          } else {
            // else we can just switch to the new account
            await updateActiveAccount(accountId);
          }
        } catch (e) {
          setErrorBannerTextAtom(String(e));
        }
      }
    },
    [
      authenticatedAccounts,
      checkWallet,
      connectWallet,
      navigate,
      setErrorBannerTextAtom,
      updateActiveAccount,
      wallet?.address,
    ],
  );

  return onProfileClick;
};
