import { Box } from '@mui/material';

import { Label } from 'web-components/lib/components/typography';

import { UseStateSetter } from 'types/react/use-state';

import { profileModalInitialValues } from '../ProfileModal/ProfileModal.constants';
import { ProfileModalSchemaType } from '../ProfileModal/ProfileModal.schema';

type AddNewProfileProps = {
  setProfileAdd: UseStateSetter<ProfileModalSchemaType | null>;
};

export const AddNewProfile: React.FC<AddNewProfileProps> = ({
  setProfileAdd,
}) => (
  <Box
    key="add-new-profile"
    sx={{ py: 2 }}
    onClick={e => {
      e.stopPropagation();
      setProfileAdd(profileModalInitialValues);
    }}
  >
    <Label size="xs" color="secondary.main">
      + Add New Profile
    </Label>
  </Box>
);
