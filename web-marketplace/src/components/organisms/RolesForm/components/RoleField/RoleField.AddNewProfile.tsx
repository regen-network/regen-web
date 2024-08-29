import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';

import { Label } from 'web-components/src/components/typography';

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
        address: null,
      });
    }}
  >
    <Label size="xs" color="secondary.main">
      <Trans>+ Add New Profile</Trans>
    </Label>
  </Box>
);
