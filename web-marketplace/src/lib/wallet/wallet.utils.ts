import truncate from 'lodash/truncate';

import { UseStateSetter } from 'types/react/use-state';
import { apiUri } from 'lib/apiUri';
import { ConnectEvent, Track } from 'lib/tracker/types';

import { chainInfo } from './chainInfo/chainInfo';
import { LoginType, Wallet } from './wallet';
import {
  KEPLR_CONNECT_WALLET_DESCRIPTION,
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
  login?: LoginType;
  doLogin?: boolean;
  doLogout?: boolean;
  track?: Track;
};

export const finalizeConnection = async ({
  walletClient,
  walletConfig,
  setWallet,
  login,
  doLogin = true,
  doLogout,
  track,
}: FinalizeConnectionParams): Promise<Wallet | undefined> => {
  try {
    await walletClient?.enable(chainInfo.chainId);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }

  const wallet = await getWallet({ walletClient, walletConfig });
  if (wallet) {
    setWallet(wallet);

    if (track && walletClient?.mode === 'mobile-web') {
      await track<ConnectEvent>('loginKeplrMobileApp', {
        account: wallet.address,
        date: new Date().toUTCString(),
      });
    }

    // signArbitrary (used in login) not yet supported by @keplr-wallet/wc-client
    // https://github.com/chainapsis/keplr-wallet/issues/664
    if (login && doLogin) await login({ walletConfig, wallet, doLogout });
    return wallet;
  }
};

/* getArbitraryData */

type GetArbitraryDataParams = {
  nonce: string;
  /** connectWallet is set to true when connecting a wallet address to an existing web2 account */
  connectWallet?: boolean;
};

export const getArbitraryData = ({
  nonce,
  connectWallet = false,
}: GetArbitraryDataParams) =>
  JSON.stringify({
    title: KEPLR_LOGIN_TITLE,
    description: connectWallet
      ? KEPLR_CONNECT_WALLET_DESCRIPTION
      : KEPLR_LOGIN_DESCRIPTION,
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
    `${apiUri}/marketplace/v1/wallet-auth/nonce?` +
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

/**
 * Normalize a public key coming from @interchain-kit into a Uint8Array.
 *
 * CosmJS expects a Uint8Array when encoding secp256k1 pubkeys.
 *
 * Supported input formats:
 * - Uint8Array (returned as-is)
 * - number[] (converted via Uint8Array.from)
 * - object with numeric keys (e.g. {0: 2, 1: 112, ...})
 *
 * @param pubkeyLike - Public key in an unknown/loose format
 * @returns A normalized Uint8Array
 * @throws If the format is not recognized
 */
function normalizePubkey(pubkeyLike: any): Uint8Array {
  if (pubkeyLike instanceof Uint8Array) return pubkeyLike;
  if (Array.isArray(pubkeyLike)) return Uint8Array.from(pubkeyLike);

  // object with numeric keys (0..n)
  if (pubkeyLike && typeof pubkeyLike === 'object') {
    const keys = Object.keys(pubkeyLike)
      .filter(k => String(+k) === k) // numeric keys only
      .map(k => +k)
      .sort((a, b) => a - b);

    const out = new Uint8Array(keys.length);
    for (let i = 0; i < keys.length; i++) out[i] = pubkeyLike[keys[i]];
    return out;
  }

  // eslint-disable-next-line lingui/no-unlocalized-strings
  throw new Error('Unknown pubkey format');
}

/**
 * Wrap an OfflineSigner-like object so that `getAccounts()` always returns
 * accounts with a properly typed `Uint8Array` pubkey.
 *
 * This is useful when using @interchain-kit (used to connect via Wallet Connect).
 * Indeed it returns unsupported objects for accounts pubkey that are probably meant to be used with InterchainJS,
 * but we are still relying on CosmJS internally, so that breaks CosmJS encoding.
 *
 * The wrapper preserves:
 * - the original prototype
 * - all existing methods
 * - the original signer behavior
 *
 * Only `getAccounts()` is intercepted and normalized.
 *
 * @param signer - An object implementing `getAccounts()`
 * @returns A wrapped signer with normalized account pubkeys
 */
export function wrapSigner<T extends { getAccounts: () => Promise<any[]> }>(
  signer: T,
): T {
  const originalGetAccounts = signer.getAccounts.bind(signer);

  return Object.assign(Object.create(Object.getPrototypeOf(signer)), signer, {
    async getAccounts() {
      const accts = await originalGetAccounts();
      return accts.map(a => ({
        ...a,
        pubkey: normalizePubkey(a.pubkey),
      }));
    },
  });
}
