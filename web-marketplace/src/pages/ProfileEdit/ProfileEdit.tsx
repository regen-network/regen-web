import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useTheme } from '@mui/material';
import { useSetAtom } from 'jotai';
import { startCase } from 'lodash';

import { Flex } from 'web-components/src/components/box';
import ArrowDownIcon from 'web-components/src/components/icons/ArrowDownIcon';
import { SaveChangesWarningModal } from 'web-components/src/components/modal/SaveChangesWarningModal/SaveChangesWarningModal';
import { Title } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import { isProfileEditDirtyRef } from 'lib/atoms/ref.atoms';
import { useAuth } from 'lib/auth/auth';
import { DISCARD_CHANGES_TITLE } from 'lib/constants/shared.constants';
import { useWallet } from 'lib/wallet/wallet';

import WithLoader from 'components/atoms/WithLoader';
import { AdminNavigation } from 'components/organisms/AdminNavigation/AdminNavigation';
import { adminNavigationSections } from 'components/organisms/AdminNavigation/AdminNavigation.constants';

import {
  DISCARD_CHANGES_BODY,
  DISCARD_CHANGES_BUTTON,
} from '../../lib/constants/shared.constants';
import { usePathSection } from './hooks/usePathSection';
import { ViewProfileButton } from './ProfileEdit.ViewProfile';

export const ProfileEdit = () => {
  const { _ } = useLingui();
  const { accountChanging } = useWallet();
  const { loading } = useAuth();
  const theme = useTheme();
  const [isWarningModalOpen, setIsWarningModalOpen] = useState<
    string | undefined
  >(undefined);
  const setIsProfileEditDirtyref = useSetAtom(isProfileEditDirtyRef);
  const isDirtyRef = useRef<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const section = usePathSection();

  const onBackClick = (): void => {
    const isFormDirty = isDirtyRef.current;

    const path = '/profile/edit';
    if (isFormDirty) {
      setIsWarningModalOpen(path);
    } else {
      if (pathname === path) {
        // On mobile, we want to navigate back to the profile page
        navigate('/profile');
      } else {
        navigate(path);
      }
    }
  };

  const onNavClick = (sectionName: string): void => {
    const isFormDirty = isDirtyRef.current;
    const path = `/profile/edit/${sectionName.replace(' ', '-')}`;
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
      <div className="flex flex-col justify-start items-center lg:items-start lg:flex-row lg:justify-evenly max-w-[946px] mx-auto p-10 lg:py-50 lg:px-15 min-h-screen">
        <div className="flex self-start lg:hidden mb-40 lg:mb-25">
          <div
            className="w-fit cursor-pointer"
            role="button"
            onClick={onBackClick}
          >
            <ArrowDownIcon
              color={theme.palette.secondary.main}
              className="text-2xl"
              direction="prev"
            />
          </div>
        </div>
        <AdminNavigation
          sections={adminNavigationSections}
          onNavItemClick={onNavClick}
          currentPath={pathname}
        />
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
          }}
          className={cn('w-full lg:w-[560px]', section ? 'flex' : 'hidden')}
        >
          <Flex justifyContent="space-between" className="mb-25 w-full">
            <Title variant="h3">{startCase(section)}</Title>
            {section === 'profile' && (
              <ViewProfileButton
                setIsWarningModalOpen={setIsWarningModalOpen}
              />
            )}
          </Flex>
          <WithLoader
            isLoading={accountChanging || loading}
            sx={{ mx: 'auto' }}
          >
            <div className="py-40 px-10 md:py-50 md:px-40 rounded-md border border-grey-200 bg-grey-0">
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
