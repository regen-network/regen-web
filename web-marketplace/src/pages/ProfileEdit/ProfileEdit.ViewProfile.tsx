import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import EyeIcon from 'web-components/src/components/icons/EyeIcon';

import { UseStateSetter } from 'types/react/use-state';
import { isProfileEditDirtyRef } from 'lib/atoms/ref.atoms';

import { VIEW_PROFILE } from './ProfileEdit.constants';

type Props = {
  setIsWarningModalOpen: UseStateSetter<string | undefined>;
};

export const ViewProfileButton = ({ setIsWarningModalOpen }: Props) => {
  const [isDirtyRef] = useAtom(isProfileEditDirtyRef);
  const navigate = useNavigate();

  return (
    <OutlinedButton
      onClick={() => {
        if (isDirtyRef?.current) {
          setIsWarningModalOpen('/profile/portfolio');
        } else {
          navigate('/profile/portfolio');
        }
      }}
      startIcon={<EyeIcon />}
    >
      {VIEW_PROFILE}
    </OutlinedButton>
  );
};
