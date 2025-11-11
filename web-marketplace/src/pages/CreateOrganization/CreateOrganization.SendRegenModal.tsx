import { useCallback, useMemo } from 'react';
import { Trans } from '@lingui/macro';
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

import { useDaoOrganization } from 'hooks/useDaoOrganization';
import useMsgClient from 'hooks/useMsgClient';

type SendRegenModalProps = RegenModalProps & {
  completeCreation: () => void;
};
export const SendRegenModal = ({
  open,
  onClose,
  completeCreation,
}: SendRegenModalProps) => {
  const { queryClient } = useLedger();
  const { wallet } = useWallet();
  const { signAndBroadcast } = useMsgClient();
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const dao = useDaoOrganization();

  const { data: balanceData, isLoading: isLoadingCredit } = useQuery(
    getBalanceQuery({
      request: { address: wallet?.address as string, denom: REGEN_DENOM },
      client: queryClient,
      enabled: !!queryClient && !!wallet?.address,
    }),
  );

  const amountToSend = useMemo(
    () =>
      balanceData?.balance?.amount
        ? Math.min(Number(balanceData?.balance?.amount), 100000000)
        : undefined,
    [balanceData],
  );

  const sendRegen = useCallback(async () => {
    if (!amountToSend || !wallet?.address || !dao?.address) return;
    await signAndBroadcast(
      {
        msgs: [
          cosmos.bank.v1beta1.MessageComposer.withTypeUrl.send({
            fromAddress: wallet?.address,
            toAddress: dao?.address,
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
    dao?.address,
    setProcessingModalAtom,
    setErrorBannerText,
    onClose,
    completeCreation,
  ]);

  return (
    <>
      {!isLoadingCredit && amountToSend ? (
        <Modal open={open}>
          <div className="text-lg font-muli text-grey-500 uppercase font-extrabold text-center">
            <Trans>mandatory</Trans>
          </div>
          <Title variant="h4" className="text-center m-20">
            <Trans>
              Send {amountToSend / 1000000} REGEN to fund your organization
            </Trans>
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
            <ContainedButton onClick={sendRegen}>
              <Trans>Send tokens</Trans>
            </ContainedButton>
          </div>
        </Modal>
      ) : null}
    </>
  );
};
