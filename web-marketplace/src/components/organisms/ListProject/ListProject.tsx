import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { isMobile as checkIsMobile } from '@walletconnect/browser-utils';
import { REGEN_DENOM } from 'config/allowedBaseDenoms';

import { Body } from 'web-components/src/components/typography';

import { useLedger } from 'ledger';
import { useAuth } from 'lib/auth/auth';
import { getBalanceQuery } from 'lib/queries/react-query/cosmos/bank/getBalanceQuery/getBalanceQuery';

import { useProfileItems } from 'pages/Dashboard/hooks/useProfileItems';
import { DRAFT_ID } from 'pages/Dashboard/MyProjects/MyProjects.constants';

import { useWallet } from '../../../lib/wallet/wallet';
import { useLoginData } from '../LoginButton/hooks/useLoginData';
import { LoginFlow } from '../LoginFlow/LoginFlow';
import { LIST_PROJECT } from './ListProject.constants';

const ListProject = () => {
  const { wallet } = useWallet();
  const { activeAccountId } = useAuth();
  const navigate = useNavigate();
  const isConnectingRef = useRef(false);

  const {
    isModalOpen,
    modalState,
    onModalClose,
    walletsUiConfig,
    onButtonClick,
  } = useLoginData({ createProject: true, isConnectingRef });
  const { isIssuer } = useProfileItems({});

  const { bankClient } = useLedger();

  // Populate cache with user balance once connected
  useQuery(
    getBalanceQuery({
      request: { address: wallet?.address, denom: REGEN_DENOM },
      client: bankClient,
      enabled: !!bankClient && !!wallet?.address,
    }),
  );

  return (
    <div>
      <Body
        className="text-[11px] sm:text-base font-bold bg-clip-text cursor-pointer pt-[2px] pr-10 sm:pr-50 bg-[linear-gradient(202deg,#4FB573_14.67%,#B9E1C7_97.14%)]"
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
        {LIST_PROJECT}
      </Body>
      <LoginFlow
        createProject
        isConnectingRef={isConnectingRef}
        isModalOpen={isModalOpen}
        onModalClose={onModalClose}
        wallets={checkIsMobile() ? [] : [walletsUiConfig[0]]}
        modalState={modalState}
      />
    </div>
  );
};

export { ListProject };
