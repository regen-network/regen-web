import { useCallback, useMemo } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { cosmos } from '@regen-network/api';
import { useQuery } from '@tanstack/react-query';
import { REGEN_DENOM } from 'config/allowedBaseDenoms';
import { useSetAtom } from 'jotai';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import Modal, { RegenModalProps } from 'web-components/src/components/modal';
import { Body, Title } from 'web-components/src/components/typography';

import { useLedger } from 'ledger';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { getBalanceQuery } from 'lib/queries/react-query/cosmos/bank/getBalanceQuery/getBalanceQuery';
import { useWallet } from 'lib/wallet/wallet';

import useMsgClient, { defaultFee } from 'hooks/useMsgClient';

import { CAP_AMOUNT_TO_SEND } from './CreateOrganization.constants';

type SendRegenModalProps = RegenModalProps & {
  completeCreation: () => void;
  orgAddress?: string;
};
export const SendRegenModal = ({
  open,
  onClose,
  completeCreation,
  orgAddress,
}: SendRegenModalProps) => {
  const { _ } = useLingui();
  const { queryClient } = useLedger();
  const { wallet } = useWallet();
  const { signAndBroadcast } = useMsgClient();
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);

  const { data: balanceData, isLoading: isLoadingBalance } = useQuery(
    getBalanceQuery({
      request: { address: wallet?.address as string, denom: REGEN_DENOM },
      client: queryClient,
      enabled: !!queryClient && !!wallet?.address,
    }),
  );

  const amountToSend = useMemo(() => {
    const balStr = balanceData?.balance?.amount;
    if (!balStr) return undefined;

    const balance = BigInt(balStr);
    // Use a fixed fee (Keplr-style). MsgSend gas is predictable and this keeps
    // max-send logic simple without needing async gas simulation.
    const fixedFee = BigInt(defaultFee.amount[0].amount);

    // not enough to even pay the fee
    if (balance <= fixedFee) return 0n;

    const maxToSend = balance - fixedFee;
    return maxToSend < CAP_AMOUNT_TO_SEND ? maxToSend : CAP_AMOUNT_TO_SEND;
  }, [balanceData?.balance?.amount]);

  const sendRegen = useCallback(async () => {
    if (
      !amountToSend ||
      amountToSend <= 0n ||
      !wallet?.address ||
      !orgAddress
    ) {
      setErrorBannerText(_(msg`Missing required parameters`));
      return;
    }

    await signAndBroadcast(
      {
        msgs: [
          cosmos.bank.v1beta1.MessageComposer.withTypeUrl.send({
            fromAddress: wallet?.address,
            toAddress: orgAddress,
            amount: [
              {
                denom: REGEN_DENOM,
                amount: amountToSend.toString(),
              },
            ],
          }),
        ],
      },
      (): void => {
        setProcessingModalAtom(atom => void (atom.open = true));
      },
      {
        onError: async (error?: Error) => {
          setProcessingModalAtom(atom => void (atom.open = false));
          setErrorBannerText(String(error));
        },
        onSuccess: async () => {
          setProcessingModalAtom(atom => void (atom.open = false));
          onClose && onClose();
          completeCreation();
        },
      },
    );
  }, [
    signAndBroadcast,
    amountToSend,
    wallet?.address,
    orgAddress,
    setProcessingModalAtom,
    setErrorBannerText,
    onClose,
    completeCreation,
    _,
  ]);

  const canSendRegen = !isLoadingBalance && amountToSend && amountToSend > 0n;

  return (
    <Modal open={open}>
      <div className="text-lg font-muli text-grey-500 uppercase font-extrabold text-center">
        <Trans>mandatory</Trans>
      </div>
      <Title variant="h4" className="text-center m-20">
        {canSendRegen ? (
          <Trans>
            Send {amountToSend / 1000000n} REGEN to fund your organization
          </Trans>
        ) : (
          <Trans>
            You do not have enough REGEN to fund your organization. Please, top
            up your wallet to continue and reload.
          </Trans>
        )}
      </Title>
      <Body size="lg" className="text-center">
        <Trans>
          When you send tokens to your organization’s account,{' '}
          <b>
            all members can perform on-chain actions on behalf of the
            organization without needing to hold tokens
          </b>{' '}
          in their personal wallets.
        </Trans>
      </Body>
      <div className="pt-50 flex justify-end">
        <ContainedButton onClick={sendRegen} disabled={!canSendRegen}>
          <Trans>Send tokens</Trans>
        </ContainedButton>
      </div>
    </Modal>
  );
};
