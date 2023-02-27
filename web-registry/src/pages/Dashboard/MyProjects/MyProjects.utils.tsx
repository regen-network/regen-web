import { NavigateFunction } from 'react-router-dom';

import {
  useCreateProjectMutation,
  useCreateWalletMutation,
  WalletByAddrQuery,
} from 'generated/graphql';
import { UseStateSetter } from 'types/react/use-state';
import { Wallet } from 'lib/wallet/wallet';

type SubmitCreateWalletParams = {
  wallet?: Wallet;
  createWallet: ReturnType<typeof useCreateWalletMutation>[0];
  setError: UseStateSetter<string | null>;
};

export async function submitCreateWallet({
  createWallet,
  wallet,
  setError,
}: SubmitCreateWalletParams): Promise<void> {
  if (!wallet?.address) return Promise.reject();
  try {
    const res = await createWallet({
      variables: {
        input: {
          wallet: {
            addr: wallet.address,
          },
        },
      },
    });
    const newWalletId = res.data?.createWallet?.wallet?.id;
    if (newWalletId) {
      return newWalletId;
    }
  } catch (e) {
    setError('Error adding wallet address to database');
  }
}

type SubmitCreateProjectParams = {
  walletData?: WalletByAddrQuery;
  createProject: ReturnType<typeof useCreateProjectMutation>[0];
  navigate: NavigateFunction;
} & SubmitCreateWalletParams;

export async function submitCreateProject({
  createWallet,
  createProject,
  setError,
  navigate,
  wallet,
  walletData,
}: SubmitCreateProjectParams): Promise<void> {
  let walletId = walletData?.walletByAddr?.id;
  if (!walletId) {
    walletId = await submitCreateWallet({ createWallet, wallet, setError });
  }

  try {
    const res = await createProject({
      variables: {
        input: {
          project: {
            walletId,
          },
        },
      },
    });
    const projectId = res?.data?.createProject?.project?.id;
    if (projectId) {
      navigate(`/project-pages/${projectId}/choose-credit-class`);
    }
  } catch (e) {
    setError('Error creating project');
  }
}
