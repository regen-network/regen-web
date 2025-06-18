import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import EyeIcon from 'web-components/src/components/icons/EyeIcon';

import { UseStateSetter } from 'types/react/use-state';
import { isProfileEditDirtyRef } from 'lib/atoms/ref.atoms';

import {
  NO_ACTIVE_ACCOUNT,
  VIEW_PROFILE,
  VIEW_PUBLIC_PROFILE,
} from './Dashboard.constants';
import { getProfileUrl } from './Dashboard.utils';

type Props = {
  setIsWarningModalOpen: UseStateSetter<string | undefined>;
  activeAccount?: { addr?: string; id?: string; [key: string]: any } | null;
  section: string;
};

export const ViewProfileButton = ({
  setIsWarningModalOpen,
  activeAccount,
  section,
}: Props) => {
  const { _ } = useLingui();
  const [isDirtyRef] = useAtom(isProfileEditDirtyRef);
  const navigate = useNavigate();

  const handleViewProfile = () => {
    if (!activeAccount) {
      console.warn(NO_ACTIVE_ACCOUNT);
      return;
    }

    const profileUrl = getProfileUrl(activeAccount);

    if (isDirtyRef?.current) {
      setIsWarningModalOpen(profileUrl);
    } else {
      navigate(profileUrl);
    }
  };

  if (!activeAccount) {
    return null;
  }

  return (
    <div className={`flex ${section === 'profile' ? '' : 'hidden md:flex'}`}>
      <OutlinedButton
        onClick={handleViewProfile}
        startIcon={<EyeIcon />}
        size="small"
        className="mb-10 py-[6] px-[20] md:py-[9px] md:px-[25px] md:h-[42px]"
      >
        {section === 'portfolio' ||
        section === 'credit-classes' ||
        section === 'projects'
          ? _(VIEW_PUBLIC_PROFILE)
          : section === 'profile'
          ? _(VIEW_PROFILE)
          : null}
      </OutlinedButton>
    </div>
  );
};
