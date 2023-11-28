import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { useSetAtom } from 'jotai';
import { startCase } from 'lodash';

import { Flex } from 'web-components/lib/components/box';
import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import { Title } from 'web-components/lib/components/typography';
import { cn } from 'web-components/lib/utils/styles/cn';

import { isProfileEditDirtyRef } from 'lib/atoms/ref.atoms';
import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

import { WarningModal } from 'pages/ProjectEdit/ProjectEdit.WarningModal';
import WithLoader from 'components/atoms/WithLoader';

import { usePathSection } from './hooks/usePathSection';
import { ProfileEditNav } from './ProfileEdit.Nav';
import { ViewProfileButton } from './ProfileEdit.ViewProfile';

export const ProfileEdit = () => {
  const { accountChanging } = useWallet();
  const { loading } = useAuth();
  const theme = useTheme();
  const [isWarningModalOpen, setIsWarningModalOpen] = useState<
    string | undefined
  >(undefined);
  const setIsProfileEditDirtyref = useSetAtom(isProfileEditDirtyRef);
  const isDirtyRef = useRef<boolean>(false);
  const navigate = useNavigate();

  const section = usePathSection();

  const onBackClick = (): void => {
    const isFormDirty = isDirtyRef.current;

    const path = '/profile/edit';
    if (isFormDirty) {
      setIsWarningModalOpen(path);
    } else {
      navigate(path);
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
    <div className="flex flex-col justify-start items-center lg:items-start lg:flex-row lg:justify-evenly bg-grey-100 p-35 lg:py-50 lg:px-15 min-h-screen">
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
      <ProfileEditNav
        section={section}
        onNavClick={onNavClick}
        className={cn(
          'flex-col lg:flex w-full lg:w-fit',
          section ? 'hidden' : 'flex',
        )}
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
            <ViewProfileButton setIsWarningModalOpen={setIsWarningModalOpen} />
          )}
        </Flex>
        <WithLoader isLoading={accountChanging || loading} sx={{ mx: 'auto' }}>
          <div className="py-50 px-40 rounded-md border border-grey-200 bg-grey-0">
            <Outlet />
          </div>
        </WithLoader>
      </Flex>
      <WarningModal
        open={!!isWarningModalOpen}
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
