import { useCallback } from 'react';
import { cosmos } from '@regen-network/api';
import { GenericAuthorization } from '@regen-network/api/cosmos/authz/v1beta1/authz';
import {
  MsgCancelSellOrder,
  MsgUpdateSellOrders,
} from '@regen-network/api/regen/ecocredit/marketplace/v1/tx';
import { MsgSend } from '@regen-network/api/regen/ecocredit/v1/tx';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import { apiUri } from 'lib/apiUri';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

import useMsgClient from 'hooks/useMsgClient';

const useStripeAccount = () => {
  const { activeAccount } = useAuth();
  const { signAndBroadcast } = useMsgClient();
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const retryCsrfRequest = useRetryCsrfRequest();
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);

  const setupAccount = useCallback(async () => {
    if (activeAccount?.addr && token) {
      await signAndBroadcast(
        {
          msgs: [
            cosmos.authz.v1beta1.MessageComposer.withTypeUrl.grant({
              granter: activeAccount?.addr,
              grantee: import.meta.env.VITE_REGEN_WORKER_ADDRESS,
              grant: {
                authorization: GenericAuthorization.toProtoMsg({
                  msg: MsgCancelSellOrder.typeUrl,
                }),
              },
            }),
            cosmos.authz.v1beta1.MessageComposer.withTypeUrl.grant({
              granter: activeAccount?.addr,
              grantee: import.meta.env.VITE_REGEN_WORKER_ADDRESS,
              grant: {
                authorization: GenericAuthorization.toProtoMsg({
                  msg: MsgUpdateSellOrders.typeUrl,
                }),
              },
            }),
            cosmos.authz.v1beta1.MessageComposer.withTypeUrl.grant({
              granter: activeAccount?.addr,
              grantee: import.meta.env.VITE_REGEN_WORKER_ADDRESS,
              grant: {
                authorization: GenericAuthorization.toProtoMsg({
                  msg: MsgSend.typeUrl,
                }),
              },
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
            try {
              await postData({
                url: `${apiUri}/marketplace/v1/stripe/accounts`,
                token,
                retryCsrfRequest,
                onSuccess: async response => {
                  setProcessingModalAtom(atom => void (atom.open = false));
                  window.location.href = response.url;
                },
              });
            } catch (error) {
              setProcessingModalAtom(atom => void (atom.open = false));
              setErrorBannerText(String(error));
            }
          },
        },
      );
    }
  }, [
    activeAccount?.addr,
    retryCsrfRequest,
    setErrorBannerText,
    setProcessingModalAtom,
    signAndBroadcast,
    token,
  ]);

  const openLoginLink = useCallback(async () => {
    if (token) {
      try {
        await postData({
          url: `${apiUri}/marketplace/v1/stripe/login-link`,
          token,
          retryCsrfRequest,
          onSuccess: async response => {
            window.open(response.url);
          },
        });
      } catch (e) {
        setErrorBannerText(String(e));
      }
    }
  }, [retryCsrfRequest, setErrorBannerText, token]);

  return { setupAccount, openLoginLink };
};

export { useStripeAccount };
