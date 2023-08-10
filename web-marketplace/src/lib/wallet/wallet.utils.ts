import truncate from 'lodash/truncate';

import { UseStateSetter } from 'types/react/use-state';
import { apiUri } from 'lib/apiUri';
import { LoginEvent, Track } from 'lib/tracker/types';

import { chainInfo } from './chainInfo/chainInfo';
import { LoginType, Wallet } from './wallet';
import {
  KEPLR_ADD_ADDR_DESCRIPTION,
  KEPLR_LOGIN_DESCRIPTION,
  KEPLR_LOGIN_TITLE,
} from './wallet.constants';
import {
  WalletClient,
  WalletConfig,
} from './walletsConfig/walletsConfig.types';

/* getWallet */

type GetWalletParams = {
  walletClient?: WalletClient;
  walletConfig?: WalletConfig;
};

export const getWallet = async ({
  walletClient,
  walletConfig,
}: GetWalletParams): Promise<Wallet | undefined> => {
  let offlineSigner;

  if (walletClient) {
    offlineSigner = await walletConfig?.getOfflineSignerFunction(walletClient)(
      chainInfo.chainId,
    );
  }

  const key = await walletClient?.getKey(chainInfo.chainId);
  if (key && key.bech32Address && offlineSigner) {
    return {
      offlineSigner,
      address: key.bech32Address,
      shortAddress: truncate(key.bech32Address),
    };
  }

  return undefined;
};

/* finalizeConnection */

type FinalizeConnectionParams = {
  walletClient?: WalletClient;
  walletConfig?: WalletConfig;
  setWallet: UseStateSetter<Wallet>;
  track?: Track;
  login?: LoginType;
  doLogin?: boolean;
};

export const finalizeConnection = async ({
  walletClient,
  walletConfig,
  setWallet,
  track,
  login,
  doLogin = true,
}: FinalizeConnectionParams): Promise<void> => {
  try {
    await walletClient?.enable(chainInfo.chainId);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }

  const wallet = await getWallet({ walletClient, walletConfig });
  if (wallet) {
    if (track) {
      track<'login', LoginEvent>('login', {
        date: new Date().toUTCString(),
        account: wallet.address,
      });
    }
    setWallet(wallet);

    // signArbitrary (used in login) not yet supported by @keplr-wallet/wc-client
    // https://github.com/chainapsis/keplr-wallet/issues/664
    if (login && doLogin) await login({ walletConfig, wallet });
  }
};

/* getArbitraryData */

type GetArbitraryDataParams = {
  nonce: string;
  addAddr?: boolean;
};

export const getArbitraryData = ({
  nonce,
  addAddr = false,
}: GetArbitraryDataParams) =>
  JSON.stringify({
    title: KEPLR_LOGIN_TITLE,
    description: addAddr ? KEPLR_ADD_ADDR_DESCRIPTION : KEPLR_LOGIN_DESCRIPTION,
    nonce,
  });

/* getNonce */

type GetNonceParams = {
  userAddress: string;
  token: string;
};

export const getNonce = async ({
  userAddress,
  token,
}: GetNonceParams): Promise<string> => {
  const nonceRes = await fetch(
    `${apiUri}/web3auth/nonce?` +
      new URLSearchParams({
        userAddress: userAddress,
      }),
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-CSRF-TOKEN': token,
      },
    },
  );
  const { nonce } = await nonceRes.json();
  return nonce || '';
};
