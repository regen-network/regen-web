import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import EyeIcon from 'web-components/src/components/icons/EyeIcon';

import { UseStateSetter } from 'types/react/use-state';
import { isProfileEditDirtyRef } from 'lib/atoms/ref.atoms';

import { VIEW_PROFILE } from './ProfileEdit.constants';
import { getProfileUrl } from './ProfileEdit.utils';

type Props = {
  setIsWarningModalOpen: UseStateSetter<string | undefined>;
  activeAccount?: { addr?: string; id?: string; [key: string]: any } | null; // Make it optional
};

export const ViewProfileButton = ({
  setIsWarningModalOpen,
  activeAccount,
}: Props) => {
  const { _ } = useLingui();
  const [isDirtyRef] = useAtom(isProfileEditDirtyRef);
  const navigate = useNavigate();

  const handleViewProfile = () => {
    // Add safety check for activeAccount
    if (!activeAccount) {
      console.warn('No active account available');
      return;
    }

    const profileUrl = getProfileUrl(activeAccount);

    if (isDirtyRef?.current) {
      setIsWarningModalOpen(profileUrl);
    } else {
      navigate(profileUrl);
    }
  };

  // Don't render if no active account
  if (!activeAccount) {
    return null;
  }

  return (
    <OutlinedButton onClick={handleViewProfile} startIcon={<EyeIcon />}>
      {_(VIEW_PROFILE)}
    </OutlinedButton>
  );
};
