import { Box } from '@mui/material';

import { Label } from 'web-components/lib/components/typography';

import { AccountType } from 'generated/graphql';
import { UseStateSetter } from 'types/react/use-state';

import { DEFAULT_PROFILE_USER_AVATAR } from 'pages/ProfileEdit/ProfileEdit.constants';

import { ProfileModalSchemaType } from '../ProfileModal/ProfileModal.schema';

type AddNewProfileProps = {
  setProfileAdd: UseStateSetter<ProfileModalSchemaType | null>;
};

export const AddNewProfile: React.FC<AddNewProfileProps> = ({
  setProfileAdd,
}) => (
  <Box
    key="add-new-profile"
    sx={{ py: 2, width: '100%' }}
    onClick={e => {
      e.stopPropagation();
      setProfileAdd({
        profileType: AccountType.User,
        name: '',
        profileImage: DEFAULT_PROFILE_USER_AVATAR,
      });
    }}
  >
    <Label size="xs" color="secondary.main">
      + Add New Profile
    </Label>
  </Box>
);
