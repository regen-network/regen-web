'use client';

import { useCallback, useEffect, useRef } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { findDao } from 'app/[lang]/member-on-boarding/utils';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';

import { Loading } from 'web-components/src/components/loading';
import { EmailConfirmationModal } from 'web-components/src/components/modal/EmailConfirmationModal/EmailConfirmationModal';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { useAuth } from 'lib/auth/auth';
import {
  EMAIL_CONFIRMATION_ARIA_LABEL,
  EMAIL_CONFIRMATION_CODE_HELPER,
  EMAIL_CONFIRMATION_DESCRIPTION,
  EMAIL_CONFIRMATION_TITLE,
} from 'lib/constants/shared.constants';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';

import {
  ROLE_ADMIN,
  ROLE_EDITOR,
  ROLE_OWNER,
} from '../ActionDropdown/ActionDropdown.constants';
import { useLoginData } from '../LoginButton/hooks/useLoginData';
import {
  EMAIL_CONFIRMATION_CANCEL,
  EMAIL_CONFIRMATION_SUBMIT,
} from '../LoginButton/LoginButton.constants';
import { getResendCodeButtonLink } from '../LoginButton/utils/getResendCodeButtonLink';
import { getResendCodeLabel } from '../LoginButton/utils/getResendCodeLabel';
import { useEmailConfirmationData } from '../LoginFlow/hooks/useEmailConfirmationData';
import { LoginModal } from '../LoginModal/LoginModal';
import { PersonalProfile } from './MemberOnBoarding.PersonalProfile';

type MemberOnBoardingProps = {
  accountId: string;
  role: string;
  email: string;
  daoAddress: string;
};

export const MemberOnBoarding = ({
  accountId,
  role,
  email,
  daoAddress,
}: MemberOnBoardingProps) => {
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { activeAccountId, loading } = useAuth();
  const router = useRouter();
  const { _ } = useLingui();

  const { data, isFetching: isLoadingAccountById } = useQuery(
    getAccountByIdQuery({
      client: graphqlClient,
      languageCode: selectedLanguage,
      id: accountId,
      enabled: !!accountId && !!graphqlClient,
    }),
  );
  const account = data?.accountById;
  const dao = findDao(daoAddress, data);

  const navigateToDashboard = useCallback(() => {
    const projectId =
      dao?.projectByAdminDaoAddress?.onChainId ||
      dao?.projectByAdminDaoAddress?.id;
    const path = projectId
      ? `/dashboard/projects/${projectId}/manage/collaborators`
      : '/dashboard/organization/members';
    router.push(path);
  }, [router, dao]);

  const isConnectingRef = useRef(false);
  const {
    isConfirmationModalOpen,
    emailModalError,
    resendTimeLeft,
    onConfirmationModalClose,
    onMailCodeChange,
    onResendPasscode,
    onEmailSubmit,
  } = useEmailConfirmationData({
    isConnectingRef,
  });
  const {
    isModalOpen,
    modalState,
    onModalClose,
    walletsUiConfig,
    onButtonClick: showLoginModal,
  } = useLoginData({ isConnectingRef });

  const walletRequired =
    role === ROLE_ADMIN || role === ROLE_OWNER || role === ROLE_EDITOR;

  useEffect(() => {
    if (!loading && !activeAccountId && activeAccountId !== accountId) {
      if (walletRequired) {
        showLoginModal();
      } else {
        onEmailSubmit({ email });
      }
    }
  }, [
    loading,
    activeAccountId,
    accountId,
    walletRequired,
    email,
    showLoginModal,
    onEmailSubmit,
  ]);

  return (
    <>
      {activeAccountId === accountId ? (
        isLoadingAccountById ? (
          <Loading />
        ) : (
          <PersonalProfile
            initialValues={{
              name: account?.name || '',
              profileImage: account?.image,
              title: account?.title,
              description: account?.description,
            }}
            onSuccess={navigateToDashboard}
          />
        )
      ) : walletRequired ? (
        <LoginModal
          open={isModalOpen}
          onClose={onModalClose}
          wallets={[walletsUiConfig[0]]}
          socialProviders={[]}
          onEmailSubmit={async ({ email }) => {
            await onEmailSubmit({ email, callback: onModalClose });
          }}
          state={modalState}
          onlyWallets
        />
      ) : (
        <EmailConfirmationModal
          ariaLabel={_(EMAIL_CONFIRMATION_ARIA_LABEL)}
          resendText={getResendCodeLabel({ resendTimeLeft, _ })}
          resendButtonLink={getResendCodeButtonLink({
            resendTimeLeft,
            onResendPasscode,
            _,
          })}
          cancelButton={{
            text: _(EMAIL_CONFIRMATION_CANCEL),
            onClick: onConfirmationModalClose,
          }}
          signInButton={{
            text: _(EMAIL_CONFIRMATION_SUBMIT),
            disabled: true,
            onClick: () => void 0,
          }}
          mailLink={{ text: email, href: '#' }}
          onClose={onConfirmationModalClose}
          open={isConfirmationModalOpen}
          error={emailModalError}
          onCodeChange={onMailCodeChange}
          title={_(EMAIL_CONFIRMATION_TITLE)}
          description={_(EMAIL_CONFIRMATION_DESCRIPTION)}
          helperText={_(EMAIL_CONFIRMATION_CODE_HELPER)}
        />
      )}
    </>
  );
};
