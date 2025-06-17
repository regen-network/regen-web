import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { isMobile as checkIsMobile } from '@walletconnect/browser-utils';
import { REGEN_DENOM } from 'config/allowedBaseDenoms';
import { DRAFT_ID } from 'legacy-pages/Dashboard/MyProjects/MyProjects.constants';

import { Body } from 'web-components/src/components/typography';

import { useLedger } from 'ledger';
import { useAuth } from 'lib/auth/auth';
import { getBalanceQuery } from 'lib/queries/react-query/cosmos/bank/getBalanceQuery/getBalanceQuery';

import { useQueryIsIssuer } from 'hooks/useQueryIsIssuer';

import { useWallet } from '../../../lib/wallet/wallet';
import { useLoginData } from '../LoginButton/hooks/useLoginData';
import { LoginFlow } from '../LoginFlow/LoginFlow';
import { CREATE_PROJECT } from './ListProject.constants';

const ListProject = () => {
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const { activeAccountId, activeAccount } = useAuth();
  const navigate = useNavigate();
  const isConnectingRef = useRef(false);

  const {
    isModalOpen,
    modalState,
    onModalClose,
    walletsUiConfig,
    onButtonClick,
  } = useLoginData({ createProject: true, isConnectingRef });
  const { isIssuer, isLoadingIsIssuer } = useQueryIsIssuer({
    address: activeAccount?.addr,
  });
  const { queryClient } = useLedger();

  // Populate cache with user balance once connected
  useQuery(
    getBalanceQuery({
      request: { address: wallet?.address as string, denom: REGEN_DENOM },
      client: queryClient,
      enabled: !!queryClient && !!wallet?.address,
    }),
  );

  return (
    <>
      {!isLoadingIsIssuer && (
        <Body
          className="text-[11px] sm:text-base font-bold bg-clip-text cursor-pointer mb-3 pr-10 sm:pr-25 bg-[linear-gradient(202deg,#4FB573_14.67%,#B9E1C7_97.14%)] text-right"
          sx={{
            textFillColor: 'transparent',
          }}
          onClick={
            activeAccountId
              ? () =>
                  navigate(
                    `/project-pages/${DRAFT_ID}/${
                      isIssuer ? 'choose-credit-class' : 'basic-info'
                    }`,
                  )
              : onButtonClick
          }
        >
          {_(CREATE_PROJECT)}
        </Body>
      )}
      <LoginFlow
        isConnectingRef={isConnectingRef}
        isModalOpen={isModalOpen}
        onModalClose={onModalClose}
        wallets={checkIsMobile() ? [] : [walletsUiConfig[0]]}
        modalState={modalState}
        redirectRoute="project-pages/draft/basic-info"
      />
    </>
  );
};

export { ListProject };
