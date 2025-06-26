import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { startCase } from 'lodash';

import { Flex } from 'web-components/src/components/box';
import { SaveChangesWarningModal } from 'web-components/src/components/modal/SaveChangesWarningModal/SaveChangesWarningModal';
import { Title } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import { isProfileEditDirtyRef } from 'lib/atoms/ref.atoms';
import { useAuth } from 'lib/auth/auth';
import { getPaymentMethodsQuery } from 'lib/queries/react-query/registry-server/getPaymentMethodsQuery/getPaymentMethodsQuery';
import { useWallet } from 'lib/wallet/wallet';

import WithLoader from 'components/atoms/WithLoader';
import { AdminNavigation } from 'components/organisms/AdminNavigation/AdminNavigation';
import { getAdminNavigationSections } from 'components/organisms/AdminNavigation/AdminNavigation.utils';
import { useShowOrders } from 'components/organisms/RegistryLayout/hooks/useShowOrders';

import {
  DISCARD_CHANGES_BODY,
  DISCARD_CHANGES_BUTTON,
  DISCARD_CHANGES_TITLE,
} from '../../lib/constants/shared.constants';
import { usePathSection } from './hooks/usePathSection';
import { ViewProfileButton } from './ProfileEdit.ViewProfile';

export const ProfileEdit = () => {
  const { _ } = useLingui();
  const { accountChanging, loginDisabled } = useWallet();
  const { loading } = useAuth();
  const showOrders = useShowOrders();

  const [isWarningModalOpen, setIsWarningModalOpen] = useState<
    string | undefined
  >(undefined);
  const setIsProfileEditDirtyref = useSetAtom(isProfileEditDirtyRef);
  const isDirtyRef = useRef<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const section = usePathSection();

  const { data: paymentMethodData } = useQuery(
    getPaymentMethodsQuery({
      enabled: true,
    }),
  );

  const onNavClick = (sectionName: string): void => {
    const isFormDirty = isDirtyRef.current;
    const path = `/dashboard/admin/${sectionName.replace(' ', '-')}`;
    if (isFormDirty) {
      setIsWarningModalOpen(path);
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    if (isDirtyRef && setIsProfileEditDirtyref) {
      setIsProfileEditDirtyref(isDirtyRef);
    }
  }, [isDirtyRef, setIsProfileEditDirtyref]);

  return (
    <div className="bg-grey-100">
      <div className="flex flex-col justify-start items-center lg:items-start lg:flex-row lg:justify-evenly max-w-[1150px] mx-auto p-10 lg:py-50 lg:px-15 lg:min-h-screen">
        <AdminNavigation
          className="hidden lg:block min-w-[235px]"
          sections={getAdminNavigationSections({ showOrders, loginDisabled })}
          onNavItemClick={onNavClick}
          currentPath={pathname}
          savedPaymentInfo={
            (paymentMethodData?.paymentMethods?.length ?? 0) > 0
          }
        />
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
          }}
          className={cn(
            'w-full lg:w-[850px] md:ml-10 xl:ml-30',
            section ? 'flex' : 'hidden',
          )}
        >
          <Flex
            justifyContent="space-between"
            className="my-10 md:mb-20 w-full h-50"
          >
            <Title variant="h1" className="text-[32px] leading-[1.4]">
              {startCase(section)}
            </Title>
            {section === 'profile' && (
              <ViewProfileButton
                setIsWarningModalOpen={setIsWarningModalOpen}
              />
            )}
          </Flex>
          <WithLoader isLoading={accountChanging || loading}>
            <div className="rounded-md border border-grey-200 bg-grey-0 w-full">
              <Outlet />
            </div>
          </WithLoader>
        </Flex>
      </div>
      <SaveChangesWarningModal
        open={!!isWarningModalOpen}
        title={_(DISCARD_CHANGES_TITLE)}
        bodyText={_(DISCARD_CHANGES_BODY)}
        buttonText={_(DISCARD_CHANGES_BUTTON)}
        navigate={() => {
          if (isWarningModalOpen) navigate(isWarningModalOpen);
          isDirtyRef.current = false;
        }}
        onClose={() => {
          setIsWarningModalOpen(undefined);
        }}
      />
    </div>
  );
};
