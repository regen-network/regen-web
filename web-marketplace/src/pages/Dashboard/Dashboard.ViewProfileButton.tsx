import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import EyeIcon from 'web-components/src/components/icons/EyeIcon';

import { Account } from 'generated/graphql';
import { UseStateSetter } from 'types/react/use-state';
import { isProfileEditDirtyRef } from 'lib/atoms/ref.atoms';
import { useWallet } from 'lib/wallet/wallet';

import {
  NO_ACTIVE_ACCOUNT,
  VIEW_PROFILE,
  VIEW_PUBLIC_PROFILE,
} from './Dashboard.constants';
import { getProfileUrl } from './Dashboard.utils';

type Props = {
  setIsWarningModalOpen: UseStateSetter<string | undefined>;
  activeAccount?: Pick<
    Account,
    'addr' | 'id' | 'name' | 'type' | 'image'
  > | null;
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
  const { wallet } = useWallet();

  const handleViewProfile = () => {
    const profileAccount =
      activeAccount || (wallet?.address ? { addr: wallet.address } : null);

    if (!profileAccount) {
      console.warn(NO_ACTIVE_ACCOUNT);
      return;
    }

    let profileUrl: string;

    switch (section) {
      case 'credit-classes':
        profileUrl = `${getProfileUrl(profileAccount)}/credit-classes`;
        break;
      case 'projects':
        profileUrl = `${getProfileUrl(profileAccount)}/projects`;
        break;
      case 'credit-batches':
        profileUrl = `${getProfileUrl(profileAccount)}/credit-batches`;
        break;
      case 'portfolio':
        profileUrl = `${getProfileUrl(profileAccount)}/portfolio`;
        break;
      case 'profile':
        profileUrl = `${getProfileUrl(profileAccount)}/portfolio`;
        break;
      default:
        profileUrl = getProfileUrl(profileAccount);
        break;
    }

    if (isDirtyRef?.current) {
      setIsWarningModalOpen(profileUrl);
    } else {
      navigate(profileUrl);
    }
  };

  if (!activeAccount && !wallet?.address) {
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
        section === 'projects' ||
        section === 'credit-batches'
          ? _(VIEW_PUBLIC_PROFILE)
          : section === 'profile'
          ? _(VIEW_PROFILE)
          : null}
      </OutlinedButton>
    </div>
  );
};
